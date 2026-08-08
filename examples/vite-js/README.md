# Vite JavaScript example

A small React 19 + Vite 8 application written in JavaScript. [`src/App.jsx`](src/App.jsx) renders two examples:

- `SimpleUsage` uses `useReState('value', 0)` so `Foo` can update a value that `Bar` reads from the same store.
- `ToDo` keeps a list in [`src/states/todos/index.js`](src/states/todos/index.js), exposes actions for adding, removing,
  toggling, and resetting items, and derives total and finished counts with selectors.

## Prerequisites

Use Node.js 22.18.0 or newer and pnpm 11.7.0, matching the repository root configuration.

## Run

This package consumes `@raulpesilva/re-state` through `workspace:*`, so install the workspace from the repository root.
Build the local library once before starting an example; its `es/`, `lib/`, and `types/` exports are generated build output.

```sh
# from the repository root
pnpm install
pnpm build
pnpm --filter vite-js dev
```

To preview a production build:

```sh
pnpm --filter vite-js build
pnpm --filter vite-js preview
```

## Checks

```sh
pnpm --filter vite-js check
```

The `check` script runs formatting, linting, and the Vite build. This package does not define test or typecheck scripts.
