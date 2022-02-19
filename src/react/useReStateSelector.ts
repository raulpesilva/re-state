import { useDebugValue, useState } from 'react';
import { shallowEqual } from './utils';
import { store } from './store';
import type { Selector } from './types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useReStateSelector<T, S = T>(selector: Selector<T, S>, isEquals = shallowEqual): S {
  const [selectorValue, setSelectorValue] = useState<S>(store.getMany(selector));

  useDebugValue(selectorValue);

  useIsomorphicLayoutEffect(() => {
    const unSub = store.subscribeSelector((prevStore: T, newStore: T) => {
      const prevSelection = selector(prevStore);
      const newSelection = selector(newStore);
      if (!isEquals(prevSelection, newSelection)) {
        setSelectorValue(newSelection);
      }
    });

    return unSub;
  }, [selector]);

  return selectorValue;
}
