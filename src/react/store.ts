import { Store } from '../core/store';

export const store = new Store();
export const resetReState = () => store.reset();
export const setReStateInitialValue = <T>(key: string, value: T) => store.setInitialValue(key, value);