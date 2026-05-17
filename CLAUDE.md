# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend for **Maestri**, a salon/workspace scheduling product. Next.js 16 (App Router) +
React 19 + TypeScript 6 (strict), Redux Toolkit / RTK Query for data, Tailwind CSS v4. All API
data comes from the external **Maestri** REST API; this repo contains no backend.

> **The UI was reset.** All pages and UI components were deleted; the app is being rebuilt with
> **shadcn (Base UI)**. The business/data layer (`src/services`, `src/store`, `src/features`,
> `src/hooks`, `src/router`) is preserved untouched **as a working reference** — it is no longer
> wired to any page yet. The only route is `/` (`src/app/page.tsx`), a placeholder.

## Toolchain (Bun)

Package manager is **Bun 1.2.15** (migrated off pnpm). Node **>=22** (`engines`). `bunfig.toml`
sets `[install] exact = true` so `bun add`/`bun update` write pinned versions (the project keeps a
strictly-pinned dependency tree — no `^`/`~`). `.npmrc` only carries the registry. `bun.lock` is
the lockfile (`pnpm-lock.yaml` is gone).

`package.json` `trustedDependencies` allowlists native postinstalls (`@parcel/watcher`,
`@swc/core`, `@tailwindcss/oxide`, `esbuild`, `sharp`, `unrs-resolver`) — Bun blocks postinstalls
by default, so a fresh `bun install` needs this or native deps won't build. (`msw`'s postinstall
stays blocked on purpose — optional transitive tooling.)

## Commands

```bash
bun install            # install deps (generates/uses bun.lock)
bun run dev            # next dev --experimental-https        (HTTPS note below)
bun run build          # next build  (Turbopack; output: 'standalone')
bun run start          # serve production build
bun run lint           # eslint .    (see ESLint note below)
bun run format:check   # prettier --check  (run before committing)
bun run format:write   # prettier --write
```

- **`bun run dev` serves over HTTPS** (`https://localhost:3000`) via `--experimental-https`. Certs
  auto-generate into a gitignored dir on first run. HTTPS is required because Google/Apple OAuth
  redirect URIs must be HTTPS. (Turbopack is the default bundler in Next 16; no `--turbopack` flag.)
- **There is no test framework or tests.** No test script. Do not claim to "run the tests"; verify
  via `bun run build` + `bun run lint` and manual checks in the browser.
- **Required env var: `NEXT_PUBLIC_API_BASE_URL`** — base URL of the Maestri API
  (`src/services/maestri/reducer.ts`). `.env*` is gitignored and no example is committed; ask the
  user for the value if API calls 404/fail.

## ESLint note (pinned to v9 on purpose)

`eslint` is intentionally pinned to **9.x**, not 10, even though everything else is on latest
majors. `eslint-config-next` 16 pulls `eslint-plugin-react` transitively, and **no released
`eslint-plugin-react` supports ESLint 10** (it calls the removed `context.getFilename()`), so
ESLint 10 crashes the lint run. ESLint 9 is the maintained line for the Next 16 lint stack. Revisit
when the plugin ecosystem catches up.

`eslint.config.mjs` is flat config: it imports `eslint-config-next/core-web-vitals` and
`eslint-config-next/typescript` **directly** (no `FlatCompat` — that path also breaks on the new
plugin graph). It must list `ignores` for `.next/**` etc. because `eslint .` (Next 16 removed
`next lint`) does not auto-ignore build output. A scoped override downgrades the stricter
`eslint-plugin-react-hooks` v7 rules (`set-state-in-effect`, `refs`) to **warnings** for the
preserved legacy layer (`src/features|services|store|hooks/**`, plus the retained
`store-provider.tsx`/`layout.tsx`) — that code is out of scope for the refactor and kept as-is, so
lint stays green (warnings only) while the issues stay visible for future reimplementation.

## API Code Generation (RTK Query + OpenAPI)

```bash
bun run codegen   # = (cd src/services/maestri && rtk-query-codegen-openapi codegen-config.ts)
```

- **Use `bun run codegen`, not `bunx @rtk-query/codegen-openapi`.** `bunx` fetches an isolated
  copy of the package that can't see the project's `esbuild-runner`/`ts-node` (needed to load the
  `.ts` config) or the correct `ajv` (see gotcha below). The `codegen` script runs the **local**
  bin from `node_modules/.bin`, sharing the project's deps.
- **Schema: `src/services/maestri/openapi.yaml`** — OpenAPI **3.1**, sourced from the **private**
  repo `Maetry/shared-kit` at `generated/maetry-openapi-docs-3.1.yaml`. It is **gitignored**
  (`src/services/**/*.yaml`) and absent on a fresh clone — fetch it before regenerating:
  ```bash
  gh api -H "Accept: application/vnd.github.raw" \
    "repos/Maetry/shared-kit/contents/generated/maetry-openapi-docs-3.1.yaml?ref=main" \
    > src/services/maestri/openapi.yaml
  ```
- **`ajv@8` is a direct devDependency on purpose.** `@rtk-query/codegen-openapi` →
  `@apidevtools/swagger-parser` → `ajv-draft-04` needs `ajv@^8` (peer dep), but `eslint` pulls
  `ajv@^6` and Bun hoists that to the top level — so without a direct `ajv@8`, codegen crashes
  with `Cannot find module 'ajv/dist/core'`. The direct dep forces `ajv@8` to the top level
  (`eslint` then gets a nested `ajv@6`). Don't remove it.
- `codegen-config.ts`: `schemaFile: openapi.yaml`, `apiFile: ./reducer.ts`, `exportName: _api`,
  `hooks: true`, and an `endpointOverrides` that strips the `Device-ID` header param from every
  generated signature (it's injected centrally by the base query instead).
- `api-generated.ts` (~4k lines, **committed**) is the generated output — do not hand-edit it.
  Regeneration is deterministic (byte-identical given the same schema).
- Add custom per-endpoint logic in `enhanced-api.ts` via `_api.enhanceEndpoints(...)`, not in the
  generated file.

## Architecture: data flow (preserved reference)

`reducer.ts` (base query) → `api-generated.ts` (codegen'd endpoints) → `enhanced-api.ts` (custom
logic) → consumed via RTK Query hooks; store wired in `src/store/index.ts`.

- **Store** (`src/store/index.ts`): `makeStore()` combines the RTK Query api reducer +
  `workspace` + `schedules` slices, and prepends `listenerMiddleware` then `api.middleware`.
  Provided to React in `src/app/store-provider.tsx` (still mounted in the root layout, so
  `initializeApp` still runs even though no page consumes the data yet).
- **App init** (`src/store/listenerMiddleware.ts`): on `initializeApp` it fetches `getWorkspace`,
  sets the first workspace as current if none selected, then fires `getUsers` and
  `getWorkspaceById`.
- **Auth/workspace token model** — the non-obvious core:
  - Tokens live in `localStorage`, managed by `authStorage` (`src/features/auth/auth.storage.ts`):
    `accessToken`, `refreshToken`, `employeeToken`, plus a generated `deviceId`.
  - Base query (`reducer.ts`) sends `Device-ID` on every request and `Authorization: Bearer`
    using **`employeeToken` if present, else `accessToken`**. It explicitly **deletes the
    `Authorization` header for the `getTimetablesSchedules` endpoint**.
  - `enhanced-api.ts` hooks `getWorkspaceById.onQueryStarted` and writes the returned
    `employeeToken` into `authStorage`. So **switching workspace re-scopes auth as a side effect of
    calling `useGetWorkspaceByIdQuery`** — if nothing calls that hook, the employee token never
    updates. (The old `(dashboard)/layout.tsx` called it eagerly; that layout was deleted, so any
    new shell must call it again for the employee token to refresh.)
  - Workspace selection: `src/features/workspace/` slice + hooks (`useCurrentWorkspace`,
    `useWorkspaceById`, `useWorkspaceSettings`).
- **Auth flow (hooks only, not wired)**: `useAuthGate()` / `useOAuthCallback()` /
  `useOAuthUrls()` in `src/features/auth/auth.hooks.ts` still implement the OAuth (Google + Apple)
  gate and callback, but the pages that used them (`/`, `/auth`) were deleted. Reuse these hooks
  when rebuilding auth. Route constants: `src/router/paths.ts` (`Path` enum) — note most `Path`
  targets no longer have pages.

## UI conventions (shadcn + Base UI)

- **shadcn is configured** (`components.json`, style `base-luma` → **Base UI**, not Radix; Radix is
  fully removed). Add primitives on demand with the shadcn CLI; don't hand-roll Radix wrappers.
- `src/components/ui/button.tsx` is the reference component: `cva` + `VariantProps` +
  `@base-ui/react` primitive + `cn`. Follow this shape for new `ui/` components.
- **`cn()` lives at `src/lib/utils.ts`** (`clsx` + `tailwind-merge`). The old `src/utils/cn.ts` was
  deleted — import from `@/lib/utils`.
- **Tailwind v4 + theme tokens now work.** `src/app/globals.css` has a real `@theme inline` block
  plus `:root`/`.dark` CSS variables (shadcn token set + `tw-animate-css`). Semantic tokens
  (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`,
  `ring-ring`, …) **resolve correctly** — prefer them for new UI over arbitrary hex. No
  `tailwind.config.js` (CSS-first).
- **Path aliases**: `@/*` → `src/*`; `~/*` → repo root (e.g. `import Icon from '~/public/icons/x.svg'`).
- **SVGs as components** via `@svgr/webpack`: `next.config.ts` configures it twice — a
  `turbopack.rules` entry (used by dev/build, Turbopack is default in Next 16) and a legacy
  `webpack()` hook (fallback for `next build --webpack`). Keep both in sync if you change it.
- **Prettier**: `printWidth: 100`, `singleQuote: true` (`prettier.config.mjs`). shadcn CLI emits
  double-quoted code — run `bun run format:write` after adding components.

## Known gotchas

- **`next-intl` is an unused dependency** — no i18n config/middleware/messages. **All UI text is
  hardcoded in Russian** while the root layout sets `<html lang="en">`. Don't introduce
  `useTranslations` expecting infra; there is none. (Several deps — `next-intl`, `vaul`,
  `react-day-picker`, `react-hook-form`, `react-icons` — are currently unused but were
  intentionally **kept** for the upcoming reimplementation.)
- Next 16 manages `tsconfig.json` (e.g. it forces `jsx: react-jsx` and adds
  `.next/**/types`) — expect it to rewrite the file on build; don't fight it.
- Git history is mostly `wip` commits; don't infer intent from messages.
- `openapi.json`, `.env*`, and dev HTTPS certs are gitignored — absent on a fresh clone.
