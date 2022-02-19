import type { SetReStateAction, UniqueKey } from '../core/types';
import { store } from './store';
import type { DispatchReState } from './types';
import { useReState } from './useReState';

export function createReState<S>(key: UniqueKey, initialValue?: SetReStateAction<S>) {
  store.setWithoutNotify(key, initialValue);
  return function useCreatedUseReState(): [S, DispatchReState<SetReStateAction<S>>] {
    return useReState<S>(key);
  };
}
