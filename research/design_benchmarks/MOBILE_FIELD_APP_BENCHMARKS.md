# Mobile Field Tool & Progressive Web App (PWA) Architecture

Comprehensive analysis for transforming the **Dimple Ajmera Volunteer Hub & Portal** into a high-performance, mobile-first field tool for canvassing, event management, and phone banking.

---

## 1. PWA Installation & "Add to Home Screen" Architecture

### Web App Manifest (`manifest.json`):
- `name`: "Dimple Ajmera Volunteer Portal"
- `short_name`: "Team Dimple"
- `start_url`: "/dashboard.html"
- `display`: "standalone" (removes browser URL bars and chrome for a native iOS/Android feel)
- `theme_color`: "#0f2042" (Navy Dark top status bar)
- `background_color`: "#f8f9fa" (Clean off-white canvas)
- `icons`: 192x192 and 512x512 retina PNGs with maskable format.

### iOS-Specific Web App Meta Tags:
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Team Dimple">
<link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">
```

---

## 2. Field Usability & Touch Ergonomics

1. **The "Thumb Zone" Navigation**:
   - Primary mobile navigation placed in a fixed or sticky bottom bar (`bottom: 0`) rather than buried in top hamburger menus.
   - Core tabs: **Shifts / Canvass**, **Policy Wiki**, **Media Assets**, **My Profile**.
   - Tap targets configured to minimum **48x48px** with adequate touch padding (`12px+`).

2. **Touch Feedback & Responsive States**:
   - Active tap feedback using `-webkit-tap-highlight-color: transparent` combined with CSS `:active { transform: scale(0.97); opacity: 0.9; }`.
   - Smooth momentum scrolling (`-webkit-overflow-scrolling: touch`) and `touch-action: manipulation` to eliminate 300ms double-tap delays.

3. **Field Sunlight & Contrast**:
   - High-contrast text tokens (> 7:1 ratio) for reading voter addresses and candidate policy talking points in outdoor direct sunlight.
   - Large, legible typography for address lines and voter contact buttons (`1.15rem+`).

---

## 3. Seamless Authentication & Offline Resilience

1. **1-Click Field Authentication**:
   - Magic link OTP with automatic credential caching in `localStorage` and Supabase Auth session tokens.
   - Quick "Field Passcode / Volunteer Pin" or biometric-friendly session resumption so volunteers don't have to re-enter email while walking between doors.

2. **Offline-First Data Caching (Service Worker)**:
   - Cache static assets (`site.css`, `site.js`, icons, brand logos) using `CacheFirst` strategy.
   - Cache upcoming shifts and downloaded Substack wiki articles via `NetworkFirst` with local IndexedDB/localStorage fallback so volunteers can read talking points even with zero cell service.

3. **One-Tap Quick Actions**:
   - Native `tel:` and `sms:` links for phone banking and voter check-ins.
   - Native map navigation deep links (`maps://` / `geo:`) to open addresses directly in Apple Maps or Google Maps with one tap.
