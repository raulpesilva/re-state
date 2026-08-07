# Examples

The examples are private workspace packages that demonstrate `@raulpesilva/re-state` across the currently supported
React toolchains. They consume the library from this repository through `workspace:*`; the shared lockfile is managed
at the repository root.

| Example | Stack | Purpose |
| --- | --- | --- |
| [`vite-js`](./vite-js) | React 19 + Vite 8 | JavaScript examples for shared state, actions, and selectors |
| [`vite-ts`](./vite-ts) | React 19 + Vite 8 + TypeScript | Typed examples plus the retained Vitest coverage |
| [`nextjs`](./nextjs) | Next.js 16 App Router | Client-side state usage inside a modern Next.js application |
| [`expo`](./expo) | Expo SDK 57 | Cross-platform React Native example with web export support |
| [`react-native-windows`](./react-native-windows) | React Native Windows 0.84 | Windows example using the current New Architecture scaffold |
| [`react-native-macos`](./react-native-macos) | React Native macOS 0.81 | macOS example using the matching React Native toolchain |

## Install

From the repository root:

```sh
pnpm install
```

Run an example command with a workspace filter, for example:

```sh
pnpm --filter vite-js dev
pnpm --filter vite-ts check
pnpm --filter nextjs build
pnpm --filter expo-example start
```

The Windows example requires the React Native Windows native toolchain. The macOS example requires macOS and Xcode
for native builds; its portable lint, formatting, TypeScript, and React Native configuration checks can still run on
other hosts.
