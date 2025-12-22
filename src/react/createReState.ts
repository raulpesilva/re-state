import type { SetReStateAction } from '../core/types';
import { store } from './store';
import type { DispatchReState } from './types';
import { useReState } from './useReState';

export function createReState<S>(key: string, initialValue?: SetReStateAction<S>) {
  store.initiateState(key, initialValue);
  return function useCreatedUseReState(): [S, DispatchReState<SetReStateAction<S>>] {
    return useReState<S>(key);
  };
}
