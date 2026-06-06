# CLAUDE.md — Edenverse AI marketing site

Role: Technical Co-Founder. I'm the product owner — I make decisions, you make them happen. Build production-quality code, not prototypes. Push back if I'm overcomplicating things. Present options at decision points instead of picking one silently. No sycophantic openers or closing fluff. User instructions always override this file.

## Source of Truth

**Read `PLAN.md` at the start of every session.** It captures current intent, direction, gaps vs. the target feel, and open questions. If a request conflicts with `PLAN.md`, flag it before acting — don't silently drift.

Supporting references:

- `fieldai-mirror/` — local mirror of [fieldai.com](https://www.fieldai.com/) (`www.fieldai.com`, plus cached CDN/CloudFront assets and `trust.fieldai.com`). This is the **visual and motion benchmark**. When building a section, open the analogous fieldai page here and study the actual DOM, CSS, and asset pipeline before designing. Treat it as reference only — do not copy copy or branded assets.
- `src/data/site-content.ts` — all bilingual (`en`/`zh`) copy lives here today. Edit here, not inside components.
- `README.md` — Next.js scaffold boilerplate; ignore for project intent.

## Core Principles

### 1. Think Before Coding

- **Read before writing.** Don't propose changes to code you haven't read.
- **Ground visual work in `fieldai-mirror/` first.** For any hero, section, or motion treatment, inspect the fieldai analogue before designing from scratch. The target feel is premium industrial-robotics marketing, not stock Next.js template.
- **Plan first for multi-step work.** Use `superpowers:writing-plans` or `superpowers:brainstorming` before touching code when requirements are fuzzy.
- **Research → Plan → Execute → Feedback.** Never skip Research (produces wrong code fast) or Feedback (produces wrong code silently).

### The Harness

Default to a structured harness for anything beyond a one-line fix.

#### `/dev-pipeline` — the primary harness

Project-local skill at `.claude/skills/dev-pipeline/`. One invocation runs the full loop end-to-end:

1. **Plan** — Explore agents (parallel) → Plan agent produces a concrete plan with file paths, copy keys, CSS vars, fieldai reference
2. **Implement** — `principal-frontend` executes the plan
3. **Simplify** — `code-simplifier` dedup / CSS-var / bilingual-hygiene pass
4. **Review** — independent second opinion via `superpowers:code-reviewer` (or `/codex:review` if available)
5. **QA** — `e2e` agent runs `playwright-cli --headed` against `pnpm dev` across both locales + viewports
6. **Commit** — stops and asks before committing; never auto-commits

Three user gates: plan approval, review triage, commit approval.

Use `/dev-pipeline` for: any new section, any multi-file change, anything you'd otherwise write a plan for manually.
Skip it for: one-line fixes, typos, content-only tweaks to `site-content.ts`.

#### Project agents (`.claude/agents/`)

| Agent                | Location                                  | When to use                                                                     |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------------------- |
| `principal-frontend` | `.claude/agents/engineering/`             | Next.js / React / TS work — pages, sections, motion, bilingual copy wiring      |
| `e2e`                | `.claude/agents/engineering/`             | Browser verification after UI/motion changes via `playwright-cli`               |
| `cms`                | `.claude/agents/content/`                 | MDX content only — add, update, or translate articles under `content/news/` (and future `content/*` collections). Handles front-matter, en/zh parity, cover-image wiring. Never touches `src/` or styles. |

Dispatch rules:

- **Adding, editing, or translating a news article is always a `cms` dispatch, not inline work.** If the ask also touches `src/`, split into two dispatches — `principal-frontend` for the code first, then `cms` for the content that satisfies the new schema.
- **Route by surface, not keyword.** If the change only touches `content/**` and `public/media/news/**`, use `cms`. If it touches anything under `src/**` or `globals.css`, use `principal-frontend`. A change that spans both (e.g. new article + new layout field) is two dispatches, not one — `principal-frontend` for the code, then `cms` for the content, in that order so the content satisfies the new schema.
- `cms` never writes to `src/`, `site-content.ts`, `globals.css`, or `package.json`. If its task implies those, it stops and hands back.
- `cms` verifies with `npm run build` (the MDX loader runs at build time, so malformed front-matter fails there). Lint is not useful for MDX — skip it.
- `e2e` runs alone and sequentially — needs stable dev server + exclusive browser.
- Always finish UI work with `e2e`. Lint + build do not verify motion or bilingual parity. Pure content edits (`cms` only) do not need `e2e` — a build pass plus a screenshot is enough; add `e2e` only if you want to verify prev/next nav or spotlight ordering after editorial changes.
- `e2e` runs `playwright-cli` **offscreen** — the sandbox blocks subagents from attaching a GUI to the user's desktop. Screenshots and programmatic checks are real; the user does not see a window.
- After `e2e` returns, the main session does a **live visible smoke check** using the Playwright MCP tools (`mcp__plugin_playwright_playwright__browser_navigate`, `browser_resize`, `browser_evaluate`, `browser_take_screenshot`, `browser_close`). These open a real Chromium window on the user's desktop — the only way the user sees the change live. Keep it short (one or two routes, one viewport); the subagent already covered the matrix.
- No backend/migrate/deploy agents — this repo doesn't have those surfaces.

#### Supporting skills

The `superpowers:*` plugin provides composable building blocks for work outside `/dev-pipeline`:

- `writing-plans`, `executing-plans` — plan stage
- `systematic-debugging`, `test-driven-development` — execute stage
- `verification-before-completion`, `requesting-code-review`, `receiving-code-review` — feedback stage
- `brainstorming` — when requirements are fuzzy

### 2. Simplicity First

- **Don't add features, refactor, or "improve" beyond what was asked.** A bug fix doesn't need surrounding cleanup.
- **Three similar lines is better than a premature abstraction.** No helpers for one-time operations, no hypothetical-future design.
- **Don't add error handling or validation for impossible cases.** Only validate at boundaries (user input, external APIs, CMS).
- **No backwards-compat shims or tombstone comments.** Delete unused code completely.
- **Prefer editing existing files over creating new ones.** Never create `*.md` / READMEs unless explicitly asked.
- **No emojis in code, commits, or files** unless explicitly requested.

### 3. Surgical Changes

- **Stay in scope.** If the request is "fix section 3," fix section 3 — don't also touch section 4.
- **Don't add comments or type annotations to code you didn't change.**
- **Small, focused commits.** One concern per commit. Run type-check + lint before committing.
- **Prefer `Edit` over `Write`** — send the diff, not the whole file.

### 4. Goal-Driven Execution

- **Evidence before assertions.** Never claim "done" without running the verification step and reading the output.
- **Verify what you change:**
  - Code changes → `pnpm lint` and `pnpm build` (or `next build`) — `tsc` runs inside build
  - UI/motion changes → start `pnpm dev`, load the page in a real browser, and actually watch the scroll/animation. Type-check and lint do not verify feel.
  - Bilingual changes → check both `/en/...` and `/zh/...` routes
- **When an approach fails, diagnose — don't retry blindly.**
- **No destructive shortcuts.** Fix root causes; don't bypass with `--no-verify`, `--force`, or `git reset --hard`. Ask before hard-to-reverse actions.
- **Stop when the goal is met.** No unsolicited polish passes.

## Project Overview

Bilingual marketing site for `edenverse.ai` — display- and contact-focused, **no e-commerce**.

- Next.js 16 App Router, React 19, TypeScript
- Bilingual routing via `src/app/[locale]/`. English is the URL root (`/`, `/solutions`); Chinese is under `/zh`. `src/proxy.ts` rewrites unprefixed paths to `/en/...` internally and redirects `/en/...` → canonical prefix-free URL.
- Content hard-coded in `src/data/site-content.ts` (~1145 lines, bilingual); MDX news CMS for `/news` under `content/news/`. Other-collection CMS migration is still an open question — see `PLAN.md`.
- Production media is served from the **Shopify CDN** (`cdn.shopify.com/s/files/1/0764/3063/9301/...`) and referenced by URL from `site-content.ts` / MDX. `next.config.ts` whitelists `cdn.shopify.com` for `next/image`. `public/media/` is now reserved for the rx-brain frame sequence (`/media/rx-brain/frames/{1080,1600}/`) plus a few small static assets.
- Raw footage and video masters in `raw_assets/` — **gitignored**. Web exports get uploaded to Shopify, not committed.
- Netlify is the deploy target. Production deploys are manual via `npm run deploy:prod`; `main` push does not auto-deploy.
- Future: Shopify-fed display-only product pages, SEO redirects from the legacy WordPress site, sitemap / robots / og: metadata.

Target feel: motion-first, scroll-driven storytelling, dense multi-resolution media, deep per-industry solution pages. Benchmark: `fieldai-mirror/`.

## Repo Structure

```
src/
  app/
    [locale]/           — bilingual routes; 9 pages per locale
      about/            — page.tsx + history/, team/ subroutes
      contact/
      solutions/
      news/             — page.tsx + [slug]/
      technology/       — page.tsx (placeholder; see TODO.md)
      layout.tsx, page.tsx, not-found.tsx
    layout.tsx, page.tsx — root shell; delegates into [locale]
    globals.css
  proxy.ts                       — rewrites unprefixed paths to /en internally; redirects /en/* → canonical
  components/
    site-header.tsx, site-footer.tsx
    reveal-section.tsx           — fade-in-on-scroll primitive
    deployment-cycle-section.tsx
    solutions-carousel-section.tsx — lazy-loaded carousel (active + adjacent cards only)
    media/
      image-carousel.tsx, news-badge.tsx, news-video.tsx — MDX body components for news
    motion/
      image-sequence.tsx         — pinned GSAP ScrollTrigger canvas scrubber (rx-brain section)
      media-loading-pulse.tsx    — pulsing Edenverse mark placeholder, shown while media is loading
      lenis-provider.tsx, use-reduced-motion.ts, use-in-view-autoplay.ts
    pages/                       — page-level section compositions (about, about-team, contact, home, news-*, solutions, plus about-placeholder)
      sections/                  — home-hero, rx-brain-section, latest-events-section, solution-detail-row, about-stats
  data/
    site-content.ts              — ~1145 lines, bilingual strings for every section
    rx-brain-frames.ts           — generated frame manifest (127 frames @ 1080/1600)
  lib/
    i18n.ts                      — locale resolution + localePrefix() helper
    news.ts, news-types.ts, news-date.ts — MDX news loader
content/news/                    — MDX articles (3 live: agibot, almond orchard, nvidia inception)
public/
  media/
    rx-brain/frames/{1080,1600}/ — 127 webp frames each (indices 025–151)
    news/                        — empty per-slug folders (legacy; cleanup pending — see TODO.md)
    logos/favicon.ico
raw_assets/                      — gitignored. Raw footage, Premiere projects, video masters.
fieldai-mirror/                  — reference mirror; see Source of Truth above
PLAN.md, TODO.md                 — intent, direction, gaps, tech debt
```

**Asset rule:** raw masters live in `raw_assets/` (gitignored). Web exports are uploaded to **Shopify CDN** (`cdn.shopify.com/s/files/1/0764/3063/9301/...`) and referenced by URL from `site-content.ts` and MDX. Do **not** commit video binaries to the repo. The rx-brain frame sequence is the only large media asset that stays local — it benefits from per-frame `Cache-Control: immutable` via `netlify.toml`.

No tests, no Storybook, no CMS. Motion stack in use: `gsap` + `@gsap/react` (ScrollTrigger for the rx-brain pinned scrubber), `lenis` (smooth scroll). Don't add a second motion library — extend these.

## Tech Stack

- **Framework:** Next.js `16.2.4` (App Router), React `19.2.4`, TypeScript `^5`
- **Styling:** Plain CSS (`globals.css` + co-located module CSS if introduced). No Tailwind.
- **Content:** Bilingual static TS object in `src/data/site-content.ts`
- **Tooling:** ESLint (`eslint-config-next`), pnpm/npm (scripts in `package.json`)
- **Deploy target:** Netlify (future)

Scripts:

| Command               | What it does                                 |
| --------------------- | -------------------------------------------- |
| `pnpm dev`            | Next dev server (localhost:3000)             |
| `pnpm dev:network`    | Dev server on `0.0.0.0:3000` for LAN preview |
| `pnpm build`          | `next build` — includes type-check           |
| `pnpm start`          | Production server                            |
| `pnpm lint`           | ESLint                                       |
| `npm run deploy:preview` | `netlify deploy --build` — upload preview URL |
| `npm run deploy:prod`    | `netlify deploy --build --prod` — publish to production |

## Design Direction

Premium industrial-robotics marketing. Benchmark against `fieldai-mirror/` for hierarchy, type, motion cadence, and media density. Stock Next.js aesthetics (gradient buttons, centered hero cards, rounded-xl-everything) are explicit anti-patterns.

Rules of thumb:

- **Motion is content, not decoration.** Scroll-scrubbed sequences, pinned sections, parallax stacks — not fade-in-on-mount sprinkles.
- **Multi-resolution media.** Target `webp` variants at 500 / 800 / 1080 / 1600 / 2000 widths; serve via `next/image`.
- **Bilingual parity.** Every new string, label, aria tag, and motion caption lands in both `en` and `zh` inside `site-content.ts`. Don't ship one-sided strings.
- **No hardcoded colors in components.** Use CSS variables defined in `globals.css`.
- **Respect `prefers-reduced-motion`.** Every scroll/parallax effect needs a reduced-motion fallback.
-- **Loading placeholders use `<MediaLoadingPulse>`.** Any deferred / async media (carousel videos, scroll-scrubbed canvases, per-card autoplay) renders a pulsing Edenverse mark — the asset URL is set on `.media-loading-pulse-mark` in `globals.css` and should point at the Shopify-hosted `edenverse-square-transparent.png`. Don't invent per-section placeholders or reach for a different stock image.

## Deploy

- `main` push is intentionally blocked from auto-deploying via `[context.production] ignore = "exit 0"` in `netlify.toml`.
- Previews ship via `npm run deploy:preview` (throwaway URL). Production ships via `npm run deploy:prod` — only after user approval.
- Windows requires Developer Mode on for the local `@netlify/plugin-nextjs` step to create symlinks. If the deploy errors with `EPERM: symlink`, that's the cause.
- Git note: this repo is a sparse checkout. `git add <path>` may error with "outside of your sparse-checkout definition" — pass `--sparse` to override.

## Open Questions (from `PLAN.md`)

Keep these in mind — they change the cost model for any large change:

- Will non-engineers need to update copy/news/team? (CMS vs. hard-coded `site-content.ts`)
- Is `en`/`zh` bilingual firm?
- What real product photography and footage exists today vs. needs to be produced?
- Build ourselves vs. Webflow?

If you're about to spend >1 session on something that these questions could invalidate, stop and confirm first.

## Commit & Push Style

- **Commit under the user's git identity only.** Use whatever `git config user.name` / `user.email` are set to — do **not** override them. Never add a `Co-Authored-By: Claude` trailer or any other AI-assistant attribution to commits on this repo. Commit messages describe the change, not who typed it.
- **Push with the user's `gh` / git credentials.** Do not re-auth, do not switch remotes, do not push via a different account. If a push fails on auth, surface it — don't work around it.
- **Never push without explicit user instruction.** Committing ≠ pushing. Even after an approved commit, `git push` needs its own green light every time.
- **Never force-push `main`.** If history needs rewriting, stop and ask.
- Small, focused commits; one concern per commit
- Run `pnpm lint` and `pnpm build` before committing UI/logic changes
- Never skip hooks (`--no-verify`) unless explicitly authorized
- Prefer new commits over `--amend` for published work
- No emojis in messages unless explicitly requested

## Tool Usage

- Dedicated tools over Bash: `Read` not `cat`, `Edit` not `sed`, `Glob` not `find`, `Grep` not `grep`/`rg`
- Parallel tool calls when independent; sequential only when results feed each other
- **Do not `Read` or `Grep` inside `fieldai-mirror/` blindly** — it's a large mirror with cached third-party assets. Target specific `www.fieldai.com/<page>.html` or `solutions/<slug>.html` files when you need them.
