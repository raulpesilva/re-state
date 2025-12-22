import { FnVoid } from '../core';
import { store } from './store';

export const onReStateChange = (callback: FnVoid, dependencies: string[]) => {
  const subscriptions = dependencies.map((dependency) => store.subscribe(dependency, callback));
  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
};
