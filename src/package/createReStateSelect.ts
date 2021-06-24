import { useDebugValue, useState } from 'react'
import store from './store'
import { UniqueKey } from './types'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export const createReStateSelect = <S>(key: UniqueKey) => {
  return function useReStateSelect() {
    const [reStateValue, setReStateValue] = useState<S>(store.get(key))

    useDebugValue(reStateValue)

    useIsomorphicLayoutEffect(() => {
      const unSub = store.subscribe(key, () => {
        setReStateValue(store.get(key))
      })

      return unSub
    }, [key])

    return reStateValue
  }
}
