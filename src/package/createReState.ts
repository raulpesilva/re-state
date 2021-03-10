import { useDebugValue } from 'react'
import store from './store'
import { useReState } from './useReState'

export const createReState = <S>(key: UniqueKey, initialValue: SetReStateAction<S>) => {
  store.setWithoutNotify(key, initialValue)
  return function useCreatedUseReState() {
    useDebugValue(store.get(key))
    return useReState<S>(key)
  }
}
