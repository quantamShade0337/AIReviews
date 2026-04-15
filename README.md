# AI Reviews

Static-first AI model ranking and editorial platform built with Next.js App Router.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
```

Deploy directly to Vercel (recommended) for static prerendered routes.

## Content management

- Add article markdown files in `content/articles`
- Add model markdown files in `content/models`
- Update `data/leaderboard.json`

The app automatically picks up new content at build time.

### Article frontmatter format

```md
---
title: "Codex vs Claude: Which Should You Use?"
date: "2026-04-15"
description: "A practical comparison of coding reliability, reasoning quality, and workflow fit."
---
```

### Model frontmatter format

```md
---
name: "Claude 4 Sonnet"
rating: 9.2
best_for: "Research, long-form writing, and careful reasoning"
---
```
