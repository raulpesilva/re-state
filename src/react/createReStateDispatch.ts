import type { UniqueKey, SetReStateAction } from '../core/types';
import { store } from './store';

export function createReStateDispatch<S>(key: UniqueKey) {
  return (value: SetReStateAction<S>) => store.set(key, value);
}
