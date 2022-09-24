import { FnVoid } from '../core';
import { store } from './store';

export const onReStateChange = (callback: FnVoid, dependencies: string[]) => {
  dependencies.forEach((dependency) => store.subscribe(dependency, callback));
};
