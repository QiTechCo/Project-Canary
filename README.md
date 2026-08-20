# Project Canary — Dimple Ajmera for Charlotte

Official campaign website and volunteer access portal for Dimple Ajmera for
Charlotte City Council (At-Large).

## Tech stack

- **Frontend:** HTML5, CSS3 (custom design-token system, two-font typography), vanilla JS, Bootstrap 5.3.3
- **Backend:** Supabase (PostgreSQL + passwordless email auth)
- **Build step:** none. It is a static site; open it and it runs.

## Running locally

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000/>.

The volunteer portal talks to the live Supabase project, so sign-in works from
localhost as long as `http://localhost:8000` is listed under **Authentication →
URL Configuration → Redirect URLs** in the Supabase dashboard.

## Layout

```
index.html               Homepage
endorsements.html        Endorsement roster
volunteer.html           Volunteer signup form
priority-*.html          Four policy pages (public safety, environment, housing, economy)
portal.html              Volunteer sign-in
dashboard.html           Volunteer hub (shifts, wiki, media, profile)
privacy.html             Privacy policy
accessibility.html       Accessibility statement

assets/css/site.css      Design tokens + all component styles
assets/js/
  site.js                Shared: nav, scrollspy, countdown, stats, lightbox, .ics
  supabase-client.js     Shared Supabase client + HTML-escaping helpers
  volunteer.js           Volunteer signup form
  portal.js              Passwordless sign-in
  dashboard.js           Shifts, wiki, media vault, profile

supabase_schema.sql      Tables, RLS policies, functions, triggers
ASSETS-NEEDED.md         The images and video that still need committing
```

## Security notes

**Read `supabase_schema.sql` before changing any database policy.**

The Supabase key in `assets/js/supabase-client.js` is a *publishable* key. It is
meant to ship in client-side code and is not a secret — but it is only safe for
as long as Row Level Security is correct. RLS is the only thing between that key
and the volunteer roster.

- Never commit a `service_role` key, or reference one from any file served to a browser.
- Roster-wide access (exports, bulk email, admin tooling) belongs on a server.
- The gate in `dashboard.js` is a convenience redirect, not a security boundary.
  On a static host any client-side check can be skipped. The real protection is
  RLS: without a valid session every query returns zero rows.
- After changing policies, re-run the Supabase linter (**Advisors → Security**).

## Before deploying

- [ ] Commit the missing image and video assets (see `ASSETS-NEEDED.md`)
- [ ] Add `http://localhost:8000` and the production domain to Supabase redirect URLs
- [ ] Enable leaked-password protection in Supabase Auth settings
- [ ] Have counsel review `privacy.html` and remove the placeholder note at the top
- [ ] Confirm the four homepage statistics with the campaign
- [ ] Set security headers at the host (CSP, HSTS, X-Content-Type-Options, Referrer-Policy)
