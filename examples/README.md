<div align="center">
  <img alt="re-state" width="250" src="./assets/logo.svg" />
  <br/>
  <br/>
  <h1>Examples</h1>
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

## Simple Usage

```js
import * as React from 'react'
import useReState from '@raulpesilva/re-state'

import { StyleSheet, View, Text, Button } from 'react-native'

const Foo: React.FC = () => {
  const [value, setValue] = useReState < number > ('value', 0)

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          setValue(value + 1)
        }}
        title=" + "
      />
      <Text>State value: {value}</Text>
      <Button
        onPress={() => {
          setValue(value > 0 ? value - 1 : 0)
        }}
        title=" - "
      />
    </View>
  )
}

const Bar: React.FC = () => {
  const [value] = useReState < number > ('value', 0)

  return (
    <View style={styles.container}>
      <Text>State value: {value}</Text>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Foo />
      <Bar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
```

# Advanced Usage

## Create a global State

This method create a global state hook to use in any component

```ts
//mutedState.ts
import { createReState } from '@raulpesilva/re-state'

export type Muted = boolean
export const key = 'muted'

export const useMuted = createReState<Muted>(key, true)
```

## Example create re state

```tsx
//MyComponent.tsx
import { useMuted } from './mutedState'

export const MyComponent = () => {
  const [muted, useMuted] = useMuted()

  return (
    <div>
      <span>{muted ? 'Is muted' : 'Is unMuted'}</span>
      <button onClick={() => setMuted(prevState => !prevState)}>Toggle mute</button>
      <span>or</span>
      <button onClick={() => setMuted(!muted)}>Toggle mute</button>
    </div>
  )
}
```

## Create re-state selector

This method select any data from store and update when change

```tsx
import {useReStateSelector} from '@raulpesilva/re-state'
import type { Muted } from './mutedState'
import { key } from './mutedState'

export const MyComponent = () => {
  const muted = useReStateSelector<Muted>(({muted}=> muted))

  return (
    <div>
      <span>{muted ? 'Is muted' : 'Is unMuted'}</span>
    </div>
  )
}
```

```ts
const result: any = useReStateSelector(selector: Function, equalityFn?: Function)
```

## Create re-state select

This method select any data from store

```ts
//mutedState.ts
import { createReState, createReStateDispatch, createReStateSelect } from '@raulpesilva/re-state'

export type Muted = boolean
export const key = 'muted'

export const useMuted = createReState<Muted>(key, true)
export const muteDispatch = createReStateDispatch<Muted>(key)
export const toggleMute = () => muteDispatch(prev => !prev)

export const getMutedValue = createReStateSelect<Muted>(key)
```

## Create re-state Dispatch

This method update data on store

```ts
//mutedState.ts
import { createReState, createReStateDispatch } from '@raulpesilva/re-state'

export type Muted = boolean
export const key = 'muted'

export const useMuted = createReState<Muted>(key, true)
export const muteDispatch = createReStateDispatch<Muted>(key)
export const toggleMute = () => muteDispatch(prev => !prev)
```

```tsx
import type { Muted,toggleMute } from './mutedState'
import { key } from './mutedState'

export const MyComponent = () => {
  const muted = useReStateSelector<Muted>(({muted}=> muted))

  return (
    <div>
      <span>{muted ? 'Is muted' : 'Is unMuted'}</span>
      <button onClick={toggleMute}>Toggle mute</button>
    </div>
  )
}
```
