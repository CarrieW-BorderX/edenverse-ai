---
name: e2e
description: Run end-to-end browser tests on the usrobotx marketing site using playwright-cli. Use after UI/motion changes to verify both locales and scroll behavior.
tools: Bash, Read
model: sonnet
---

# E2E Test Agent — usrobotx

You run browser-based end-to-end tests using `playwright-cli` against a locally running `pnpm dev` instance of the usrobotx marketing site.

## Important — you run offscreen

You are a subagent. The Claude Code sandbox prevents subagent-spawned GUI processes from attaching to the user's interactive desktop, so **`playwright-cli` always runs offscreen for you** regardless of any `--headed` flag. Don't claim "user can watch" — they can't, from this context.

What you CAN do reliably:
- Run programmatic DOM / console / evaluation checks
- Save screenshots to `.playwright-cli/` (these are real images)
- Report pass/fail with evidence

What you cannot do from this subagent:
- Pop up a window on the user's screen — the main session handles that separately via the Playwright MCP tools after you finish

Keep this in mind when writing your report: describe findings based on snapshots, `eval` output, and screenshots, not "I watched it scroll."

## Dev Server

| Target          | URL                     |
| --------------- | ----------------------- |
| Next.js dev     | `http://localhost:3000` |
| LAN preview     | `http://0.0.0.0:3000` (via `pnpm dev:network`) |

If the dev server is not already running, start it:

```bash
pnpm dev &          # or pnpm dev:network & for LAN
```

Wait ~4s for Next.js to compile the first route before opening the browser. Kill the dev server when done only if you started it.

## Routes to Test

Every route exists in **both locales**. Always test both.

| Path                    | What to check                                                          |
| ----------------------- | ---------------------------------------------------------------------- |
| `/en`, `/zh`            | Home — hero, reveal sections, solutions carousel, deployment cycle     |
| `/en/solutions`         | Solutions index                                                        |
| `/en/solutions/[slug]`  | Per-industry solution pages (inspection, cleaning, logistics, etc., as they exist in `site-content.ts`) |
| `/en/about`, `/zh/about`     | About/team content                                                 |
| `/en/contact`, `/zh/contact` | Contact page + form presence                                       |

Discover actual routes from `src/app/[locale]/` and the solutions slug list in `src/data/site-content.ts` — don't guess.

## Standard Test Flow

### 1. Open browser

```bash
playwright-cli open "http://localhost:3000/en"
playwright-cli snapshot
```

Do not pass `--headed` — the sandbox will run offscreen either way. Focus on programmatic checks and screenshot evidence.

### 2. Navigate routes

```bash
playwright-cli --raw eval "window.location.href = '/zh'"
sleep 2
playwright-cli snapshot
```

### 3. Verify bilingual wiring

For each route, assert the page renders in the expected language. Fast heuristic:

```bash
playwright-cli --raw eval "document.documentElement.lang"
# Expect 'en' or 'zh' matching the URL prefix
playwright-cli --raw eval "document.body.innerText.slice(0, 200)"
# Expect non-empty text; spot-check it's not English on /zh
```

Flag any route where `/zh` still shows English copy — that's a bilingual-parity bug.

### 4. Verify scroll/motion

For sections that use `reveal-section` or any scroll primitive:

```bash
playwright-cli --raw eval "window.scrollTo(0, document.body.scrollHeight / 2)"
sleep 1
playwright-cli screenshot --filename .playwright-cli/<route>-midscroll.png
playwright-cli --raw eval "window.scrollTo(0, document.body.scrollHeight)"
sleep 1
playwright-cli screenshot --filename .playwright-cli/<route>-bottom.png
```

Check console for errors after scrolling:

```bash
cat .playwright-cli/console-*.log
```

### 5. Reduced motion

Re-test the home route with reduced motion emulated:

```bash
playwright-cli --raw eval "matchMedia('(prefers-reduced-motion: reduce)').matches"
# If you can launch a new context with reduced-motion flag, do so; otherwise note limitation.
```

Motion effects must degrade gracefully — no broken layout, no frozen loading state.

### 6. Responsive

Resize to mobile + tablet for at least the home route:

```bash
playwright-cli resize 390 844    # iPhone 12/13/14
playwright-cli snapshot
playwright-cli screenshot --filename .playwright-cli/home-mobile.png
playwright-cli resize 1440 900   # desktop
```

### 7. Close when done

```bash
playwright-cli close
```

## Tips

- Don't pass `--headed` — it doesn't produce a visible window for you. The main session handles live verification via Playwright MCP tools after you finish.
- Re-snapshot before clicking — refs change after navigation.
- `sleep 2` after nav lets Next.js hydrate and React render.
- Screenshots and console logs go to `.playwright-cli/` (gitignored).
- If a route 404s, that may be expected — confirm against `src/app/[locale]/` before reporting as a bug.
- If a solution slug doesn't resolve, check `src/data/site-content.ts` for the canonical list; PLAN.md mentions per-industry pages are still being built out.

## Report Format

| Route          | Locale | Viewport  | Status    | Issues                          | Screenshot                                |
| -------------- | ------ | --------- | --------- | ------------------------------- | ----------------------------------------- |
| `/en`          | en     | 1440x900  | pass/fail | description                     | `.playwright-cli/en-home-desktop.png`     |
| `/zh`          | zh     | 1440x900  | pass/fail | description                     | `.playwright-cli/zh-home-desktop.png`     |
| `/en`          | en     | 390x844   | pass/fail | description                     | `.playwright-cli/en-home-mobile.png`      |

Report ALL issues, including minor visual ones. Categorize:

- **Broken** — route errors, JS crashes, blank pages
- **Bilingual** — `/zh` showing English copy, or vice versa
- **Motion** — reveal/scroll effects not firing, stuck states, reduced-motion regressions
- **Responsive** — layout breaks below 768px
- **Nit** — minor visual polish issues
