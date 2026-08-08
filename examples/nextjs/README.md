# Next.js TypeScript example

A Next.js 16.3.0 App Router application using React 19.2.8 and TypeScript 6.0.3. [`app/page.tsx`](app/page.tsx) renders
the typed ToDo example from [`components/ToDo/index.tsx`](components/ToDo/index.tsx). That component is the client boundary
(`'use client'`) and uses re-state hooks, dispatch actions, and selectors from [`states/todos/index.ts`](states/todos/index.ts).

## Prerequisites

Use Node.js 22.18.0 or newer and pnpm 11.7.0, matching the repository root configuration.

## Run

This package consumes `@raulpesilva/re-state` through `workspace:*`, so install the workspace from the repository root.
Build the local library once before starting an example; its `es/`, `lib/`, and `types/` exports are generated build output.

```sh
# from the repository root
pnpm install
pnpm build
pnpm --filter nextjs dev
```

For a production run, build first and then start the Next.js server:

```sh
pnpm --filter nextjs build
pnpm --filter nextjs start
```

## Checks

```sh
pnpm --filter nextjs check
```

The `check` script runs formatting, linting, typechecking, and `next build`. This package does not define a test script.
