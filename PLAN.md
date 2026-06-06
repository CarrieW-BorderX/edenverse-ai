# Edenverse AI — Plan

_Last updated: 2026-05-27_

> **Asset convention:** raw footage and video masters live in `/raw_assets/` (gitignored). Web-ready derivatives are uploaded to the Shopify CDN (`cdn.shopify.com/s/files/1/0764/3063/9301/...`) and referenced by URL from `src/data/site-content.ts` and component code. `/public/media/` is now reserved for the rx-brain frame sequence and a small set of static assets that benefit from being colocated with the build. Never commit large video binaries to the repo.

## Intention

### Original goal
Code-managed rebuild of `edenverse.ai` as a bilingual marketing site:

- `Next.js` App Router, TypeScript
- Bilingual routing via `src/app/[locale]/` for `en` and `zh`
- Display- and contact-focused — **no e-commerce**
- Local media in `public/media/`, to be replaced with real product photography and robot footage
- Content hard-coded in `src/data/site-content.ts` today; CMS/admin-managed workflow later
- Future: Shopify-fed display-only product pages, Netlify deploy, SEO redirects from the legacy WordPress site

### Current direction
Raise the visual bar toward premium industrial-robotics marketing sites (reference: [fieldai.com](https://www.fieldai.com/), mirrored at `../fieldai-mirror/`). The site should _feel_ like fieldai, not look like a stock Next.js template.

## Rename & Migration Plan — Edenverse AI

Objective: rename the project from RobotX → Edenverse AI and perform the minimal, safe migration steps to publish under the new brand.

Planned steps:
- Edit textual content: update `src/data/site-content.ts` copy to reflect `Edenverse AI` and new product names; keep bilingual parity (`en`/`zh`).
- Update media: replace logo and pulse mark assets, and update CDN references (Shopify CDN preferred) so media points to Edenverse assets.
- Update CSS & theme: set CSS variables in `src/app/globals.css` to Edenverse color tokens and ensure `--brand-*` variables cover primary/secondary/neutral scales.
- Deployment & domain: create a Netlify project, configure deploy keys, and purchase/configure the `edenverse.ai` (or chosen) domain to point to the Netlify site.
- Verify: run `pnpm build`, smoke the site locally (`pnpm dev`), and perform bilingual checks + a simple accessibility pass.

These steps are ordered: content → media → CSS → deploy → verify. Each step is reversible and should be staged in a branch with small commits.

Target experience:

- Motion-first — scroll-driven animation is the primary storytelling layer, not a decoration
- A hero with a cinematic looping video (muted autoplay) — scroll-scrubbed image sequences remain an option for future sections if warranted
- Per-section sticky reveals, pinned segments, parallax stacks
- Dense, multi-resolution media — every section carries real product photography or footage
- Deep content — per-industry solution pages (inspection, cleaning, logistics, construction, service, companionship), news, team bios
- Fully bilingual (`en` / `zh`) across every page and motion label

## Current state

_Last verified: 2026-05-27_

- **Routing:** App Router, bilingual, 9 routes per locale — home, about, about/history, about/team, contact, solutions, news, news/[slug], technology. English at the URL root (`/`, `/solutions`), Chinese under `/zh`. `src/proxy.ts` rewrites unprefixed paths to `/en/...` internally and redirects `/en/...` → canonical prefix-free URL.
- **Motion stack:** `gsap@^3.15.0` + `@gsap/react` (ScrollTrigger), `lenis@^1.3.23`. Primitives: `LenisProvider`, `ImageSequence` (pinned canvas scrubber), `MediaLoadingPulse`, `reveal-section`.
- **Media:** all hero, about, and solutions video plus the homepage poster and logos served from Shopify CDN. Rx-brain scroll-scrubbed frames remain local in `public/media/rx-brain/frames/{1080,1600}/` (127 frames at each width, trimmed range 025–151). `next.config.ts` whitelists `cdn.shopify.com` for `next/image`.
- **Content:** bilingual strings in `src/data/site-content.ts` (~1145 lines). About page has real mission/advantage/traction/vision copy; team page has 5 leadership bios; history page is still the placeholder. MDX news CMS under `content/news/` with 3 live articles: `robotx-agibot-strategic-partner`, `rx-brain-almond-orchard-pilot`, `robotx-joins-nvidia-inception-program`.
- **Infrastructure:** `src/proxy.ts` sets `x-pathname` header; root `layout.tsx` reads it to set `<html lang>` correctly per locale. Netlify cache headers in `netlify.toml` cover `/_next/image`, `/_next/static`, `/media/`, `/media/rx-brain/frames` (1-year immutable), and `/fonts`.

## Gaps vs. the target feel

1. ~~**Motion system**~~ — shipped in Phase 1.
2. ~~**Media density / asset pipeline**~~ — resolved by the Shopify CDN migration (Phase 4). Production media now lives in Shopify and is served via `cdn.shopify.com` URLs referenced from `site-content.ts`. Multi-resolution `next/image` variants are produced on-demand from Shopify originals.
3. **Content depth** — about, team, solutions, and news are real; history (`/about/history`) and technology (`/technology`) are still bare hero-only placeholders. Long-form copy for both still needs to be written and designed.
4. **Deployment & SEO** — Netlify is live (manual prod deploys via `npm run deploy:prod`). Still missing: redirect map from legacy WordPress URLs, `sitemap.xml`, `robots.txt`, and per-page `og:` metadata.

## Open questions before committing more engineering time

- **Will non-engineers need to update copy, news, or team entries?** If yes, a headless CMS (or staying on Webflow) is mandatory — hard-coded `site-content.ts` does not scale to marketing ownership.
- **Is bilingual `en`/`zh` firm?** It roughly doubles motion-label and content work.
- **What real product photography and robot footage exists today vs. needs to be produced?** This is the long-pole cost, not the code.
- **Build ourselves vs. Webflow?** For a pure marketing site with frequent non-technical edits, Webflow ships in days and stays editable. Building here only wins if this site needs to share components/auth with a future product app, or needs motion beyond what GSAP-in-Webflow can do.


---

## Phase 1 — Homepage Hero Video Spike (Shipped)

**Scope:** one section (homepage hero), looping background video, bilingual, stand-in media OK.

> **Approach (2026-04-18):** hero is a straight looping `<video>` — not a scroll-scrubbed image sequence. Motion stack chosen: `gsap` + `ScrollTrigger` + `lenis`. Video self-hosted in `public/media/hero/`. Self-built path confirmed; bilingual `en`/`zh` is firm.

### Shipped
- Motion deps installed: `gsap@^3.15.0`, `@gsap/react`, `lenis@^1.3.23`
- `<LenisProvider>` wired in `src/app/[locale]/layout.tsx`
- `src/components/motion/` created: `image-sequence.tsx`, `media-loading-pulse.tsx`, `lenis-provider.tsx`, `use-in-view-autoplay.ts`, `use-reduced-motion.ts`
- `HomeHero` at `src/components/pages/sections/home-hero.tsx` — `<video autoplay muted loop playsInline>`, bilingual copy overlay, `prefers-reduced-motion` fallback to poster
- Hero media committed: `public/media/hero/hero.mp4` (27 MB — see TODO #3), `public/media/hero/hero-poster.webp`
- Bilingual hero copy in `src/data/site-content.ts`
- Rx-brain pinned scroll-scrubbed canvas section built alongside: `src/components/pages/sections/rx-brain-section.tsx`, `src/data/rx-brain-frames.ts`

### Not completed (non-blocking)
- Asset pipeline documentation (hero export recipe, webp variant recipe, `next/image` multi-resolution config) not written
- No Lighthouse LCP audit on record; fieldai hero gap not formally documented

## Media requirements

| Animation type                              | Format                            | Notes                                                                                          |
| ------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| Hero looping background                     | **MP4 (H.264)** + optional **WebM (VP9)** + **webp poster** | Muted, autoplay, loop, `playsInline`. 1920×1080, 6–12s, target <5 MB. Poster still required for LCP + reduced-motion. |
| Section B-roll / looping background         | **MP4 (H.264)** + optional **WebM (VP9)**  | Muted, autoplay, loop, `playsInline`. 1080p, 3–8s, under 3 MB.                         |
| Scroll-scrubbed sequences (optional, later) | **Image sequence (webp / jpg)**   | 60–120 frames, 1600–2000px wide, painted to `<canvas>`. Not used for the Phase 1 hero.          |
| Still photography (product, team, posters)  | **webp** (jpg fallback)           | Multi-resolution: 500 / 800 / 1080 / 1600 / 2000 widths. Served via `next/image`.              |
| 3D / interactive                            | GLB/GLTF                          | Not Phase 1.                                                                                   |

**Asset storage convention:**
- `/raw_assets/` (gitignored) — raw footage, Premiere projects, source masters. Never committed.
- `/public/media/` (committed) — web-ready, optimized exports only. Every file here ships to the browser, so keep sizes tight.
- If/when we move to a media CDN (Cloudinary / Mux / Bunny), `/public/media/` shrinks to just local fallbacks and the CDN URLs are referenced in `site-content.ts`.

**Phase 1 media ask:**
- Hero: web-ready MP4 + webp poster exported from `raw_assets/Hero Content.mp4`.
- Everything else (later phases): MP4 B-roll + high-res stills.

---

## Phase 2 — Mobile performance + loading hardening (2026-04-19)

**Trigger:** after the first production deploy, `https://edenverse.ai/` broke on mobile — page would load twice then stop loading. Diagnosis: the home page was fetching ~200 MB of media on mount, and Netlify's default `Cache-Control: public, max-age=0, must-revalidate` defeated the browser cache so every reload re-downloaded everything. Mobile browsers hit memory/bandwidth ceilings and aborted in-flight video fetches, which triggered video-element retry loops, which OOM'd the tab.

### What shipped (Plan B)

Scoped fix — targets the two biggest wins without touching the hero or rx-brain sequence. Plan C (hero mobile variant + rx-brain dedupe) is still open.

1. **Solutions carousel — lazy-attach video sources.** `src/components/solutions-carousel-section.tsx`
   - Compute `nearIndex = hoveredCardIndex ?? activeCardIndex` and `isNearActive = Math.abs(index - nearIndex) <= 1`.
   - Only render `<source>` for near-active cards; far cards keep the `<video>` element with its poster but no source → no MP4 fetch.
   - Added `preload="metadata"` to the `<video>`.
   - Added `videoReferences` ref array + a `useEffect` keyed on `[activeCardIndex, hoveredCardIndex, cards]` that calls `video.load()` when a card transitions from far → near. Needed because HTML spec does not re-run resource selection when a `<source>` is appended to an already-mounted `<video>`.
   - Verified: initial-load MP4 requests dropped from 5 → 2 on the solutions carousel (only active + adjacent). Scrolling to make a far card active triggers `.load()` and playback starts as expected.

2. **Netlify cache headers.** `netlify.toml`
   ```toml
   [[headers]]
     for = "/_next/image*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"

   [[headers]]
     for = "/_next/static/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"

   [[headers]]
     for = "/media/*"
     [headers.values]
       Cache-Control = "public, max-age=604800, stale-while-revalidate=86400"
   ```
   - `/_next/static/*` and `/_next/image*` are content-hashed → safe to cache 1 year immutable.
   - `/media/*` changes only on deploy → 7-day browser cache with 1-day stale-while-revalidate.
   - HTML left to Next.js adapter + Netlify Durable cache (already handled).

### Verification on record

| Check | Before | After |
|---|---|---|
| Unique MP4 fetches on mobile home load | 6 (hero + 5 carousel) | 3 (hero + 2 near-active carousel) |
| Solutions-video request count in first 6s | 25 (abort-retry flood) | 10 (normal byte-range buffering for 2 videos) |
| Cache-Control on static assets | `public, max-age=0, must-revalidate` | `max-age=31536000, immutable` / `max-age=604800, swr=86400` |
| `/en` + `/zh` home mobile smoke | crashed / reloaded | loads cleanly, 0 console errors |

### Follow-up work that shipped later the same day

After Plan B landed the user reported (1) the pulse placeholder flashed and vanished faster than the media could load and (2) the rx-brain pinned section was invisible on scroll-down until the end. Both were root-cause fixes:

- **Rx-brain pin regression** — `useGSAP` cleanup killed the ScrollTrigger without `revert = true`, so when the `width` state flipped from SSR-fallback `2000` to the client-picked `1080` on mobile the pin's spacer padding accumulated (observed 3376 px = 2 × 1688). Fix: pass `revertOnUpdate: true` to `useGSAP`. The `useGSAP` contract is "revert on unmount only" by default; `revertOnUpdate: true` extends that to dependency changes.
- **`MediaLoadingPulse` placeholder** — replaced the full-resolution priority `<img>` on the rx-brain sequence and overlaid far-card videos in the carousel with a pulsing `/media/logos/edenverse-square-transparent.png` mark (CSS keyframe, respects `prefers-reduced-motion`). This also removed the Next.js auto-preload hint for rx-brain frame 0.
- **`Pudu_CC1-8.webp` removed from code.** It was the universal `imageSrc` / `backgroundPosterSrc` fallback for every carousel card. `SolutionCard.imageSrc` is now optional and consumers fall back to `<MediaLoadingPulse>` if missing. The file stays on disk, unreferenced from `src/`.
- **Carousel visited-sticky.** Original Plan B removed `<source>` when a card scrolled out of near range, so each re-entry called `video.load()` and flashed a black reload. Now `visitedCards: Set<number>` is sticky — once a card has been near, its source stays forever. After the user scrolls through the carousel every video is loaded and never reloads.
- **Pulse persists until media is playable.** Carousel pulse is keyed on `loadedCards` (set by `onCanPlay` / `onLoadedData` plus a ref-callback `readyState >= 3` check for cached videos that raced past the React listener). Rx-brain canvas opens at `opacity: 0`; the `MediaLoadingPulse` below shows through until the first `drawFrame(0)` flips `firstFrameDrawn` to true. On slow networks users now see the pulsing X for the full load window.

### Deferred / still open

- **Hero mobile variant.** `hero.mp4` is 27 MB and autoplays eagerly on mount. Produce `hero-mobile.mp4` (720p, ~4 MB) from the master in `raw_assets/`, add `<source media="(max-width: 768px)">`. `MediaLoadingPulse` is intentionally NOT wired on the hero — hero keeps `hero-poster.webp` so LCP stays a real image. See `TODO.md` items 3 and 9.
- **rx-brain double-resolution fetch.** The 2026-04-19 mobile trace showed both the 1080 AND 2000 frame sets fetching. After the priority `<img>` swap (which removed the Next.js preload hint for the 2000 frame 0), this may already be resolved — needs a fresh trace to confirm. See `TODO.md` item 8.
- **Carousel: detach `<video>` element entirely for far cards.** Current fix keeps the `<video>` mounted with no source — small HTMLMediaElement overhead per card. Swap to a `<div>` with `background-image` for non-near cards if profiling shows it matters. Unlikely to matter in practice.

### Deploy notes

- `[context.production] ignore = "exit 0"` in `netlify.toml` means pushing to `main` does **not** trigger a Netlify production deploy. Production ships only via `npm run deploy:prod` (CLI, from an authenticated shell with Windows Developer Mode enabled so `@netlify/plugin-nextjs` can create its symlinks).
- Preview deploys: `npm run deploy:preview` → returns a throwaway preview URL for pre-merge checking.
- Repo is a sparse checkout — `git add <path>` sometimes errors with "outside of your sparse-checkout definition"; pass `--sparse` to override.

---

## Phase 3 — Default locale routing (English as root) [Shipped]

**Goal:** English URLs lose the `/en` prefix. `/` and `/solutions` serve English; `/zh` and `/zh/solutions` serve Chinese.

**Approach:** middleware rewrite — no route-file duplication. The `[locale]` dynamic segment stays. `src/proxy.ts` intercepts every request: paths with no locale prefix rewrite internally to `/en/...` (URL stays clean); paths starting with `/en` redirect to the prefix-free canonical. A `localePrefix(locale)` helper in `src/lib/i18n.ts` centralizes link generation across all components.

**Files:** `src/proxy.ts`, `src/lib/i18n.ts`, `src/app/page.tsx` (deleted), + 7 component files (`site-header`, `site-footer`, `home-page`, `latest-events-section`, `news-article-page`, `news-grid-reveal`, `solutions-page`).

See git log for implementation details.

---

## Phase 4 — Shopify CDN media migration + content fill (2026-04-27 → 2026-05-15) [Shipped]

**Trigger:** even after Phase 2's lazy carousel sources and Netlify cache headers, the repo was still shipping ~80+ MB of video binaries (hero `hero.mp4` 27 MB, the five solutions clips 19–50 MB each) and a long-tail of static images. Netlify object egress + repo churn was untenable, and the Phase 2 deferred items (hero mobile variant, WebM companion) were never going to close cleanly without an adaptive-bitrate origin.

### What shipped

1. **All product video and the homepage hero now live on Shopify's CDN** — uploaded to `cdn.shopify.com/s/files/1/0764/3063/9301/...` and referenced by absolute URL from `src/data/site-content.ts` (`homepageHeroVideoSrc`, `homeHeroVideoSrc`, every `backgroundVideoSrc` for solutions cards). Local copies under `public/media/hero/`, `public/media/solutions/`, `public/media/home/` were deleted from the repo. `public/media/news/<slug>/` media followed shortly after (MDX bodies reference Shopify URLs directly).
2. **Logos and inline imagery** — `logo-transparent.png`, `edenverse-square-transparent.png` (pulse mark), `rx-brain-logo-white-transparent.png`, and the hero poster all moved to Shopify CDN. `next.config.ts` whitelists `cdn.shopify.com` as a `next/image` remote pattern. `globals.css` `.media-loading-pulse-mark` background image now points at the Shopify URL; only `favicon.ico` remains under `public/media/logos/`.
3. **Rx-brain frame set trimmed** — `public/media/rx-brain/frames/2000/` deleted entirely; `1080` and `1600` kept. Frame range cropped from 200+ frames to 127 (indices 025–151) and the `rxBrainFrames` manifest updated to match. ~14–17 MB of unused mobile fetch (Phase 2 follow-up item) closed in the same pass.
4. **`hero-frames.ts` removed** — the dead old-hero scroll-scrubber manifest in `src/data/` was deleted. `scripts/build-hero-frames.mjs` and the `build:hero` npm script are still on disk but unreachable (`public/media/hero/` no longer exists).
5. **About page + team page filled** — `/about` is now a real page (mission, advantage rail, traction stats, partner panels, vision) backed by `AboutPage` + the new `AboutStats` section component. `/about/team` ships with five leadership bios in both locales. `/about/history` is still the `AboutPlaceholderPage` "Under construction" panel.
6. **AboutStats traction animation disabled** — the count-up reveal on the traction stat cards was turned off (commit `3a1e54b`); cards render their final values directly. The animation hook was kept simple by removal rather than trying to fix a Lenis interaction.
7. **News collection grew to three articles** — added `robotx-joins-nvidia-inception-program` (2026-05-15). The `robotx-agibot-strategic-partner` article was rewritten on 2026-04-30 and its ShareBot section removed.
8. **Language toggle hidden** — the `.language-switcher` block in `src/components/site-header.tsx` is commented out (commit `0e61761`); both locales are still routable but no longer surfaced in the chrome.

### Net effect

- Repo size dropped sharply (video + logo binaries gone). Netlify build artifact is now mostly the rx-brain frame set under `/media/rx-brain/`.
- Hero LCP is now bounded by Shopify CDN performance, not by a 27 MB repo binary. Phase 2 deferred items 3, 4, and 9 (hero re-encode / WebM companion / mobile variant) are obsolete — Shopify serves an adaptive original and we keep the poster pre-cached.
- Phase 2 deferred item 8 (rx-brain double-resolution fetch) is closed by the 2000 frame deletion.
- The dev / prod story for adding new media is now: upload to the Shopify admin, copy the `cdn.shopify.com/...` URL, paste it into `site-content.ts` or the relevant MDX file. Raw masters still live under `raw_assets/` for traceability.

### Still open

- **History page** still placeholder.
- **Technology page** still bare hero-only.
- **No `sitemap.xml`, `robots.txt`, or per-page `og:` metadata** yet.
- **No legacy WordPress redirect map** wired in `netlify.toml`.
- **`scripts/build-hero-frames.mjs` + `build:hero` npm script** are dead — schedule for deletion when someone touches the script directory next.
