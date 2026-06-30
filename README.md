# YhaZt Portfolio

Modern developer portfolio built with **React**, **Vite**, **Tailwind CSS v4**, and [ReactBits](https://reactbits.dev) animations.

Live demo: [https://yhazt.github.io](https://yhazt.github.io)

## Features

- Animated hero with gradient text, aurora background, and particle effects
- About, skills, projects, and social links sections
- Floating dock navigation + scroll progress indicator
- Dark / light theme toggle
- Optional WakaTime coding stats
- Optional Supabase CMS admin at `/admin`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Customize your content

Edit defaults in `src/lib/data.jsx`, or connect Supabase (see `supabase-schema.sql` and `.env.example`).

Also update:

- `src/sections/WakaTime.jsx` — add your WakaTime API key
- `index.html` — SEO meta tags
- `your@email.com` and LinkedIn URL in `data.jsx`

## GitHub Pages — repo name & URL

GitHub offers **free static hosting** on GitHub Pages. The repo name controls your URL:

| Repo name | Live URL |
|-----------|----------|
| **`YhaZt.github.io`** (recommended) | `https://yhazt.github.io/` |
| `me` (keep current name) | `https://yhazt.github.io/me/` |

**Recommended:** rename the repo to `YhaZt.github.io` for a clean root URL (`yhazt.github.io` with no `/me` path).

### Rename the repo on GitHub

1. Go to [github.com/YhaZt/me/settings](https://github.com/YhaZt/me/settings)
2. Under **Repository name**, change `me` → `YhaZt.github.io`
3. Click **Rename**

Then update your local remote:

```bash
git remote set-url origin https://github.com/YhaZt/YhaZt.github.io.git
```

### If you keep the repo named `me`

Set the base path in two places:

1. `.github/workflows/deploy.yml` — change `VITE_BASE_PATH: /` to `VITE_BASE_PATH: /me/`
2. Local builds: `VITE_BASE_PATH=/me/ npm run build`

## How to push changes

This repo auto-builds on every push to `main`. GitHub Actions also commits built files (`index.html`, `assets/`), which can cause merge conflicts if you push without pulling first.

### Standard workflow

```bash
cd me   # or your local clone of YhaZt.github.io

# 1. Pull latest (rebase keeps history clean)
git pull --rebase origin main

# 2. Stage and commit your source changes
git add .
git commit -m "describe your change"

# 3. Build production files for GitHub Pages
npm run build
# Copy build output to repo root (Windows PowerShell)
Copy-Item dist\index.html index.html -Force
Copy-Item dist\404.html 404.html -Force
Remove-Item assets -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item dist\assets assets -Recurse -Force

# 4. Commit built files (if changed)
git add index.html 404.html assets
git commit -m "chore: update built site"   # skip if nothing changed

# 5. Pull again in case CI pushed while you were building
git pull --rebase origin main

# 6. Push
git push origin main
```

### If you get merge conflicts

Conflicts usually appear in `index.html`, `404.html`, or `assets/`. Fix them by rebuilding:

```bash
git pull --rebase origin main
# resolve conflicts OR if stuck:
npm run build
Copy-Item dist\index.html index.html -Force
Copy-Item dist\404.html 404.html -Force
Remove-Item assets -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item dist\assets assets -Recurse -Force
git add index.html 404.html assets
git rebase --continue   # or: git commit (if merge, not rebase)
git push origin main
```

### GitHub secrets (contact form on live site)

Add in **Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|--------|---------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Contact form (get free key at [web3forms.com](https://web3forms.com)) |
| `VITE_CONTACT_EMAIL` | Optional — override recipient email |

Local dev uses `.env` (never commit — it's in `.gitignore`).

---

## Deploy to GitHub Pages (free)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys on every push to `main`.

### One-time setup

1. **Rename** the repo to `YhaZt.github.io` (see above)
2. Push your code to `main`:
   ```bash
   git add .
   git commit -m "feat: GitHub Pages deployment setup"
   git push origin main
   ```
3. On GitHub, open **Settings → Pages**
4. Under **Build and deployment → Source**, select **GitHub Actions**
5. Wait for the workflow to finish (Actions tab). Your site will be live at `https://yhazt.github.io`

### Manual deploy check

```bash
npm run build
npm run preview
```

## Tech stack

- React 19 + Vite 6
- Tailwind CSS v4 + shadcn/ui tokens
- Framer Motion / GSAP animations (ReactBits)
- React Router (portfolio + `/admin`)
- Supabase (optional CMS)

## License

MIT — use freely for your own portfolio.
