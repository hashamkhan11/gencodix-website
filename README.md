# Gencodix website

The company website for [Gencodix](https://gencodix.com): AI agents, WhatsApp automation and SaaS development for businesses worldwide.

Built with Next.js 16 (App Router), React 19 and Tailwind CSS 4.

## Features

- Shipped product case studies (KhataBol, PropNest, FitHub) and a clearly labelled concept lab
- AI project scoper that turns a rough idea into a project brief with a USD budget range
- Lead form that emails the team (Resend)
- `llms.txt`, sitemap, JSON-LD and Open Graph metadata

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the keys
npm run dev
```

## Environment variables

See `.env.example`. Without the API keys the site still runs; the scoper and the lead form show a friendly fallback pointing visitors to email and WhatsApp.
