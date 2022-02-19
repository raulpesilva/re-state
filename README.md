<div align="center">
  <img alt="re-state" width="250" src="assets/logo.svg" />
  <br/>
  <br/>
  <a href="https://github.com/raulpesilva/re-state/blob/master/LICENSE">
    <img alt="License" src="https://badgen.net/npm/license/@raulpesilva/re-state?color=blue" />
  </a>
    <img alt="type included" src="https://badgen.net/npm/types/@raulpesilva/re-state?color=blue" />
  <a href="https://www.npmjs.com/package/@raulpesilva/re-state">
    <img alt="Npm version" src="https://badgen.net/npm/v/@raulpesilva/re-state?color=blue" />
  </a>
  <a href="https://www.npmjs.com/package/@raulpesilva/re-state">
    <img alt="Total downloads" src="https://badgen.net/npm/dt/@raulpesilva/re-state?color=blue" />
  </a>
  <a href="https://www.npmjs.com/package/@raulpesilva/re-state">
    <img alt="Monthly downloads" src="https://badgen.net/npm/dm/@raulpesilva/re-state?color=blue" />
  </a>
  <a href="https://bundlephobia.com/result?p=@raulpesilva/re-state@latest" target="\_parent">
    <img alt="Bundle size" src="https://img.shields.io/bundlephobia/min/@raulpesilva/re-state@latest" />
  </a>
  <a href="https://bundlephobia.com/result?p=@raulpesilva/re-state@latest" target="\_parent">
    <img alt="Bundle size gzip" src="https://img.shields.io/bundlephobia/minzip/@raulpesilva/re-state@latest" />
  </a>
  <br/>
  <br/>
  <p>Easy way to provide global state to ReactJS and React Native applications</p>
  <br/>
  <br/>

</div>

## Installation

```sh
npm install @raulpesilva/re-state
```

or

```sh
yarn add @raulpesilva/re-state
```

## See documentation - [![Docs](https://badgen.net/badge/Docs/latest/black)](https://restate.vercel.app/)

## Simple Usage - [![Demo](https://badgen.net/badge/Demo/CodeSandbox/black)](https://codesandbox.io/s/basic-usage-re-state-86l06?file=/src/App.js)

```tsx
import * as React from 'react';
import { useReState } from '@raulpesilva/re-state';

import { StyleSheet, View, Text, Button } from 'react-native';

const Foo: React.FC = () => {
  const [value, setValue] = useReState<number>('value', 0);

  return (
    <View style={styles.container}>
      <Button onPress={() => setValue(value + 1)} title=" + " />
      <Text>State value: {value}</Text>
      <Button onPress={() => setValue(value > 0 ? value - 1 : 0)} title=" - " />
    </View>
  );
};

const Bar: React.FC = () => {
  const [value] = useReState<number>('value', 0);

  return (
    <View style={styles.container}>
      <Text>State value: {value}</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Foo />
      <Bar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

# Advanced Usage

## Creating new global state

```ts
// state/user/index.ts

import { createReState, createReStateSelect, createReStateDispatch, createGetReState } from '@raulpesilva/re-state';

type User = {
  _id: string;
  name: string;
  email: string;
  iat: number;
  avatar: string;
};

export const USER = 'user';
export const userInitialValue = {};

export const useUser = createReState<User>(USER, userInitialValue);
export const useUserSelect = createReStateSelect<User>(USER);
export const dispatchUser = createReStateDispatch<User>(USER);
export const getUser = createGetReState<User>(USER);
export const resetUser = () => dispatchUser(userInitialValue);
```

```tsx
// components/User.tsx

import { useUser } from 'state/user';

const User = () => {
  const [user, setUser] = useUser();

  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatar} />
      <p>{user.email}</p>
      <button
        onClick={() =>
          setUser({
            _id: '123',
            name: 'Raul',
            email: 'raul@email.com',
            iat: 123,
            avatar: 'https://github.com/raulpesilva.png',
          })
        }
      >
        Set User
      </button>
    </div>
  );
};
```

## Using previous state

```tsx
// components/User.tsx

  import { useUser } from 'state/user'

  const User = () => {
    const [user, setUser] = useUser()

    return (
      <div>
        <h1>{user.name}</h1>
        <img src={user.avatar} />
        <p>{user.email}</p>
        <button onClick={() => setUser((prev) => {...prev, name: 'Raul P' })}>
          Change name
        </button>
      </div>
    )
  }

```

or

```tsx
// components/User.tsx

  import { useUserSelect, useUserDispatch } from 'state/user/index'

  const User = () => {
    const user = useUserSelect()

    return (
      <div>
        <h1>{user.name}</h1>
        <img src={user.avatar} />
        <p>{user.email}</p>
        <button onClick={() => useUserDispatch((prev) => {...prev, name: 'Raul P' })}>
          Change name
        </button>
      </div>
    )
  }

```

## Adding changeName action

```ts
// state/user/index.ts
...
export const dispatchUser = createReStateDispatch<User>(USER)
export const getUser = createGetReState<User>(USER)
export const resetUser = () => dispatchUser(userInitialValue)
// + adding changeName action
export const changeName = (name: string) => dispatchUser((prev) => ({...prev, name}))

```

```tsx
// components/User.tsx

import { useUserSelect, changeName } from 'state/user/index';

const User = () => {
  const user = useUserSelect();

  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatar} />
      <p>{user.email}</p>
      <button onClick={() => changeName('Raul P')}>Change name</button>
    </div>
  );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT © [raulpesilva](https://github.com/raulpesilva)
