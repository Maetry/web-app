# Maestri — Web

Frontend for **Maestri**, a salon/workspace scheduling product. Next.js 16 (App Router) +
React 19 + TypeScript (strict), Redux Toolkit / RTK Query, Tailwind CSS v4, shadcn (Base UI).

> The UI is being rebuilt. Pages and UI components were reset; the data/business layer
> (`src/services`, `src/store`, `src/features`) is preserved as a working reference and is not yet
> wired to any page. See [`CLAUDE.md`](./CLAUDE.md) for architecture and conventions.

## Prerequisites

- **Bun 1.2.15** (package manager — not npm/pnpm/yarn)
- **Node >= 22**
- Env var `NEXT_PUBLIC_API_BASE_URL` — base URL of the Maestri API (`.env*` is gitignored; ask a
  maintainer for the value)

## Getting Started

```bash
bun install
bun run dev
```

Then open **https://localhost:3000** — `bun run dev` serves over HTTPS (`--experimental-https`,
required for Google/Apple OAuth redirect URIs); self-signed certs are generated on first run.

## Scripts

```bash
bun run build          # production build (Turbopack; output: 'standalone')
bun run start          # serve the production build
bun run lint           # eslint .
bun run format:check   # prettier --check
bun run format:write   # prettier --write
```

There is no test framework; verify changes with `bun run build` + `bun run lint` and manual checks
in the browser.
