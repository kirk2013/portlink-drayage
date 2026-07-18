# PortLink Drayage

Bilingual NY/NJ port drayage marketing site for PortLink.

## Local development

```bash
npm ci
npm run dev
```

## Cloudflare deployment

Build command:

```bash
npm run build
```

Deploy command:

```bash
npx wrangler deploy
```

Cloudflare can connect this repository to Workers Builds. Pushes to `main`
will then build and deploy automatically.
