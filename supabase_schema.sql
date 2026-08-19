-- ========================================================
-- Project Canary: Campaign Volunteer Portal Schema
-- Candidate: Dimple Ajmera for Charlotte City Council At-Large
-- Database: Supabase PostgreSQL (cddsrrwlncudouwcmbex)
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
-- ========================================================
alter table public.volunteers enable row level security;
alter table public.shifts enable row level security;
alter table public.shift_signups enable row level security;
alter table public.wiki_articles enable row level security;
alter table public.campaign_assets enable row level security;

-- Public/Anon Read Permissions for Volunteer App
create policy "Allow anon read of shifts" on public.shifts for select using (is_active = true);
create policy "Allow anon read of wiki" on public.wiki_articles for select using (is_published = true);
create policy "Allow anon read of assets" on public.campaign_assets for select using (true);

-- Volunteer Self-Access & Signups
create policy "Allow volunteer insert/update on signups" on public.shift_signups 
    for all using (true) with check (true);

create policy "Allow volunteer profile creation/view" on public.volunteers 
    for all using (true) with check (true);

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