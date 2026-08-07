import { useDebugValue } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';
import { store } from './store';
import { shallowEqual } from './utils';

export function useReStateSelector<Store, Selection = unknown>(
  selector: (store: Store) => Selection,
  isEquals: (storeA: Selection, storeB: Selection) => boolean = shallowEqual
) {
  const selectorValue = useSyncExternalStoreWithSelector<Store, Selection>(
    (onStoreChange) => store.subscribe(onStoreChange),
    () => store.getStore() as Store,
    () => store.getStore() as Store,
    selector,
    isEquals
  );

  useDebugValue(selectorValue);
  return selectorValue;
}
