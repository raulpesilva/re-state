import { useDebugValue, useState } from 'react';
import { store } from './store';
import type { Selector } from './types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { shallowEqual } from './utils';

export function useReStateSelector<T, S = T>(selector: Selector<T, S>, isEquals = shallowEqual): S {
  const [selectorValue, setSelectorValue] = useState<S>(selector(store.getStore() as T));

  useDebugValue(selectorValue);

  useIsomorphicLayoutEffect(() => {
    const unSub = store.subscribe((prevStore, newStore) => {
      const prevSelection = selector(prevStore as T);
      const newSelection = selector(newStore as T);
      if (!isEquals(prevSelection, newSelection)) {
        setSelectorValue(newSelection);
      }
    });

    return unSub;
  }, [selector]);

  return selectorValue;
}
