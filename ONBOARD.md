# ONBOARD.md — for a fresh Claude agent on this repo

Run through this once when you open this project for the first time. After that, `CLAUDE.md` is your daily source of truth.

## 1. Read these, in order

1. **`CLAUDE.md`** — project rules, principles, harness, tech stack, verification expectations. Always loaded; re-read if the file changed.
2. **`PLAN.md`** — current intent, target feel, gaps vs. target, open questions. Treat as canonical.
3. **`README.md`** — check it; upstream may have added real content beyond the Next.js scaffold.
4. Skim `src/app/[locale]/` and `src/data/site-content.ts` so you know the bilingual content shape before you're asked to touch it.

Do **not** bulk-`Read` or `Grep` inside `fieldai-mirror/` — it's a large, third-party mirror used as reference only. Open specific `www.fieldai.com/<page>.html` files when benchmarking a section.

## 2. Required Claude setup

### Plugins

Enabled in `.claude/settings.json`:

- **`superpowers@claude-plugins-official`** — provides `brainstorming`, `writing-plans`, `executing-plans`, `systematic-debugging`, `test-driven-development`, `verification-before-completion`, `code-reviewer`, `requesting-code-review`, `receiving-code-review`, etc.

If Claude Code reports these skills as missing, install the plugin:

```bash
# from Claude Code:
/plugin install superpowers@claude-plugins-official
```

### Optional plugins (nice to have)

- **`code-review` / `codex:codex-rescue`** — used in `/dev-pipeline` Phase 4 for an independent second-opinion review. If unavailable, the pipeline falls back to `superpowers:code-reviewer`.

### MCP servers

No project-required MCP servers. Any MCP tools you see in your session (Notion, pencil, context7, etc.) are user-global — don't assume they're part of this project's workflow unless the user invokes them.

## 3. Required local tooling

Verify before doing UI/QA work:

```bash
node --version         # Node 22.x (repo tested on v22.15)
pnpm --version         # pnpm preferred; npm works as fallback
which playwright-cli   # for the e2e agent and playwright-cli skill
```

If `playwright-cli` is missing, install globally:

```bash
npm i -g playwright-cli
# first run may also need: npx playwright install chromium
```

## 4. Bootstrap the project

```bash
pnpm install            # or npm install
pnpm dev                # http://localhost:3000 — English at the root
# both locales:
#   http://localhost:3000/           (English; `/en/*` redirects here)
#   http://localhost:3000/zh
```

Verification commands:

```bash
pnpm lint
pnpm build              # includes tsc; use this as the type-check gate
```

## 5. The `.claude/` harness

```
.claude/
├── settings.json                         — plugin enablement + prettier hook
├── settings.local.json                   — auto-generated permission cache (gitignored/personal)
├── agents/engineering/
│   ├── principal-frontend.md             — Next.js/React/TS/bilingual implementer
│   └── e2e.md                            — playwright-cli browser QA
└── skills/
    ├── dev-pipeline/                     — the primary end-to-end harness
    │   ├── SKILL.md
    │   └── prompts/                      — per-phase subagent prompts
    └── playwright-cli/                   — browser automation skill
```

**When to use `/dev-pipeline`:** any new section, any multi-file change, anything you'd otherwise plan manually. Six phases with three user gates (plan, review, commit). Never auto-commits.

**When not to:** one-line fixes, typos, content-only tweaks to `site-content.ts` — just edit.

**Project agents** (dispatch via `Agent` tool):

| Agent                | When                                                      |
| -------------------- | --------------------------------------------------------- |
| `principal-frontend` | Implementing UI / motion / bilingual work                 |
| `e2e`                | Browser verification (runs ALONE, sequentially, headed)   |

No backend / migrate / deploy agents exist — this repo has no backend, no K8s, no DB.

## 6. Things not to do

- Don't `Read`/`Grep` blindly inside `fieldai-mirror/`. Open specific HTML files when benchmarking.
- Don't hard-code strings in components — they go in `src/data/site-content.ts` with both `en` and `zh`.
- Don't hard-code hex colors in components — use CSS variables from `src/app/globals.css`.
- Don't silently add a motion/CMS dependency. Flag in a plan and ask.
- Don't run `playwright-cli` headless. The `e2e` agent uses `--headed` so the user can watch.
- Don't auto-commit. `/dev-pipeline` has an explicit user gate before commit; honor it.
- Don't push without being asked. Commit ≠ push.
- Don't touch files under `fieldai-mirror/` — reference-only.

## 7. First-run self-check

Run this as a sanity pass the first time you're asked to do anything non-trivial:

```bash
# plugins visible?
# -> you should see skills like `superpowers:writing-plans` in your skill list

# project agents visible?
ls .claude/agents/engineering         # principal-frontend.md, e2e.md

# project skills visible?
ls .claude/skills                     # dev-pipeline/, playwright-cli/

# tooling works?
node --version && pnpm --version && which playwright-cli

# dev server comes up on both locales?
pnpm dev &
sleep 4
curl -s -o /dev/null -w "root %{http_code}  zh %{http_code}\n" \
  http://localhost:3000/ http://localhost:3000/zh
# expect: root 200  zh 200
# (http://localhost:3000/en redirects to /, by design — see Phase 3 in PLAN.md)
kill %1
```

If anything here fails, stop and surface it to the user before proceeding with the task.

## 8. Known quirks

- **English at the URL root** — `src/proxy.ts` rewrites unprefixed paths to `/en/...` internally and redirects any `/en/...` URL to the canonical prefix-free version. Use `localePrefix(locale)` from `src/lib/i18n.ts` to build links — it returns `""` for `en` and `/zh` for `zh`.
- **`<html lang>` on `/zh`** — fixed. `src/proxy.ts` sets the `x-pathname` header; `src/app/layout.tsx` reads it to resolve locale and sets `lang={lang}` on `<html>` correctly for both locales.
- **Media is on Shopify CDN.** Hero, solutions, news, and logo assets are referenced by `cdn.shopify.com/s/files/1/0764/3063/9301/...` URLs from `site-content.ts` and MDX. `next.config.ts` whitelists `cdn.shopify.com` for `next/image`. The only large local media set is `public/media/rx-brain/frames/`.
- **`.claude/settings.local.json`** is auto-generated when Claude records Bash permissions. Personal and should be gitignored; don't edit by hand.
- **No tests yet.** No Jest/Vitest/Playwright test suite. Verification is `pnpm build` + live browser via the `e2e` agent.
- **Motion stack in use:** `gsap@^3.15.0` + `@gsap/react` (ScrollTrigger) + `lenis@^1.3.23`. Primitives: `LenisProvider`, `ImageSequence`, `MediaLoadingPulse`, `reveal-section`. Do not add a second motion library — extend these.
