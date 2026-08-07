# Vite JavaScript example

This example shows two small React applications using `@raulpesilva/re-state`:

- `SimpleUsage` shares one counter between two components.
- `ToDo` stores a list, updates it through actions, and derives counts with selectors.

To run it in isolation:

```sh
pnpm install --ignore-workspace --lockfile=false
pnpm dev
```

Useful checks:

```sh
pnpm format:check
pnpm lint
pnpm build
```
