import { store } from './store';

export function createGetReState<S>(key: string) {
  return (): S => store.get(key) as S;
}
