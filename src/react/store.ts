import type { UniqueKey } from '../core';
import { Store } from '../core/store';

export const store = new Store();
export const resetReState = () => store.reset();
export const setReStateInitialValue = (key: UniqueKey, value: any) => store.setInitialValue(key, value);