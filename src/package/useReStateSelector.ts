import { useCallback, useDebugValue, useRef, useState } from 'react'
import store from './store'
import { Selector } from './types'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import { shallowEqual } from './utils'

export const useReStateSelector = <T, S = T>(selector: Selector<T, S>, isEquals = shallowEqual): S => {
  const prevState = useRef(store.getMany(selector))
  const [, setReRender] = useState({})

  const reRender = useCallback(() => {
    if (isEquals(prevState.current, store.getMany(selector))) {
      return
    }
    setReRender({})
  }, [isEquals, selector])

  useDebugValue(store.getMany<S>(selector))

  useIsomorphicLayoutEffect(() => {
    const unSub = store.subscribeSelector(() => {
      store.getMany<S>(selector)
      reRender()
    })

    return unSub
  }, [selector, reRender])

  return store.getMany<S>(selector)
}
