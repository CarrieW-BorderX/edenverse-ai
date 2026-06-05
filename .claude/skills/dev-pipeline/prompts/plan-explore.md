# Plan Explore — Prompt Template

Dispatch as `Explore` agent (up to 3 in parallel, one per area).

````
Agent(subagent_type="Explore"):
  description: "Explore [area] for pipeline plan"
  prompt: |
    I need to understand the current state of the [AREA] code in the usrobotx
    bilingual marketing site to plan a feature/section change.

    ## What I Need

    [USER_REQUIREMENT_SUMMARY]

    ## Your Job

    Scan the [AREA] and report back a structured inventory. Do NOT make any
    changes — report only.

    ### Source-of-truth files to read first (always)

    - `PLAN.md` — current intent, target feel, gaps
    - `CLAUDE.md` — project rules
    - `src/data/site-content.ts` — bilingual copy (may have relevant section already)

    ### For a page/section (src/app/[locale]/... or src/components/pages/...)
    - Relevant routes (`src/app/[locale]/<path>/page.tsx`)
    - Section components composed on that page
    - Copy keys consumed from `src/data/site-content.ts` (both locales)
    - CSS variables referenced (from `src/app/globals.css`)
    - Media assets referenced (from `public/media/`)
    - Existing scroll/reveal primitives used

    ### For motion / components (src/components/)
    - Existing primitives (`reveal-section.tsx`, etc.)
    - Scroll/intersection logic, if any
    - Reduced-motion handling
    - Dependencies declared in `package.json`

    ### For content / i18n (src/data/site-content.ts, src/lib/i18n.ts)
    - Current shape of the bilingual content tree
    - Gaps in zh coverage
    - How locale is threaded through (server vs client components)

    ### Reference benchmark

    If a `fieldai-mirror/www.fieldai.com/<page>.html` file is analogous to what
    we're building, note it. Do NOT exhaustively scrape the mirror — identify
    the single closest reference page.

    ## Output Format

    ```
    ## [Area] Inventory

    ### Files
    - path/to/file.tsx — description of what it does

    ### Components / Functions
    - ComponentName (file:line) — what it does

    ### Copy keys
    - siteContent.<path> — en/zh status

    ### Patterns
    - How [specific thing] is currently implemented

    ### Gaps vs. the requirement
    - What's missing

    ### Closest fieldai-mirror reference
    - fieldai-mirror/www.fieldai.com/<page>.html — why it's analogous
    ```

    Be thorough on files you read; be surgical about what you open in
    fieldai-mirror (it's a large mirror with cached assets).
````
