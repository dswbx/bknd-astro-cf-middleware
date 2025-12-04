# bknd starter: Astro + Cloudflare D1 (Middleware)

A minimal Astro project with bknd integration using middleware and Cloudflare D1.

This starter serves bknd via Astro middleware and static assets, without requiring React for the admin UI.

## Getting Started

```bash
npm install
cp .env.example .env  # and fill in your secrets
npm run dev
```

## Project Structure

```text
/
├── public/
│   └── bknd/          # admin UI assets (auto-generated via postinstall)
├── src/
│   ├── bknd.ts        # bknd app factory and helpers
│   ├── middleware.ts  # routes /api and /admin to bknd
│   └── pages/
│       ├── index.astro
│       └── ssr.astro
├── appconfig.json     # bknd runtime config (for hybrid mode)
├── bknd.config.ts     # bknd configuration
├── bknd-types.d.ts    # generated types
└── wrangler.jsonc     # cloudflare config with D1 binding
```

## How It Works

Instead of using catch-all route handlers (`[...api].astro`, `[...admin].astro`), this starter uses Astro middleware to intercept requests to `/api` and `/admin` and forwards them to bknd. This approach is cleaner and more flexible.

The admin UI is served as static assets from `/public/bknd/`, which are copied during `postinstall`.

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies + copies bknd assets   |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run deploy`  | Build and deploy to Cloudflare               |

## Cloudflare D1 Setup

This starter is configured for Cloudflare Workers with D1. Update `wrangler.jsonc` with your D1 database binding:

```jsonc
"d1_databases": [
   {
      "binding": "DB",
      "database_name": "your-database-name",
      "database_id": "your-database-id"
   }
]
```

## Want to learn more?

Feel free to check [our documentation](https://docs.bknd.io/integration/astro) or jump into our [Discord server](https://discord.gg/952SFk8Tb8).
