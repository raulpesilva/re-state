import { useDebugValue } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { store } from './store';

export function createReStateSelect<S>(key: string) {
  return function useReStateSelect() {
    const reStateValue = useSyncExternalStore(
      (fn) => store.subscribe(key, fn),
      () => store.get(key),
      () => store.get(key)
    );

    useDebugValue(reStateValue);

    return reStateValue as S;
  };
}
