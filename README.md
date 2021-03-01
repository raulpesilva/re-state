# re-state

[![NPM](https://img.shields.io/npm/v/@raulpesilva/re-state.svg)](https://www.npmjs.com/package/@raulpesilva/re-state)
![NPM](https://img.shields.io/npm/l/@raulpesilva/re-state)
![node-current](https://img.shields.io/node/v/@raulpesilva/re-state)

Easy way to provide global state to reactJS and React Native applications

## Installation

```sh
npm install @raulpesilva/re-state
```

or

```sh
yarn add @raulpesilva/re-state
```

## Usage

```tsx
import * as React from 'react';
import useReState from '@raulpesilva/re-state';

import { StyleSheet, View, Text, Button } from 'react-native';

const Foo: React.FC = () => {
  const [value, setValue] = useReState<number>('value', 0);

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          setValue(value + 1);
        }}
        title=" + "
      />
      <Text>State value: {value}</Text>
      <Button
        onPress={() => {
          setValue(value > 0 ? value - 1 : 0);
        }}
        title=" - "
      />
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

or

```tsx
import * as React from 'react';
import { createReState, useReStateSelector, createReStateDispatch } from '@raulpesilva/re-state';

import { StyleSheet, View, Text, Button } from 'react-native';

const useGlobalState = createReState<number>('value', 0);

const Foo: React.FC = () => {
  const [value, setValue] = useGlobalState();

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          setValue(value + 1);
        }}
        title=" + "
      />
      <Text>State value: {value}</Text>
      <Button
        onPress={() => {
          setValue(value > 0 ? value - 1 : 0);
        }}
        title=" - "
      />
    </View>
  );
};

const Bar: React.FC = () => {
  const [value] = useGlobalState();

  return (
    <View style={styles.container}>
      <Text>State value: {value}</Text>
    </View>
  );
};

const Consumer: React.FC = () => {
  const value = useReStateSelector<{ value: number }>((store) => store.value);

  return (
    <View style={styles.container}>
      <Text>State value: {value}</Text>
    </View>
  );
};

const dispatchCountReState = createReStateDispatch<number>('value');
const Setter: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          dispatchCountReState((prev) => prev + 1);
        }}
        title=" + "
      />
      <Text><--></Text>
      <Button
        onPress={() => {
          dispatchCountReState((prev) => prev - 1);
        }}
        title=" - "
      />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Foo />
      <Bar />
      <Consumer />
      <Setter />
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT © [raulpesilva](https://github.com/raulpesilva)
