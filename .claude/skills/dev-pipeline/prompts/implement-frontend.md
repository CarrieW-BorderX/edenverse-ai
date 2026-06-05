# Implement Frontend — Prompt Template

Dispatch as `principal-frontend` agent.

```
Agent(subagent_type="principal-frontend"):
  description: "Implement: [brief description]"
  prompt: |
    You are implementing a feature/section on the usrobotx bilingual marketing site.

    ## Plan

    [FULL_PLAN_TEXT — paste, don't link]

    ## Context

    - Routes affected: [list]
    - Locales: both (en + zh) — parity is required
    - fieldai reference: `fieldai-mirror/www.fieldai.com/<page>.html` — benchmark
      for hierarchy, motion cadence, density. Open and study before designing.
    - Source-of-truth docs:
      - PLAN.md — intent, target feel
      - CLAUDE.md — project rules
      - src/data/site-content.ts — all bilingual copy
      - src/app/globals.css — CSS variables
    - Existing motion primitive: `src/components/reveal-section.tsx`. Extend it
      rather than inventing a new scroll hook per page.

    ## Files to Modify

    [List from plan — file paths and what to change in each]

    ## Your Job

    1. Implement exactly what the plan specifies — no scope drift.
    2. Open the referenced fieldai-mirror page and study its DOM/CSS before
       designing. Benchmark against it; do not copy copy or branded assets.
    3. Add all copy to `src/data/site-content.ts` with both `en` and `zh`. Never
       hard-code strings in components.
    4. Use CSS variables from `globals.css` — never hardcode hex. If a new
       variable is needed, add it in `globals.css`, not inline.
    5. Respect `prefers-reduced-motion` for every scroll/motion effect.
    6. Use `next/image` for raster; `<video muted playsInline>` for footage.
    7. Match existing section-composition patterns
       (`src/components/pages/home-page.tsx` is a good reference).
    8. Do NOT silently add dependencies. The plan flags any new dep; if the plan
       doesn't, don't add one. Ask back.
    9. Verify:
       ```bash
       pnpm lint
       pnpm build   # includes tsc
       ```
    10. Commit your work with a descriptive message (one concern per commit).
    11. Report back.

    ## Constraints

    - Bilingual parity is non-negotiable — every string in both `en` and `zh`.
    - No hardcoded hex — CSS variables only.
    - No Tailwind (not installed). No CSS modules unless the plan says to.
    - No emojis in code or commit messages.
    - Don't touch unrelated files. Flag drift in the report.
    - Don't modify `fieldai-mirror/` — it's read-only reference.
    - Stay in scope. Adjacent refactors → flag in the report, don't do them.

    ## Report Format

    - What was implemented (section-by-section)
    - Files changed
    - Lint result (pass/fail — error summary if fail)
    - Build result (pass/fail — error summary if fail)
    - Bilingual status (both locales wired, or flag what's pending)
    - Browser verification (did you `pnpm dev` and watch the actual page, or
      couldn't run — be explicit; do not claim visual correctness without seeing it)
    - fieldai reference used (which page you benchmarked against)
    - Any deviations from plan or unresolved concerns
```
