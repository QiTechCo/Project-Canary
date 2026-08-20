# Missing image and video assets

None of the site's photography or video has ever been committed to this
repository — there is no `.gitignore` excluding them, no other branch, and
nothing deleted in history. The files are presumably on whoever built the
site's local machine.

Until they are added, every page renders with broken images. Drop the files
into `assets/images/` using **exactly** the filenames below and everything
wires up automatically.

## Blocking — referenced on the public site

| File | Used by | Notes |
|---|---|---|
| `whiteboard_9_navlogo.png` | nav bar, **all 11 pages** | Highest priority. Transparent PNG, ~320×96. |
| `dimple_headshot_transparent.png` | homepage hero | Transparent PNG. Export at 960×1120 for retina; it is displayed at 480×560. |
| `dimple_newest_crop.jpg` | homepage gallery, dashboard | |
| `hero_slide_1.jpg` · `hero_slide_2.jpg` · `hero_slide_4.jpg` · `hero_slide_6.jpg` · `hero_slide_8.jpg` | homepage gallery | Displayed at 400×280, `object-fit: cover`. |
| `gallery_community_1.jpg` · `gallery_community_2.jpg` · `gallery_community_3.jpg` | homepage gallery | |
| `og-card.jpg` | social sharing, all pages | **New.** 1200×630. This is what appears when anyone shares a link. |
| `apple-touch-icon.png` | all pages | **New.** 180×180 PNG. (`favicon.svg` is already committed.) |

## Blocking — video

| File | Notes |
|---|---|
| `Clip 1 - Data Center Wave.mp4` | |
| `Clip 2 - Policies for Water Demand.mp4` | |
| `red-light-safety.mp4` | **Renamed.** The original filename contained a curly apostrophe, an em-dash and spaces (`One bad decision at a red light…We've seen too many crashes—and too ma.mp4`), which breaks on several servers and CDNs. Update `index.html` if you use a different name. |
| `Dimple_Ajmera_Charlotte_Councilmember_2025.jpg` | poster frame for clip 1 |
| `dimple-ajmera-portrait.png` | poster frame for clip 2 |
| `dimple-ajmera-event-photo.jpg` | poster frame for clip 3 |

Each `<video>` now references a caption track at
`assets/captions/<name>.vtt`. A missing track file degrades gracefully — the
video still plays — but captions are an accessibility requirement, so please
produce them before launch.

## Volunteer portal

| File | Used by |
|---|---|
| `volunteer_hub_logo.jpeg` | `portal.html`, `dashboard.html` |

Note: `volunteer_portal_logo.svg` **is** committed but nothing references it.
Commit `git log` shows the portal was switched from the SVG to a JPEG that was
never added. Either add the JPEG, or point both pages back at the SVG — the SVG
is the better choice for a logo anyway (sharper, a fraction of the file size).

## Dashboard media vault

The five downloadable assets are now loaded from the `campaign_assets` table
rather than hardcoded, so add rows there with a `file_url` pointing at wherever
you host them. Supabase Storage is the natural home. The five existing rows
currently point at the missing local files.

## Before you commit them

1. **Resize.** A 2.9 MB PNG headshot as the hero image will dominate your
   Largest Contentful Paint on mobile. Export the hero at no more than ~250 KB.
2. **Convert.** Ship WebP or AVIF with a JPEG/PNG fallback. Typically 30–50%
   smaller at the same visible quality.
3. **Strip EXIF.** Phone photos carry GPS coordinates. For a campaign
   publishing photos of a candidate's movements, that is worth removing:
   `exiftool -all= assets/images/*.jpg`
4. **Check the licence.** Press photographs and event photography are often
   licensed for specific use. Confirm the campaign has rights to publish each
   image on the website before it goes live.
