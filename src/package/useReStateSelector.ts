import { useCallback, useDebugValue, useRef, useState } from 'react'
import store from './store'
import { Selector } from './types'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import { shallowEqual } from './utils'

export const useReStateSelector = <T, S = T>(selector: Selector<T, S>, isEquals = shallowEqual): S => {
  const [selectorValue, setSelectorValue] = useState<S>(store.getMany(selector))

  const reRender = useCallback(
    (prevState: S) => {
      if (!isEquals(prevState, store.getMany<S>(selector))) {
        setSelectorValue(store.getMany<S>(selector))
      }
    },
    [isEquals, selector]
  )

  useDebugValue(selectorValue)

  useIsomorphicLayoutEffect(() => {
    const unSub = store.subscribeSelector((state: S) => {
      reRender(state)
    })

    return unSub
  }, [selector, reRender])

  return selectorValue
}
