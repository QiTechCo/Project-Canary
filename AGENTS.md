# Project Canary: AI Agent & Developer Architecture Guide (AGENTS.md)

Welcome to **Project Canary**, the official digital campaign platform and Volunteer Hub for **Dimple Ajmera for Charlotte** (Charlotte City Council Member At-Large).

This document serves as the canonical technical guide for AI coding assistants (e.g., Anthropic Claude, Google Antigravity, OpenAI Codex) and human developers maintaining, reviewing, or expanding this codebase.

---

## 1. Executive Summary & Technology Stack

- **Purpose**: Modern, high-performance political campaign web platform and real-time grassroots Volunteer Hub.
- **Frontend Architecture**: Static HTML5 + Bootstrap 5.3.3 + Custom CSS Architecture + Vanilla JavaScript (ES6+).
- **Backend Architecture**: **Supabase** (Managed PostgreSQL, GoTrue Authentication, PostgREST API, Realtime).
- **Hosting / Deployment Target**: Static web hosting (Netlify / Vercel / GitHub Pages / Apache / Nginx / Cloudflare Pages).
- **Primary Repository Branch**: `main`

---

## 2. Directory Structure & Key Files

```
├── AGENTS.md                          # This AI agent & developer orientation guide
├── index.html                         # Front landing page (Hero, Stats, Town Hall, About, Gallery, Platform, Substack)
├── endorsements.html                  # Full organization logo gallery (scraped) & 37-leader endorsement roster
├── volunteer.html                     # Public volunteer application form directly wired to Supabase
├── portal.html                        # Volunteer Portal authentication / 1-click test sign-in
├── dashboard.html                     # Grassroots Volunteer Hub (Shift calendar, Wiki, Media downloads, Profile sync)
├── priority-economy.html              # Platform deep-dive: Economic Opportunity & Small Business
├── priority-environment.html          # Platform deep-dive: Sustainable Infrastructure & Water Security
├── priority-housing.html              # Platform deep-dive: Affordable Housing & Neighborhood Equity
├── priority-public-safety.html        # Platform deep-dive: Community Safety & First Responder Support
├── supabase_schema.sql                # Complete PostgreSQL DDL schema, tables, indices, and RLS policies
├── favicon.ico / favicon.png          # Official campaign logo favicon
├── assets/
│   ├── css/
│   │   └── site.css                   # Core stylesheet containing the entire design system and responsive tokens
│   ├── js/
│   │   ├── site.js                    # Global interactivity: stats counter, town hall countdown, gallery lightbox
│   │   ├── volunteer.js               # Public registration handler syncing form data directly to Supabase PostgreSQL
│   │   ├── portal.js                  # GoTrue Supabase Auth magic link dispatcher and session initializer
│   │   └── dashboard.js               # Volunteer Hub logic: live Supabase profile & shift sync, wiki search, media
│   └── images/                        # Campaign photography, transparent cutouts, and scraped organization logos
│       ├── dimple_headshot_transparent.png  # Hero cutout portrait with preserved alpha transparency
│       ├── whiteboard_9_navlogo.png   # Crisp navbar brand logo
│       ├── dimple_hugh_mccoll.jpg     # Photo gallery: Dimple with Hugh McColl (former Bank of America CEO)
│       ├── dimple_susan_rodriguez_mcdowell.jpg # Photo gallery: Dimple with Commissioner Susan Rodriguez McDowell
│       └── endorsements/              # Scraped official endorsement logos (1:1 mapped to data)
├── data/
│   ├── scraped_endorsements.json      # Structured JSON database of scraped endorsing organizations
│   ├── substack_manifest.json         # Complete archive of candidate Substack dispatches
│   └── substack_articles/             # Full scraped Markdown content for campaign wiki & policy briefs
└── includes/                          # PHP templating partials (config.php, header.php, footer.php)
```

---

## 3. Design System & Styling Rules

All styling is managed in [`assets/css/site.css`](assets/css/site.css) using CSS variables:

### Color Palette
- **Patriot Red**: `#ed1c24` (`--patriot-red`)
- **Deep Navy Dark**: `#0f2042` (`--navy-dark`)
- **Navy Medium**: `#1b365d` (`--navy-medium`)
- **Emerald Accent (Environment)**: `#007850` / `#009966` (`--emerald-accent`)
- **Gold Accent (Finance / CPA)**: `#d4af37` (`--gold-accent`)
- **Substack Orange**: `#ff6719` (`--substack-orange`)
- **Off-White Background**: `#f8f9fa` (`--bg-off-white`)

### Typography
- **Headings / Serif**: `EB Garamond`, Georgia, serif (`--font-serif`)
- **Body / Interface**: `Plus Jakarta Sans`, system-ui, sans-serif (`--font-sans`)

### Critical UI & Layout Invariants
1. **Hero Cutout Image**: The candidate portrait (`dimple_headshot_transparent.png`) MUST maintain background transparency on the hero split layout.
2. **Navigation Bar**: Sized for single-line desktop presentation (`height: 56px` logo, `font-size: 1.0rem` links, centered emerald hover indicator).
3. **Photo Gallery Framing**: All gallery image containers use `object-fit: cover; object-position: top center;` to ensure heads and faces are never cropped in thumbnail previews.
4. **Environment Town Hall**: Official title is *"State of Our Environment: Data Centers, Water & Charlotte’s Future"*, styled with `.btn-emerald-green` and tree icons.
5. **Endorsements Organization Logos**: Displayed against pure white backgrounds with click-to-open lightbox modals displaying exact scraped organization descriptions.
6. **Community Leaders Roster**: Minimalist, high-readability 3-column grid containing all 37 endorsing leaders and elected officials without thumbnail icons or portraits.

---

## 4. Backend Architecture: Supabase Integration

- **Supabase Project URL**: `https://cddsrrwlncudouwcmbex.supabase.co`
- **Publishable / Anon API Key**: `sb_publishable_MqhQHtDaWagamu06kpZWPg_yg_Bktye`
- **Service Role Key**: Configured in Supabase console (`sb_secret_...`)

### Database Tables in `supabase_schema.sql`
1. **`volunteers`**:
   - `id` (uuid, primary key)
   - `email` (text unique, required)
   - `full_name` (text)
   - `phone` (text)
   - `precinct_district` (text)
   - `skills` (text array: `["Meet & Greet Host", "Door-to-Door Canvassing", "Phone Banking", "Yard Sign", "Events"]`)
   - `availability` (text: `"Flexible / As Needed"`, `"Weekends Only"`, etc.)
   - `status` (text: `"active"`, `"pending"`)
   - `hours_logged` (numeric)
2. **`shifts`**:
   - Upcoming campaign volunteer opportunities (Town halls, canvasses, phone banks) with date, time, location, capacity.
3. **`shift_signups`**:
   - 1-to-many relationship linking `volunteer_email` or `volunteer_id` to `shift_id` with status `"confirmed"`.
4. **`wiki_articles`**:
   - Searchable policy database compiled directly from scraped Substack dispatches.
5. **`campaign_assets`**:
   - High-resolution downloadable campaign logos, social media tiles, flyers, and yard sign graphics.

### Authentication & Testing Flow
- **Magic Link**: Volunteers can enter their email on [`portal.html`](portal.html) or [`volunteer.html`](volunteer.html) to receive an OTP magic link.
- **1-Click Test Sign-In**: Dedicated developer/tester login button on [`portal.html`](portal.html) authenticated as `test@dimpleajmera.com`.
- **Client Session Persistence**: Syncs user email and profile state across `localStorage` (`canary_volunteer_email`, `canary_volunteer_session`, `canary_volunteer_profile`) and Supabase PostgreSQL.

---

## 5. Instructions for AI Coding Assistants (Claude / GPT / Antigravity)

When modifying or expanding this codebase:
- **No Build Step Required**: All HTML/CSS/JS files are standard web assets. Do not introduce complex build pipelines (Webpack, Vite, npm scripts) unless explicitly requested.
- **Preserve Link IDs and Anchors**: Navigation smooth-scrolling relies on anchors (`#top`, `#event-townhall`, `#about`, `#gallery`, `#media`, `#priorities`).
- **Maintain Scraped Integrity**: Endorsement and Substack policy data are scraped from official campaign sources. Keep names, titles, and dispatches accurate.
- **Always Validate HTML/CSS**: Ensure semantic tags, valid Bootstrap grid structures (`row`, `col-*`), and accessibility attributes (`alt`, `aria-label`, `title`).
- **Database Operations**: Perform queries via the Supabase JavaScript client (`supabase.from("volunteers")`) with proper `onConflict` handling and graceful offline fallback.
