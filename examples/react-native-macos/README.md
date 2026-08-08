# React Native macOS example

A React Native macOS 0.81.9 application using React Native 0.81.6 and React 19.1.4. [`App.tsx`](App.tsx) creates a
shared `count` store, reads it through both `useCount` and `useCountSelect`, changes it by the exported `countStep` of
100 through the hook setter or dispatch, and resets it with `resetCount`. The file also exports a getter for the store.

The native project is [`macos/ReStateMacOS.xcodeproj`](macos/ReStateMacOS.xcodeproj). Its Podfile targets macOS 14.0.

## Requirements

- macOS with Xcode and CocoaPods for native builds.
- Ruby 2.6.10 or newer, matching the `Gemfile` declaration.
- Node.js 22.18.0 or newer and pnpm 11.7.0 for this workspace. The example's own `engines` entry is `>=20.19.4`.

## Install and run

This package consumes `@raulpesilva/re-state` through `workspace:*`, so install the workspace from the repository root.
Build the local library once before starting the app; its `lib/` and related exports are generated build output.

```sh
# from the repository root
pnpm install
pnpm build

# from examples/react-native-macos
cd examples/react-native-macos
bundle install
bundle exec pod install --project-directory=macos
```

Start Metro in one terminal and launch the macOS app in another, from `examples/react-native-macos`:

```sh
pnpm start
pnpm macos
```

Use `pnpm macos:build` when you need the native build command without launching the app. These native scripts require
macOS, Xcode, and CocoaPods; they cannot run on Windows.

## Checks

From the repository root, run:

```sh
pnpm --filter ReStateMacOS check
pnpm --filter ReStateMacOS test
```

`check` runs formatting, linting, TypeScript, the Metro configuration check, and `react-native config`. The test command
uses the template's Jest setup and does not replace the native macOS build.
