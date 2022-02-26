import { useCallback, useDebugValue, useState } from 'react';
import type { UniqueKey, SetReStateAction } from '../core/types';
import { store } from './store';
import type { DispatchReState } from './types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useReState<S>(
  key: UniqueKey,
  initialValue?: SetReStateAction<S>
): [S, DispatchReState<SetReStateAction<S>>] {
  const makeState = useCallback(
    (value: SetReStateAction<S>): S => {
      if (store.has(key)) {
        return store.get<S>(key);
      } else {
        store.setWithoutNotify<SetReStateAction<S>>(key, value);
        return store.get<S>(key);
      }
    },
    [key]
  );

  const setState = useCallback(
    (newValue: SetReStateAction<S>) => {
      store.set<SetReStateAction<S>>(key, newValue);
    },
    [key]
  );

  const [reStateValue, setReStateValue] = useState<S>(makeState(initialValue));

  useDebugValue(makeState(initialValue));

  useIsomorphicLayoutEffect(() => {
    const unSub = store.subscribe(key, () => {
      setReStateValue(store.get(key));
    });

    return unSub;
  }, [initialValue, key]);

  return [reStateValue, setState];
}

useReState.displayName = 'useReState';
