# Expo TypeScript example

An Expo SDK 57 application using React Native 0.86.2, React 19.2.3, and TypeScript. [`App.tsx`](App.tsx) creates a typed
`count` store with `createReState`, updates it through both the hook setter and `createReStateDispatch`, changes the value
by 100, and exposes a reset action. The file also exports selector and getter helpers for the same store.

[`index.ts`](index.ts) registers the app with Expo's `registerRootComponent`. The package scripts expose Expo's start,
Android, iOS, and web commands; [`app.json`](app.json) configures the web bundler as Metro.

## Prerequisites

Use Node.js 22.18.0 or newer and pnpm 11.7.0, matching the repository root configuration.

## Run

This package consumes `@raulpesilva/re-state` through `workspace:*`, so install the workspace from the repository root.
Build the local library once before starting an example; its `es/`, `lib/`, and `types/` exports are generated build output.

```sh
# from the repository root
pnpm install
pnpm build
pnpm --filter expo-example start
```

Use an explicit platform script when needed:

```sh
pnpm --filter expo-example android
pnpm --filter expo-example ios
pnpm --filter expo-example web
```

The native commands require the corresponding Expo/React Native platform tooling. The `web` command uses the Metro web
configuration declared in `app.json`.

## Checks

```sh
pnpm --filter expo-example check
```

The `check` script runs formatting, linting, and TypeScript. This package does not define a test script.
