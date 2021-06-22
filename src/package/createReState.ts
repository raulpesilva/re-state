import { useDebugValue } from 'react'
import store from './store'
import { UniqueKey, SetReStateAction, DispatchReState } from './types'
import { useReState } from './useReState'

export const createReState = <S>(key: UniqueKey, initialValue?: SetReStateAction<S>) => {
  store.setWithoutNotify(key, initialValue)
  return function useCreatedUseReState(): [S, DispatchReState<SetReStateAction<S>>] {
    // useDebugValue(store.get(key))
    return useReState<S>(key)
  }
}
