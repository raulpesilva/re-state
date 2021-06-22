import { useCallback, useDebugValue, useState } from 'react'
import store from './store'
import { DispatchReState, SetReStateAction, UniqueKey } from './types'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export const useReState = <S>(
  key: UniqueKey,
  initialValue?: SetReStateAction<S>
): [S, DispatchReState<SetReStateAction<S>>] => {
  const makeState = useCallback(
    (value: SetReStateAction<S>): S => {
      if (store.has(key)) {
        return store.get<S>(key)
      } else {
        store.setWithoutNotify<SetReStateAction<S>>(key, value)
        return store.get<S>(key)
      }
    },
    [key]
  )

  const setState = useCallback(
    (newValue: SetReStateAction<S>) => {
      store.set<SetReStateAction<S>>(key, newValue)
    },
    [key]
  )

  const [reStateValue, setReStateValue] = useState<S>(makeState(initialValue))

  useDebugValue(makeState(initialValue))

  useIsomorphicLayoutEffect(() => {
    const unSub = store.subscribe(key, () => {
      setReStateValue(store.get(key))
    })

    if (!store.has(key) && initialValue) {
      store.set<SetReStateAction<S>>(key, initialValue)
    }

    return unSub
  }, [initialValue, key])

  return [reStateValue, setState]
}
