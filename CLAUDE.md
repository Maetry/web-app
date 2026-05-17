# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend for **Maestri**, a salon/workspace scheduling product. Next.js 16 (App Router) +
React 19 + TypeScript 6 (strict), Redux Toolkit / RTK Query for data, Tailwind CSS v4. All API
data comes from the external **Maestri** REST API; this repo contains no backend.

> **The UI was reset** and is being rebuilt with **shadcn (Base UI)**. The business/data layer
> (`src/services`, `src/store`, `src/features`, `src/hooks`, `src/router`) is preserved as a
> working reference. **Authentication is the first rebuilt+wired feature** (see "Authentication"
> below): routes are `/auth` (login, `src/app/auth/page.tsx`) and `/` (auth gate,
> `src/app/page.tsx`). The preserved `auth.hooks.ts`/`auth.utils.ts` implicit-redirect helpers
> are kept untouched as reference; the live auth uses new hooks.

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
  auto-generate (mkcert) into the gitignored `certificates/` dir on first run. HTTPS is required
  because Google/Apple OAuth need HTTPS. (Turbopack is the default bundler in Next 16; no
  `--turbopack` flag.) **For Google sign-in, open the app at `https://local.maetry.com:3000`**
  (map `127.0.0.1 local.maetry.com` in `/etc/hosts`) — that exact origin must be the Google OAuth
  client's Authorized JavaScript origin; `localhost` is rejected by GIS. To get a cert whose SAN
  covers it: `rm certificates/* && bun run dev -- -H local.maetry.com`.
- **There is no test framework or tests.** No test script. Do not claim to "run the tests"; verify
  via `bun run build` + `bun run lint` and manual checks in the browser.
- **Env (`.env.local`, gitignored, no committed example — ask the user):**
  `NEXT_PUBLIC_API_BASE_URL` = Maestri API **host root WITHOUT `/v1`** (generated URLs already
  include `/v1`; a `/v1`-suffixed base → `/v1/v1/...` 404). `NEXT_PUBLIC_APP_URL` =
  `https://local.maetry.com:3000`. `NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID` (required for Google).
  `NEXT_PUBLIC_APPLE_OAUTH_CLIENT_ID` (commented out — Apple disabled, needs a real Apple
  Services ID). Dev API base: `https://api-dev-601862402938.us-west2.run.app`.

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
bun run codegen   # = (cd src/services/maestri && rtk-query-codegen-openapi codegen-config.cjs)
```

- **Config is `codegen-config.cjs` — plain CommonJS on purpose.** The codegen CLI loads the
  config with a bare Node `require()`; it only needs a TS loader (`esbuild-runner`/`ts-node`) for a
  `.ts` config. Using `.cjs` removes that dependency entirely (both loaders were removed from
  devDependencies) — nothing fragile to break. The file keeps full editor type-safety via
  `// @ts-check` + a JSDoc `@type {import('@rtk-query/codegen-openapi').ConfigFile}` annotation.
- **Use `bun run codegen`, not `bunx @rtk-query/codegen-openapi`.** `bunx` fetches an isolated
  copy with its own dependency tree and won't resolve the project's pinned `ajv` (gotcha below).
  The `codegen` script runs the **local** bin from `node_modules/.bin`, sharing the locked deps.
- **Schema: `src/services/maestri/openapi.yaml`** — OpenAPI **3.1**, from the **private** repo
  `Maetry/shared-kit`, **pinned to a commit SHA** (not `main`) for reproducibility. It is
  **gitignored** (`src/services/**/*.yaml`) and absent on a fresh clone — fetch it before
  regenerating:
  ```bash
  gh api -H "Accept: application/vnd.github.raw" \
    "repos/Maetry/shared-kit/contents/generated/maetry-openapi-docs-3.1.yaml?ref=9a7f9dcb4ceaed8945374ad8de35309232e1f75d" \
    > src/services/maestri/openapi.yaml
  ```
  To intentionally adopt a newer schema: bump the `?ref=` SHA here (and in the PR/commit), re-fetch,
  `bun run codegen`, review the `api-generated.ts` diff.
- **`ajv@8` is a direct devDependency on purpose** (pinned exact `8.20.0`). `@rtk-query/codegen-openapi`
  → `@apidevtools/swagger-parser` → `ajv-draft-04` needs `ajv@^8` (peer dep), but `eslint` pulls
  `ajv@^6` and Bun hoists that to the top level — so without a direct `ajv@8`, codegen crashes
  with `Cannot find module 'ajv/dist/core'`. The direct dep forces `ajv@8` to the top level
  (`eslint` then gets a nested `ajv@6`). Don't remove it.
- `codegen-config.cjs`: `schemaFile: openapi.yaml`, `apiFile: ./reducer.ts`, `exportName: _api`,
  `hooks: true`, `tag: true` (generates `providesTags`/`invalidatesTags` from OpenAPI tags so
  mutations auto-invalidate related queries — coarse by tag; hand-tune per endpoint in
  `enhanced-api.ts` when needed), and an `endpointOverrides` that strips the `Device-ID` header
  param from every generated signature (it's injected centrally by the base query instead).
- `api-generated.ts` (~4k lines, **committed**) is the generated output — do not hand-edit it.
  Regeneration is deterministic (byte-identical given the same schema).
- Add custom per-endpoint logic in `enhanced-api.ts` via `_api.enhanceEndpoints(...)`, not in the
  generated file.

## Architecture: data flow (preserved reference)

`reducer.ts` (base query) → `api-generated.ts` (codegen'd endpoints) → `enhanced-api.ts` (custom
logic) → consumed via RTK Query hooks; store wired in `src/store/index.ts`.

- **Store** (`src/store/index.ts`): `makeStore()` combines the RTK Query api reducer +
  `workspace` + `schedules` slices, and prepends `listenerMiddleware` then `api.middleware`.
  Provided to React in `src/app/store-provider.tsx`. **The `initializeApp` dispatch there is
  commented out** (it eagerly fetched `getWorkspace` with no auth → noisy 401 on `/auth`); the
  import and the `listenerMiddleware` listener are preserved for re-enablement by a future
  post-login shell.
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
- **Auth is rebuilt and wired** — see the "Authentication" section below. The preserved
  `auth.hooks.ts` (`useAuthGate`/`useOAuthCallback`/`useOAuthUrls`, old implicit-redirect flow)
  is **reference only**, not used by the live UI. Route constants: `src/router/paths.ts`
  (`Path` enum).

## Authentication

The Maestri API exposes **only OAuth** — `POST /v1/auth/google`, `/v1/auth/apple` (+ `refresh`,
`logout`). No password/OTP, no separate registration: both endpoints provision the account on
first login, so **sign-in == sign-up, one page**.

- **Routes**: `/auth` (single login page, `src/app/auth/page.tsx`) and `/` (auth gate,
  `src/app/page.tsx` — redirects to `/auth` if no token, else validates via `GET /v1/users` and
  shows a logout placeholder; no dashboard exists yet).
- **Integration = Google Identity Services + Sign in with Apple JS** (ID token via JS callback,
  no full-page redirect). New code, **layered over the preserved data layer** (generated
  mutations, `authStorage`, `auth.types`); preserved implicit-redirect helpers untouched:
  - `oauth.ts` — SDK loader, JWT decode, `Token{expiration}`→`TokenResponse{expiresIn}` map,
    env getters. `use-oauth-providers.ts` — `useGoogleSignIn` (renders the GIS button),
    `useAppleSignIn` (popup). `use-auth-session.ts` — `useAuthSession` (calls mutations, stores
    tokens, redirects) + `useLogout` (dedicated `fetch` with the **refresh** token, since the
    base query authorizes with the access token but `/v1/auth/logout` needs the refresh).
    `oauth.globals.d.ts` — ambient `window.google`/`window.AppleID` types.
- **Device-ID**: every request needs a `Device-ID` header that is a **valid UUID**
  (`authStorage.initializeDeviceId()` generates it); a non-UUID is rejected as 401.
- **Google needs console config**: `https://local.maetry.com:3000` must be an **Authorized
  JavaScript origin** on the OAuth client — a *different field* from the redirect URI the old
  web-next implicit flow used. Until added, GIS logs "The given origin is not allowed for the
  given client ID" (proven for both `localhost:3000` and `local.maetry.com:3000`). Dev Google
  client ID is reused from the old `web-next` project (same backend).
- **Apple is disabled**: the button renders **disabled** with a caption. Needs a real Apple
  **Services ID** (reverse-DNS, e.g. `com.maetry.web`) in `.env.local`
  (`NEXT_PUBLIC_APPLE_OAUTH_CLIENT_ID`, commented out) + a Return URL registered in Apple
  Developer. The web-next value was a Google-format ID and never worked for Apple JS.

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

## AI agent tooling (skills & MCP)

Committed so the whole team's Claude Code gets them — **not** app code.

- **Agent Skills** live in `.claude/skills/<name>/` (auto-discovered by Claude Code; descriptions
  always in context, full body loaded on demand). Vendored from upstream — treat as generated:
  refresh by re-copying from source, don't hand-edit.
  - **Official (Vercel — `vercel-labs/agent-skills`):** `vercel-react-best-practices`,
    `vercel-composition-patterns`, `vercel-react-view-transitions`, `web-design-guidelines`
    (the last one is thin by design — it `WebFetch`es live rules from
    `vercel-labs/web-interface-guidelines`, so it needs network at review time).
    `react-native-skills`, `deploy-to-vercel`, `vercel-cli-with-tokens` were intentionally
    **excluded** (RN / deploy — irrelevant to this web app).
  - **Community (`secondsky/claude-skills`, MIT, not Vercel-official):** `nextjs` (Next 16 / RC /
    Server Actions / async params), `tailwind-v4-shadcn` (CSS-first v4 + `@theme inline` + dark
    mode — matches `globals.css`; its setup bits assume Vite, our bundler is Next — apply the
    theming guidance, ignore the Vite specifics), `base-ui-react` (Radix→Base UI migration +
    component templates — note it references the `@base-ui-components/react` package name; this
    project uses `@base-ui/react`, so adapt imports).
- **MCP: Chrome DevTools** — project-scoped `.mcp.json` at repo root, server `chrome-devtools`
  (`npx -y chrome-devtools-mcp@latest`, official `ChromeDevTools/chrome-devtools-mcp`). `npx` (not
  bun) is the maintainer-documented invocation. Prereqs: Node ≥20.19 + Chrome installed. Project
  `.mcp.json` servers prompt for approval on first use in Claude Code. Drive/inspect the app at
  **`https://local.maetry.com:3000`** (Google needs that origin). The MCP's Chrome ignores
  self-signed-CA errors but **not** `ERR_CERT_COMMON_NAME_INVALID` — the cert SAN must include the
  hostname, so run `rm certificates/* && bun run dev -- -H local.maetry.com` before driving it.
  Optional flags: `--headless`, `--isolated`, `--slim`.

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
- Google sign-in only works from `https://local.maetry.com:3000` (needs `127.0.0.1
  local.maetry.com` in `/etc/hosts` + that exact origin on the Google client). Apple sign-in is
  disabled until a real Apple Services ID exists. `initializeApp` is commented out in
  `store-provider.tsx` (re-enable for the post-login shell).
