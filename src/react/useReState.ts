import { useCallback, useDebugValue, useState } from 'react';
import type { SetReStateAction } from '../core/types';
import { store } from './store';
import type { DispatchReState } from './types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

const upSetState = <S>(key: string, value: SetReStateAction<S>): S => {
  if (store.has(key)) return store.get(key) as S;
  store.setInitialValue(key, value);
  return store.get(key) as S;
};

export function useReState<S>(
  key: string,
  initialValue?: SetReStateAction<S>
): [S, DispatchReState<SetReStateAction<S>>] {
  const [reStateValue, setReStateValue] = useState<S>(() => upSetState(key, initialValue));
  const setState = useCallback((newValue: SetReStateAction<S>) => store.set(key, newValue), [key]);

  useDebugValue(reStateValue);

  useIsomorphicLayoutEffect(() => {
    return store.subscribe(key, (_prev, next) => setReStateValue(next as S));
  }, [initialValue, key]);

  return [reStateValue, setState];
}

useReState.displayName = 'useReState';
