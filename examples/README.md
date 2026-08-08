# Examples

The six private workspace packages demonstrate `@raulpesilva/re-state` across the currently maintained React web and
native toolchains. Each package consumes the library from this repository through `workspace:*`; dependencies are
installed once from the repository root and recorded in the shared root lockfile.

| Example | Stack | Demonstrates |
| --- | --- | --- |
| [`vite-js`](./vite-js) | React 19 + Vite 8 | Direct keyed state, reusable actions, and selectors in JavaScript |
| [`vite-ts`](./vite-ts) | React 19 + Vite 8 + TypeScript | Typed state modules, selectors, and Vitest coverage |
| [`nextjs`](./nextjs) | Next.js 16 App Router | Shared client state in a modern Next.js application |
| [`expo`](./expo) | Expo SDK 57 + React Native 0.86 | One shared counter on Android, iOS, and web |
| [`react-native-windows`](./react-native-windows) | React Native Windows 0.84 | Native Windows shared state with the New Architecture scaffold |
| [`react-native-macos`](./react-native-macos) | React Native macOS 0.81 | Native macOS shared state with the matching React Native toolchain |

## Install

From the repository root:

```sh
pnpm install
pnpm build
```

Do not run an independent install inside an example when working in this repository: the examples rely on the root
workspace link to the local library. The build creates the local `es/`, `lib/`, and `types/` package outputs consumed by
the examples.

## Run web examples

```sh
pnpm --filter vite-js dev
pnpm --filter vite-ts dev
pnpm --filter nextjs dev
```

## Run Expo

```sh
pnpm --filter expo-example start
pnpm --filter expo-example android
pnpm --filter expo-example ios
pnpm --filter expo-example web
```

Android and iOS commands require their normal Expo native development environments. The iOS command requires macOS.

## Run native desktop examples

```sh
pnpm --filter ReStateWindows start
pnpm --filter ReStateWindows windows
```

The Windows build requires Windows, Visual Studio, and the React Native Windows prerequisites.

```sh
pnpm --filter ReStateMacOS start
pnpm --filter ReStateMacOS macos
```

The macOS build requires macOS, Xcode, CocoaPods, and the React Native macOS prerequisites.

## Validate

Run all portable example checks from the repository root:

```sh
pnpm examples:check
```

Or target one package:

```sh
pnpm --filter vite-ts check
pnpm --filter nextjs check
pnpm --filter expo-example check
```

The aggregate check covers formatting, linting, TypeScript, tests, builds, or configuration validation when each
example exposes those scripts. It intentionally does not launch device emulators or build Windows/macOS binaries.
