# Project Canary: Master TODO & Roadmap (Needs-To-Do List)

This document tracks all active, pending, and scheduled tasks for **Dimple Ajmera for Charlotte** campaign web platform and Volunteer Hub.

---

## 🟢 1. Active & Implemented in Current Build
- [x] **Favicon & Apple Touch Icons**: Page logo (`whiteboard_9_navlogo.png`) synced as SVG, PNG, and ICO across all 11 HTML pages.
- [x] **Endorsement Logo Gallery & Modal**: 14 verified organization logo cards in a balanced responsive grid with click-to-open lightbox details and official website links.
- [x] **37-Leader Endorsement Roster**: Full 3-column scannable text grid of North Carolina community leaders and elected officials.
- [x] **Canvassing & Field Training Hub**: New training tab added to the Volunteer Dashboard with 60-second door scripts, talking points, safety protocols, and downloadable guide links.
- [x] **Privacy Policy & Mobile Terms of Service**: Dedicated compliance page (`privacy-terms.html` / `terms-conditions.html`) covering SMS opt-in/opt-out rules and data protection.
- [x] **Supabase Database & RLS**: Least-privilege PostgreSQL policies, volunteer profile claiming, and live synchronization for shifts, wiki articles, and media assets.

---

## 🟡 2. Upcoming Major UI/UX Overhauls (Next Phase)

### A. Mobile Field PWA & Canvassing Ergonomics
- [ ] **PWA Manifest (`site.webmanifest`)**: Enable "Add to Home Screen" standalone app mode on iOS/Android.
- [ ] **Sticky Bottom Thumb Navigation**: Bottom navigation bar on mobile viewports for one-handed field switching between Shifts, Wiki, Training, and Profile.
- [ ] **One-Tap Deep Links**: Direct action buttons for calling voters (`tel:`), texting (`sms:`), and navigating to turf addresses (`maps://` / Google Maps).
- [ ] **Offline Script & Wiki Caching**: Service worker integration to ensure canvassing scripts and policy FAQs load instantly with zero cellular reception.

### B. Landing Page Enhancements (From New Mockups)
- [ ] **Flagship Split Hero**: Refine hero section with enhanced typography scale and dual conversion pathways.
- [ ] **State of Our Environment Section**: Incorporate the emerald-green live countdown event card and tree canopy metrics.
- [ ] **Candidate Bio & Journey Timeline**: Interactive illustrated milestones for Dimple's immigration, education, CPA career, and council service.
- [ ] **Newsroom & Substack Hub**: Enhanced preview cards with reading times and instant Substack subscription actions.

---

## 🔵 3. Content & Media To-Do
- [ ] Upload final high-resolution PDFs for *Canvassing 101 Field Guide* and *Training Slide Deck* into `training/canvassing_docs/`.
- [ ] Populate remaining localized volunteer shift dates for upcoming campaign cycle.
