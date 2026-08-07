import { useCallback, useDebugValue } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import type { SetReStateAction } from '../core/types';
import { store } from './store';
import type { DispatchReState } from './types';

const upSetState = <S>(key: string, value: SetReStateAction<S>): S => {
  if (store.has(key)) return store.get(key) as S;
  store.initiateState(key, value);
  return store.get(key) as S;
};

export function useReState<S>(
  key: string,
  initialValue?: SetReStateAction<S>
): [S, DispatchReState<SetReStateAction<S>>] {
  const reStateValue = useSyncExternalStore(
    (onStoreChange) => store.subscribe(key, onStoreChange),
    () => upSetState(key, initialValue),
    () => upSetState(key, initialValue)
  );

  const setState = useCallback((newValue: SetReStateAction<S>) => store.set(key, newValue), [key]);

  useDebugValue(reStateValue);

  return [reStateValue, setState];
}

useReState.displayName = 'useReState';
