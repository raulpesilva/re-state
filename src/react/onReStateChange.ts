import { FnVoid, UniqueKey } from '../core';
import { store } from './store';

export const onReStateChange = (callback: FnVoid, dependencies: UniqueKey[]) => {
  dependencies.forEach((dependency) => store.subscribe(dependency, callback));
};
