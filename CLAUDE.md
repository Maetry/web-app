# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.6 application with TypeScript, using Turbopack for development and managing dependencies with pnpm (10.7.1). The project requires Node.js 22.14.0.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server with Turbopack
pnpm dev

# Build production
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint

# Format checking
pnpm format:check

# Format auto-fix
pnpm format:write
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: Radix UI primitives with Tailwind CSS v4
- **Forms**: React Hook Form
- **Icons**: Lucide React and custom SVGs via @svgr/webpack

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (auth)/         # Auth group routes
│   ├── (dashboard)/    # Dashboard layout group
│   └── store-provider.tsx # Redux provider wrapper
├── components/         # Reusable UI components
├── features/          # Feature-based modules
│   └── workspace/     # Workspace management feature
├── services/          # API service layer
│   └── maestri/       # Generated API client from OpenAPI (Maetry backend)
├── store/             # Redux store configuration
└── utils/             # Utility functions
```

### API Code Generation

The project uses RTK Query with OpenAPI code generation for the Maetry API:

```bash
# Regenerate API types from OpenAPI spec
cd src/services/maestri
npx @rtk-query/codegen-openapi codegen-config.ts
```

The generated code (`api-generated.ts`) is enhanced in `enhanced-api.ts` with additional logic like workspace state synchronization.

### Key Patterns

1. **Path Aliases**: Use `@/*` for src/ imports and `~/*` for root imports
2. **SVG Components**: SVGs are imported as React components via @svgr/webpack
3. **Redux Store**: Configured with listener middleware and API middleware
4. **Enhanced API**: Base generated API is wrapped with custom logic in enhanced-api.ts

### Styling

- Uses Tailwind CSS v4 with PostCSS
- Radix UI components for accessible primitives
- Custom Button component with CVA for variants
- Utility function `cn()` for className merging

### Image Handling

Next.js Image component configured for remote images from `storage.googleapis.com`.

## Testing and Quality

The project uses:
- ESLint with Next.js and Prettier configurations
- TypeScript strict mode
- Prettier for code formatting

Always run `pnpm lint` and `pnpm format:check` before committing changes.