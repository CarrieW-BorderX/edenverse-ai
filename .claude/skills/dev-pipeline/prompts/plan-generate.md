# Plan Generate — Prompt Template

Dispatch as `Plan` agent after Explore agents return.

````
Agent(subagent_type="Plan"):
  description: "Generate implementation plan"
  prompt: |
    Generate a structured implementation plan for the following feature/section
    on the usrobotx bilingual marketing site.

    ## User Requirement

    [USER_REQUIREMENT — full text]

    ## Current State (from Explore agents)

    [EXPLORE_RESULTS — paste all explore agent outputs]

    ## Reference Documents

    - `PLAN.md` — intent, current direction, gaps vs. target feel
    - `CLAUDE.md` — project rules (bilingual parity, CSS vars, reduced motion)
    - `fieldai-mirror/www.fieldai.com/<closest-reference>.html` — visual benchmark

    ## Your Job

    Diff current state against the requirement and produce a concrete plan.
    No vague "update the UI" — specify component, prop, CSS variable, copy key.

    ## Output Format

    ### Scope Classification
    ```
    affected_routes: [list of route paths]
    affected_locales: [en, zh, or both — almost always both]
    new_primitives_needed: [list of new components or "none"]
    new_dependencies_proposed: [e.g., "gsap@3.x" with justification, or "none"]
    new_css_vars: [list of var names to add to globals.css, or "none"]
    media_work_needed: [what new/updated assets are required, or "none"]
    ```

    ### Copy changes (site-content.ts)
    - **Key:** `siteContent.<path>`
    - **en:** "..."
    - **zh:** "..."
    (Pseudo-translation placeholders OK if flagged; real zh copy preferred.)

    ### Component changes
    For each file to modify or create:
    - **File:** path
    - **Change:** what to add/modify — props, sections, scroll behavior
    - **Dependencies:** other files this depends on
    - **Motion:** scroll/reveal treatment, reduced-motion fallback

    ### Style changes (globals.css)
    - New CSS variables (name + value for light + dark if applicable)
    - Rule changes

    ### Media
    - Assets to add under `public/media/<path>`
    - Widths/formats expected (webp variants at 500/800/1080/1600/2000 when sourcing new images)

    ### Verification
    - Routes to test: `/en/<path>`, `/zh/<path>`
    - Viewports: desktop 1440x900, mobile 390x844
    - Motion checks: scroll triggers, reduced-motion fallback
    - Bilingual spot-check: confirm `/zh` shows zh copy (not English)

    ### fieldai reference
    - `fieldai-mirror/www.fieldai.com/<page>.html` — what to emulate (hierarchy,
      cadence, density), what NOT to copy (their branded copy/assets).

    Keep the plan concrete: file paths, component names, copy keys, CSS var
    names. If a new dependency is proposed, justify why existing primitives
    can't deliver the effect.
````
