# React Native Windows example

A React Native Windows 0.84.0 application using React Native 0.84.1 and React 19.2.3. [`App.tsx`](App.tsx) demonstrates
one shared `count` store: the hook setter decrements it by 100 and `createReStateDispatch` increments it by 100.

The Windows native solution is [`windows/ReStateWindows.sln`](windows/ReStateWindows.sln). The package metadata selects
the React Native Windows `cpp-app` template, and [`windows/ExperimentalFeatures.props`](windows/ExperimentalFeatures.props)
enables the New Architecture. The packaged Windows desktop manifest declares a minimum version of `10.0.17763.0`.

## Requirements

- Windows with the [React Native Windows development dependencies](https://microsoft.github.io/react-native-windows/docs/rnw-dependencies).
- Visual Studio 17.0 or newer, matching the native project minimum.
- Node.js 22.18.0 or newer and pnpm 11.7.0 for this workspace. The example's own `engines` entry is `>=22.11.0`.

## Install

This package consumes `@raulpesilva/re-state` through `workspace:*`, so install the workspace from the repository root.
Build the local library once before starting the app; its `lib/` and related exports are generated build output.

```powershell
# from the repository root
pnpm install
pnpm build
```

## Run on Windows

Start Metro in one terminal:

```powershell
pnpm --filter ReStateWindows start
```

Build and launch the Windows app from another terminal:

```powershell
pnpm --filter ReStateWindows windows
```

The `windows` script runs `react-native run-windows`; it is the native run command exposed by this example.

## Checks

```powershell
pnpm --filter ReStateWindows check
pnpm --filter ReStateWindows test
pnpm --filter ReStateWindows test:windows
```

`check` runs formatting, linting, and TypeScript. The two test commands use the Jest scripts supplied by this native
template; `test:windows` selects `jest.config.windows.js`.
