<div align="center">
  <img alt="re-state" width="250" src="assets/logo.svg" />
  <br />
  <br />
  <a href="https://github.com/raulpesilva/re-state/blob/master/LICENSE">
    <img alt="License" src="https://badgen.net/npm/license/@raulpesilva/re-state?color=blue" />
  </a>
  <img alt="Types included" src="https://badgen.net/npm/types/@raulpesilva/re-state?color=blue" />
  <a href="https://www.npmjs.com/package/@raulpesilva/re-state">
    <img alt="npm version" src="https://badgen.net/npm/v/@raulpesilva/re-state?color=blue" />
  </a>
  <a href="https://www.npmjs.com/package/@raulpesilva/re-state">
    <img alt="Monthly downloads" src="https://badgen.net/npm/dm/@raulpesilva/re-state?color=blue" />
  </a>
  <p>Provider-free shared state for React and React Native.</p>
</div>

## Why re-state?

re-state keeps shared state close to React's familiar `useState` model. State is identified by a string key, can be
read and updated from any component using that key, and does not require a provider or context wrapper.

- Works with React and React Native through dedicated package exports.
- Includes TypeScript declarations for ESM, CommonJS, and React Native consumers.
- Supports direct hooks, reusable state modules, selectors, subscriptions, and updates outside React.
- Ships JavaScript targeting ES2019.

## Install

```sh
pnpm add @raulpesilva/re-state
```

```sh
npm install @raulpesilva/re-state
```

```sh
yarn add @raulpesilva/re-state
```

React 16.8 or newer is required. `react-dom` 16.8 or newer is an optional peer used by web applications; React Native
consumers use the native entry point instead.

## Quick start

For reusable application state, create a named group of typed methods once and import those methods where needed:

```ts
// states/counter.ts
import { createReStateMethods } from '@raulpesilva/re-state';

export const { useCounter, useCounterSelect, dispatchCounter, getCounter, resetCounter } = createReStateMethods(
  'counter',
  0
);
```

```tsx
import { resetCounter, useCounter } from './states/counter';

export function Counter() {
  const [count, setCount] = useCounter();

  return (
    <div>
      <output>{count}</output>
      <button onClick={() => setCount((previous) => previous + 1)}>Increment</button>
      <button onClick={resetCounter}>Reset</button>
    </div>
  );
}
```

The generated `dispatchCounter` and `getCounter` functions can be used outside React components. `useCounterSelect`
subscribes to the value without returning a setter.

For a small state that does not need a reusable module, use the direct hook:

```tsx
import { useReState } from '@raulpesilva/re-state';

export function CompactCounter() {
  const [count, setCount] = useReState('compact-counter', 0);
  return <button onClick={() => setCount((previous) => previous + 1)}>{count}</button>;
}
```

Components using the same key share the same value. The first initialization of a key establishes its value.

## API

| API | Purpose |
| --- | --- |
| `createReStateMethods` | Create named hook, selector hook, dispatch, getter, and reset methods together |
| `useReState` | Read and update a keyed state directly from a component |
| `useReStateSelector` | Derive and subscribe to a value from the complete store |
| `createReState` | Create a reusable read/write hook for one key |
| `createReStateSelect` | Create a reusable read-only hook for one key |
| `createReStateDispatch` | Create a setter that can be called outside React |
| `createGetReState` | Create a synchronous getter for one key |
| `onReStateChange` | Subscribe a callback to one or more keys and receive an unsubscribe function |
| `resetReState` | Reset every initialized key to its stored initial value |
| `setReStateInitialValue` | Change the value used when the store is reset |

See the [documentation](https://restate.vercel.app/) for signatures, behavior, and complete examples.

## Examples

Six workspace examples exercise the current supported toolchains:

| Example | Stack |
| --- | --- |
| [`vite-js`](examples/vite-js) | React 19 and Vite 8 in JavaScript |
| [`vite-ts`](examples/vite-ts) | React 19, Vite 8, TypeScript, and Vitest |
| [`nextjs`](examples/nextjs) | React 19 and Next.js 16 App Router |
| [`expo`](examples/expo) | Expo SDK 57 and React Native 0.86 |
| [`react-native-windows`](examples/react-native-windows) | React Native 0.84 and React Native Windows 0.84 |
| [`react-native-macos`](examples/react-native-macos) | React Native 0.81 and React Native macOS 0.81 |

The [examples workspace guide](examples/README.md) contains installation, execution, and platform requirements.

## Development

The repository requires Node.js 22.18 or newer and pnpm 11.7.0.

```sh
pnpm install
pnpm check
pnpm examples:check
```

`pnpm check` runs Oxfmt, Oxlint, strict TypeScript checking, the Vitest suite, and the tsdown build. The documentation
site is an independent project; see [`docs/README.md`](docs/README.md) for its commands.

## License

[MIT](LICENSE) © Raul Pereira da Silva
