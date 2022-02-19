import { useDebugValue, useState } from 'react';
import type { UniqueKey } from '../core/types';
import { store } from './store';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function createReStateSelect<S>(key: UniqueKey) {
  return function useReStateSelect() {
    const [reStateValue, setReStateValue] = useState<S>(store.get(key));

    useDebugValue(reStateValue);

    useIsomorphicLayoutEffect(() => {
      const unSub = store.subscribe(key, () => {
        setReStateValue(store.get(key));
      });

      return unSub;
    }, [key]);

    return reStateValue;
  };
}
