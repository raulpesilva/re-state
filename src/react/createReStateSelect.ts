import { useDebugValue, useState } from 'react';
import { store } from './store';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function createReStateSelect<S>(key: string) {
  return function useReStateSelect() {
    const [reStateValue, setReStateValue] = useState<S>(store.get(key) as S);

    useDebugValue(reStateValue);

    useIsomorphicLayoutEffect(() => {
      const unSub = store.subscribe(key, (_prev, next) => setReStateValue(next as S));
      return unSub;
    }, [key]);

    return reStateValue;
  };
}
