# React Native macOS example

This example demonstrates `@raulpesilva/re-state` with a small shared counter built for React Native macOS.

The native project was generated with the official React Native CLI and `react-native-macos-init` using compatible
0.81 releases:

- React Native: `0.81.6`
- React Native macOS: `0.81.9`
- React: `19.1.4`

## Install and run

Install from this directory so the repository workspace and root lockfile stay untouched:

```sh
pnpm install --ignore-workspace --lockfile=false
```

Start Metro in one terminal:

```sh
pnpm start
```

On macOS, install CocoaPods dependencies and launch the app in another terminal:

```sh
bundle install
bundle exec pod install --project-directory=macos
pnpm macos
```

The `macos` and `macos:build` scripts require macOS, Xcode, and CocoaPods. On Windows, use the portable checks below;
the native Xcode build cannot be executed there.

## Checks

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm config:check
```
