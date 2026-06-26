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
