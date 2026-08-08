# Vite TypeScript example

A React 19 + Vite 8 application written in TypeScript. [`src/App.tsx`](src/App.tsx) renders:

- `SimpleUsage`, where typed `useReState<number>` calls in `Foo` and `Bar` share the `value` state.
- `ToDo`, whose typed store in [`src/states/todos/index.ts`](src/states/todos/index.ts) demonstrates hooks, dispatch,
  selectors, actions, and reading the current value with `createGetReState`.

The state API is covered by the Vitest suite in [`src/states/todos/index.test.ts`](src/states/todos/index.test.ts).

## Prerequisites

Use Node.js 22.18.0 or newer and pnpm 11.7.0, matching the repository root configuration.

## Run

This package consumes `@raulpesilva/re-state` through `workspace:*`, so install the workspace from the repository root.
Build the local library once before starting an example; its `es/`, `lib/`, and `types/` exports are generated build output.

```sh
# from the repository root
pnpm install
pnpm build
pnpm --filter vite-ts dev
```

`pnpm build` in this package runs TypeScript before `vite build`. To run the tests directly:

```sh
pnpm --filter vite-ts test
```

Use `pnpm --filter vite-ts test:dev` for Vitest watch mode.

## Checks

```sh
pnpm --filter vite-ts check
```

The `check` script runs formatting, linting, typechecking, the Vitest suite, and the production build.
