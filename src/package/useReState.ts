import { useDebugValue, useState } from 'react'
import store from './store'
import { UniqueKey, SetReStateAction, DispatchReState } from './types'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export const useReState = <S>(
  key: UniqueKey,
  initialValue?: SetReStateAction<S>
): [S, DispatchReState<SetReStateAction<S>>] => {
  const [, setReRender] = useState({})

  const setState = (newValue: SetReStateAction<S>) => {
    store.set<SetReStateAction<S>>(key, newValue)
    setReRender({})
  }

  const reRender = (): void => {
    setReRender({})
  }

  const makeState = (value: SetReStateAction<S>): S => {
    if (store.has(key)) {
      return store.get<S>(key)
    } else {
      store.setWithoutNotify<SetReStateAction<S>>(key, value)
      return store.get<S>(key)
    }
  }

  useDebugValue(makeState(initialValue))

  useIsomorphicLayoutEffect(() => {
    const unSub = store.subscribe(key, reRender)

    if (!store.has(key) && initialValue) {
      store.set<SetReStateAction<S>>(key, initialValue)
    }

    return unSub
  }, [initialValue, key])

  const value = makeState(initialValue)
  return [value, setState]
}
