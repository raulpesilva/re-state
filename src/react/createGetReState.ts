import type { UniqueKey } from '../core/types';
import { store } from './store';

export function createGetReState<S>(key: UniqueKey) {
  return (): S => store.get(key);
}
