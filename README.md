# AI Reviews

Static-first AI model ranking and editorial platform built with Next.js App Router.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build static output

```bash
npm run build
```

The static site is exported to `out/`, ready for Vercel deployment.

## Content management

- Add article markdown files in `content/articles`
- Add model markdown files in `content/models`
- Update `data/leaderboard.json`

The app automatically picks up new content at build time.
