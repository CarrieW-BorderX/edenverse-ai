# TODO — usrobotx tech debt

Known issues carried forward as tech debt. Prioritize against `PLAN.md` phases. Delete items when shipped, don't just check them off.

## Accessibility / bilingual

## Content

### 5. History page is still a placeholder

- **Where:** [src/app/[locale]/about/history/page.tsx](src/app/[locale]/about/history/page.tsx) renders the shared [AboutPlaceholderPage](src/components/pages/about-placeholder-page.tsx) ("Under construction" panel). The About dropdown links to it.
- **Impact:** the route exists and is reachable but has no real content.
- **Fix direction:** replace the shared placeholder with a dedicated `AboutHistoryPage` component. Extend `content.about.history` in `site-content.ts` with the actual narrative (founding story, milestones) in both locales. Decide whether to include archival photography or stay text-only. Team is no longer in this item — `/about/team` shipped with five leadership bios on 2026-04-28.

### 10. Technology page is a bare placeholder

- **Where:** [src/app/[locale]/technology/page.tsx](src/app/[locale]/technology/page.tsx) — renders a single hero section from `content.technology.pageHero` in `site-content.ts`. No body content.
- **Impact:** the route exists and is reachable but has no real content or design. Linked from the RX BRAIN section CTA, so users do land here.
- **Fix direction:** define the technology page scope in PLAN.md before building — it's unclear whether this belongs as a standalone page (deep RX BRAIN technical story) or should fold into the solutions narrative.

## Housekeeping

### 11. Open question: CMS is partially answered — resolve it

- **Context:** PLAN.md lists "Will non-engineers need to update copy/news/team?" as an open question. In practice, a MDX-based news CMS is already running (`content/news/`, `src/lib/news.ts`) with three live articles, but copy for every other section remains hard-coded in `site-content.ts` (~1145 lines).
- **Impact:** the answer determines whether to extend the MDX pattern to other collections (solutions, team, etc.) or leave them hard-coded. Leaving the question open causes ambiguity every time a new section needs content.
- **Fix direction:** decide explicitly. If MDX extends to other collections, plan it in PLAN.md. If `site-content.ts` is permanent, close the question there.

### 13. Commented-out language switcher in `site-header.tsx`

- **Where:** [src/components/site-header.tsx:219-235](src/components/site-header.tsx#L219-L235) — the `.language-switcher` block was wrapped in `{/* */}` in commit `0e61761` ("remove language toggle"). The unused `localeNames` and `pathname` references that fed it are still imported.
- **Impact:** dead code + an unused import. Both locales remain routable; users just have no UI affordance to switch.
- **Fix direction:** decide whether the toggle is coming back. If not, delete the block and drop the `localeNames` import. If yes, redesign it (current implementation does a naive `pathname.replace(/${locale}/...)` that won't survive the default-English routing in Phase 3).

## Verified working (for context)

These were QA'd during prior phases and are NOT tech debt — listed for traceability:

- Hero video autoplays muted, loops, `playsInline` on both `/` and `/zh`
- `prefers-reduced-motion: reduce` hides the video and keeps the poster (`display: none` on `.hero-media-video`)
- Mobile viewport (390×844) keeps the copy panel readable over the video
- Solutions carousel: only the active + adjacent cards fetch video sources; `visitedCards` keeps sources sticky once a card has been near
- Rx-brain pinned canvas: 127 frames at 1080 / 1600; pulse stays visible until the first canvas draw
