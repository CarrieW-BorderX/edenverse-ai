# RobotX AI Website

Code-managed rebuild of `usrobotx.com` using `Next.js`, bilingual routing, local media assets, and a responsive marketing-site structure.

## Stack

- `Next.js` App Router
- `TypeScript`
- global CSS in `src/app/globals.css`
- web-ready media in `public/media` (raw footage and video masters live in `raw_assets/`, which is gitignored)

## Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For local-network testing on another device or via your machine IP, use:

```bash
npm run dev:network
```

Then open `http://<your-local-ip>:3000`.

## Available routes

- `/en`
- `/en/solutions`
- `/en/about`
- `/en/contact`
- `/zh`
- `/zh/solutions`
- `/zh/about`
- `/zh/contact`

## Project structure

```text
public/
  media/           # web-ready, committed
    home/
raw_assets/        # gitignored — raw footage, Premiere projects, video masters
src/
  app/
  components/
  data/
  lib/
```

## Content and media

- Site copy and bilingual text live in `src/data/site-content.ts`
- Reusable site-wide styles live in `src/app/globals.css`
- Home page layout lives in `src/components/pages/home-page.tsx`
- Header and footer live in `src/components/site-header.tsx` and `src/components/site-footer.tsx`
- Local media assets are currently sourced from `public/media/home`
- Raw footage and video masters live in `raw_assets/` (gitignored). Web exports (optimized MP4, WebM, poster stills) are produced from those masters and copied into `public/media/` before being committed.

## Current implementation notes

- Header is fixed to the top of the page
- On the home page hero, the header is transparent before scroll and becomes solid after scrolling
- The home hero uses a local background video
- Solution visuals currently use local placeholder images from `public/media/home`
- The site is display/contact focused and does not include e-commerce
- Use `npm run dev` for `localhost` development and `npm run dev:network` for LAN preview

## Future extensions

- Shopify-fed display-only product pages
- Netlify deployment configuration
- SEO redirects from the WordPress site
- CMS or admin-managed content workflows
- Reintroducing progressive reveal animations as enhancement instead of required rendering logic

---

## Git Collaborative Workflow

Guidelines for team members to minimize merge conflicts and keep the `main` branch stable.

### Branch strategy

```
main          ← production-ready, always deployable
└── dev       ← integration branch, merge here first
    ├── feature/your-feature-name
    ├── fix/bug-description
    └── chore/task-description
```

- `main` — protected. Never commit directly. Only merge from `dev` after review.
- `dev` — shared integration branch. All feature branches merge here first.
- Feature/fix branches — short-lived, one task per branch.

### Starting a new task

Always branch off the latest `dev`:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name
```

Use a clear, descriptive name: `feature/home-hero-animation`, `fix/header-scroll-bug`, `chore/update-readme`.

### While working

Commit small and often with clear messages:

```bash
git add src/components/pages/home-page.tsx
git commit -m "feat: add hero animation on scroll"
```

Use conventional commit prefixes: `feat:`, `fix:`, `chore:`, `refactor:`, `style:`, `docs:`.

### Staying in sync with dev (do this daily)

Rebase your branch onto `dev` regularly to avoid large divergence:

```bash
git fetch origin
git rebase origin/dev
```

If conflicts appear, resolve them file by file, then:

```bash
git add <resolved-file>
git rebase --continue
```

### Submitting your work

1. Rebase onto latest `dev` one final time (see above).
2. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a Pull Request (PR) targeting `dev` — not `main`.
4. Request at least one reviewer before merging.
5. Delete the branch after merge.

### Merging dev into main

Only a lead/owner merges `dev` → `main`, and only when `dev` is stable and tested:

```bash
git checkout main
git pull origin main
git merge --no-ff dev
git push origin main
```

### Rules to minimize conflicts

| Rule | Why |
|------|-----|
| One feature per branch | Keeps diffs small and reviewable |
| Pull/rebase from `dev` daily | Catch conflicts early while they're small |
| Never force-push to `dev` or `main` | Rewrites history, breaks teammates' branches |
| Keep PRs under 400 lines changed | Large PRs are hard to review and conflict-prone |
| Communicate in Slack/chat before editing shared files | e.g., `globals.css`, `site-content.ts`, `site-header.tsx` |
| Always pull before you push | `git pull --rebase origin dev` before any push |

### Resolving a conflict

```bash
# 1. Fetch latest
git fetch origin

# 2. Rebase your branch onto dev
git rebase origin/dev

# 3. Git will pause at each conflict — open the file and resolve:
#    Keep your changes, their changes, or combine both.
#    Remove all <<<<, ====, >>>> markers.

# 4. Stage the resolved file
git add <file>

# 5. Continue rebasing
git rebase --continue

# 6. Push (force-push is OK on YOUR OWN feature branch only)
git push --force-with-lease origin feature/your-feature-name
```

### Logging out of git credentials

To remove stored credentials on Windows:

1. Open **Control Panel → Credential Manager → Windows Credentials**
2. Find and remove any entry starting with `git:https://`

Or via terminal:

```bash
git credential-manager erase
```

Then enter the host/protocol when prompted, e.g.:
```
protocol=https
host=github.com
```
