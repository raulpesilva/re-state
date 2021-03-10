import { useCallback, useDebugValue, useEffect, useRef, useState } from 'react'
import store from './store'
import { shallowEqual } from './utils'

export const useReStateSelector = <T>(selector = (store: IStore<T>): any => store, isEquals = shallowEqual): T => {
  const prevState = useRef(store.getMany(selector))
  const [, setReRender] = useState({})

  const reRender = useCallback(() => {
    if (isEquals(prevState.current, store.getMany(selector))) {
      return
    }
    setReRender({})
  }, [isEquals, selector])

  useDebugValue(store.getMany<T>(selector))

  useEffect(() => {
    const unSub = store.subscribeSelector(() => {
      store.getMany<T>(selector)
      reRender()
    })

    return unSub
  }, [selector, reRender])

  return store.getMany<T>(selector)
}
