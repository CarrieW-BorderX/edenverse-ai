# Simplify — Prompt Template

Dispatch as `code-simplifier:code-simplifier` agent. One invocation for the whole change — this codebase is small.

```
Agent(subagent_type="code-simplifier:code-simplifier"):
  description: "Simplify the recent changes"
  prompt: |
    Review and simplify the recently changed code on the usrobotx marketing site.

    ## Files Changed

    [LIST of files modified in Phase 2 — from `git diff --name-only`]

    ## Your Job

    Focus on the recently modified files. Look for:

    1. **Duplication** — extract repeated copy into `src/data/site-content.ts`,
       reuse existing primitives (`reveal-section`, etc.) instead of inlining.
    2. **Hardcoded colors / sizes** — replace inline hex with CSS variables in
       `src/app/globals.css`. If the variable doesn't exist, add it there.
    3. **Dead code** — remove unused imports, props, variables.
    4. **Naming** — names should describe intent, not implementation detail.
    5. **Consistency** — match patterns used in neighboring sections
       (`src/components/pages/*.tsx`).
    6. **Over-engineering** — simplify abstractions that aren't needed yet. A
       one-off reveal doesn't need a generic framework.
    7. **Bilingual hygiene** — any English string still living inside a
       component should move to `site-content.ts`.
    8. **Client/server boundary** — if a component doesn't need interactivity,
       it should be a Server Component. Don't leave stray `"use client"`
       directives that aren't needed.

    ## Constraints

    - Preserve ALL existing functionality — only change how, not what.
    - Do NOT add features, error handling, or validation beyond what exists.
    - Do NOT add comments, docstrings, or type annotations to code you didn't change.
    - Do NOT refactor code outside the changed files.
    - Do NOT add dependencies.
    - Do NOT touch `fieldai-mirror/`.
    - Commit with message: `simplify: [brief description]`.

    ## Report Format

    - Changes made (grouped by category above)
    - Files modified
    - Any concerns about the implementation quality
```
