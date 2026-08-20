-- ========================================================
-- Project Canary: Campaign Volunteer Portal Schema
-- Candidate: Dimple Ajmera for Charlotte City Council At-Large
-- Database: Supabase PostgreSQL (cddsrrwlncudouwcmbex)
--
-- Staff-wide roster access (exports, bulk email, admin tooling)
-- must use a service_role key from a server. Never put one in
-- any file that is served to a browser.
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. VOLUNTEERS TABLE (Linked to Supabase Auth)
create table if not exists public.volunteers (
    id uuid primary key default uuid_generate_v4(),
    auth_id uuid references auth.users(id) on delete set null,
    email text unique not null,
    full_name text,
    phone text,
    precinct_district text,
    skills text[], -- e.g. ['canvassing', 'phone_banking', 'spanish_translation']
    availability text, -- 'weekends', 'weekdays', 'flexible'
    status text default 'active', -- 'active', 'pending', 'lead'
    hours_logged numeric default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. CAMPAIGN SHIFTS TABLE
create table if not exists public.shifts (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    category text not null, -- 'town_hall', 'canvassing', 'phone_bank', 'tabling'
    date_time timestamp with time zone not null,
    location text not null,
    address text,
    capacity integer default 20,
    filled_spots integer default 0,
    description text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. SHIFT SIGNUPS TABLE
create table if not exists public.shift_signups (
    id uuid primary key default uuid_generate_v4(),
    shift_id uuid references public.shifts(id) on delete cascade not null,
    volunteer_id uuid references public.volunteers(id) on delete cascade,
    volunteer_email text not null,
    signup_status text default 'confirmed', -- 'confirmed', 'attended', 'cancelled'
    signed_up_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(shift_id, volunteer_email)
);

-- 4. CAMPAIGN WIKI & SUBSTACK ARTICLES TABLE
create table if not exists public.wiki_articles (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    title text not null,
    category text not null, -- 'environment', 'public_safety', 'housing', 'economy', 'general'
    published_date timestamp with time zone,
    substack_url text,
    markdown_content text not null,
    summary text,
    is_published boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. CAMPAIGN MEDIA ASSETS TABLE
create table if not exists public.campaign_assets (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    asset_type text not null, -- 'logo', 'headshot', 'flyer', 'social_badge'
    file_url text not null,
    dimensions text,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
--
-- The previous version of this file granted
--     for all using (true) with check (true)
-- on `volunteers` and `shift_signups`, to the `public` role.
-- Because the publishable API key ships in client-side JS, that
-- let any anonymous visitor SELECT, UPDATE and DELETE every
-- volunteer record — names, emails, phone numbers, districts.
--
-- The policies below are least-privilege. The publishable key is
-- only ever as safe as these policies, so read them carefully
-- before changing anything.
-- ========================================================
alter table public.volunteers      enable row level security;
alter table public.shifts          enable row level security;
alter table public.shift_signups   enable row level security;
alter table public.wiki_articles   enable row level security;
alter table public.campaign_assets enable row level security;

-- Data hygiene ------------------------------------------------
alter table public.volunteers
  add constraint volunteers_status_check
  check (status in ('pending','active','lead','inactive'));

create unique index if not exists volunteers_auth_id_key
  on public.volunteers(auth_id) where auth_id is not null;

-- VOLUNTEERS --------------------------------------------------
-- Public signup is INSERT-only. There is deliberately no SELECT
-- policy for `anon`, so a submitted row can never be read back
-- from the browser. The `with check` clause also stops a caller
-- from awarding themselves 'lead' status or pre-logged hours.
create policy "public may submit a signup" on public.volunteers
  for insert to anon
  with check (
    auth_id is null
    and status = 'pending'
    and coalesce(hours_logged, 0) = 0
    and char_length(email) between 3 and 320
    and (full_name is null or char_length(full_name) <= 120)
    and (phone     is null or char_length(phone)     <= 40)
  );

create policy "volunteer reads own profile" on public.volunteers
  for select to authenticated using (auth_id = auth.uid());

create policy "volunteer updates own profile" on public.volunteers
  for update to authenticated
  using (auth_id = auth.uid())
  with check (auth_id = auth.uid() and status <> 'lead');

-- SHIFTS / WIKI / ASSETS: signed-in volunteers only -----------
create policy "volunteers read active shifts" on public.shifts
  for select to authenticated using (is_active = true);

create policy "volunteers read published wiki" on public.wiki_articles
  for select to authenticated using (is_published = true);

create policy "volunteers read assets" on public.campaign_assets
  for select to authenticated using (true);

-- SHIFT SIGNUPS: own rows only, and no client-side DELETE -----
create policy "volunteer reads own signups" on public.shift_signups
  for select to authenticated using (
    volunteer_id in (select id from public.volunteers where auth_id = auth.uid())
  );

create policy "volunteer creates own signups" on public.shift_signups
  for insert to authenticated with check (
    volunteer_id in (select id from public.volunteers where auth_id = auth.uid())
    and signup_status = 'confirmed'
    and exists (select 1 from public.shifts s
                 where s.id = shift_id and s.is_active
                   and s.filled_spots < s.capacity)
  );

-- Cancelling is a status change, never a delete: the audit trail stays.
create policy "volunteer cancels own signup" on public.shift_signups
  for update to authenticated
  using (volunteer_id in (select id from public.volunteers where auth_id = auth.uid()))
  with check (
    volunteer_id in (select id from public.volunteers where auth_id = auth.uid())
    and signup_status in ('confirmed','cancelled')
  );

-- ========================================================
-- LINK AN AUTH USER TO THEIR VOLUNTEER RECORD
-- Called once on dashboard load. Runs as definer so it can find
-- the unclaimed row that RLS would otherwise hide from the user.
-- ========================================================
create or replace function public.claim_volunteer_profile()
returns public.volunteers
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v   public.volunteers;
  uid uuid := auth.uid();
  em  text := lower(nullif(auth.jwt() ->> 'email', ''));
begin
  if uid is null or em is null then
    raise exception 'not authenticated' using errcode = '42501';
  end if;

  select * into v from public.volunteers where auth_id = uid limit 1;
  if found then return v; end if;

  update public.volunteers
     set auth_id = uid, status = 'active', updated_at = now()
   where lower(email) = em and auth_id is null
   returning * into v;
  if found then return v; end if;

  insert into public.volunteers (auth_id, email, status)
  values (uid, em, 'active')
  returning * into v;
  return v;
end;
$$;

revoke all on function public.claim_volunteer_profile() from public, anon;
grant execute on function public.claim_volunteer_profile() to authenticated;

-- ========================================================
-- filled_spots is server-maintained. Clients cannot write to
-- public.shifts at all, so the count cannot be forged.
-- ========================================================
create or replace function public.sync_filled_spots()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  update public.shifts s
     set filled_spots = (
       select count(*) from public.shift_signups g
        where g.shift_id = s.id and g.signup_status in ('confirmed','attended')
     )
   where s.id = coalesce(new.shift_id, old.shift_id);
  return null;
end;
$$;

drop trigger if exists trg_sync_filled_spots on public.shift_signups;
create trigger trg_sync_filled_spots
  after insert or update or delete on public.shift_signups
  for each row execute function public.sync_filled_spots();

-- The Supabase linter flags this platform helper as anon-callable.
-- It is an event-trigger function and cannot usefully be invoked
-- over RPC, but there is no reason to leave EXECUTE granted.
revoke all on function public.rls_auto_enable() from public, anon, authenticated;

-- ========================================================
-- SEED DATA: UPCOMING CAMPAIGN SHIFTS
-- ========================================================
insert into public.shifts (title, category, date_time, location, address, capacity, description)
values
('Environment Town Hall: Check-In & Greeting Team', 'town_hall', '2026-08-20 17:00:00-04', 'Project 658', '3646 Central Ave, Charlotte, NC 28205', 12, 'Help welcome attendees, manage RSVP lists, and distribute policy handouts at Dimple Ajmera Environment Town Hall.'),
('East Charlotte Weekend Canvass Kickoff', 'canvassing', '2026-08-22 10:00:00-04', 'Eastway Regional Recreation Center', '3150 Eway Park Dr, Charlotte, NC 28213', 25, 'Door-to-door community canvassing and voter engagement. Training and walk packets provided.'),
('South Charlotte Voter Outreach Phone Bank', 'phone_bank', '2026-08-25 18:00:00-04', 'Virtual Zoom / Campaign Office', 'Online / Charlotte HQ', 30, 'Connect with voters across Mecklenburg County to discuss affordable housing, transit, and clean water priorities.'),
('Charlotte Pride Festival Campaign Tabling', 'tabling', '2026-08-29 11:00:00-04', 'Uptown Charlotte', 'S Tryon St, Charlotte, NC 28202', 15, 'Engage festival attendees, distribute candidate literature, and register campaign volunteers.')
on conflict do nothing;