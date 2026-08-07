# React Native Windows example

This small example demonstrates a shared counter powered by
[`@raulpesilva/re-state`](https://github.com/raulpesilva/re-state) on
[React Native Windows](https://microsoft.github.io/react-native-windows/).

The native project was generated with React Native Windows 0.84's `cpp-app`
template, which uses the New Architecture and Windows App SDK.

## Requirements

- Windows 10 May 2019 Update (1903/build 18362) or newer.
- Node.js 22.11 or newer.
- The [React Native Windows development dependencies](https://microsoft.github.io/react-native-windows/docs/rnw-dependencies).

## Install

Install dependencies from this directory so the example remains independent of
the repository workspace:

```powershell
pnpm install --ignore-workspace --lockfile=false
```

## Run on Windows

Start Metro in one terminal:

```powershell
pnpm start
```

Build and launch the Windows app from another terminal:

```powershell
pnpm windows
```

## Checks

```powershell
pnpm format:check
pnpm lint
pnpm typecheck
```
