import store from './store'
import { DispatchReState, SetReStateAction, UniqueKey } from './types'
import { useReState } from './useReState'

export const createReState = <S>(key: UniqueKey, initialValue?: SetReStateAction<S>) => {
  store.setWithoutNotify(key, initialValue)
  return function useCreatedUseReState(): [S, DispatchReState<SetReStateAction<S>>] {
    return useReState<S>(key)
  }
}
