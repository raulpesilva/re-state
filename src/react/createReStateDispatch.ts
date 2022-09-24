import type { SetReStateAction } from '../core/types';
import { store } from './store';

export function createReStateDispatch<S>(key: string) {
  return (value: SetReStateAction<S>) => store.set(key, value);
}
