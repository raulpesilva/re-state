import type { UniqueKey, FnVoid } from './types';
import { isFunction } from './utils';
import { getBatch } from './batch';
import { Listener } from './listener';
import { Observer } from './observer';

export class Store {
  __store = new Map<UniqueKey, unknown>();
  __observer = new Observer();
  __listener = new Listener();

  static convertStoreToObject(receivedStore: Map<UniqueKey, unknown>) {
    const obj = Object.fromEntries(receivedStore.entries());
    return obj;
  }

  get<S = undefined>(key: UniqueKey) {
    return this.__store.get(key) as S;
  }

  set<S>(key: UniqueKey, newValue: S): void {
    const prevState = this.get<S>(key);
    const { ...prevStore } = Store.convertStoreToObject(this.__store);

    if (typeof newValue === 'function') {
      this.__store.set(key, newValue(prevState));
    } else {
      this.__store.set(key, newValue);
    }

    const { ...newStore } = Store.convertStoreToObject(this.__store);

    const batch = getBatch();
    batch(() => {
      this.notify(key);
      this.notifySelectors(prevStore, newStore);
    });
  }

  setWithoutNotify<S>(key: UniqueKey, newValue: S): void {
    const prevValue = this.get<S>(key);

    if (typeof newValue === 'function') {
      this.__store.set(key, newValue(prevValue));
    } else {
      this.__store.set(key, newValue);
    }
  }

  has(key: UniqueKey) {
    return this.__store.has(key);
  }

  getMany<T>(fn: (state: any) => T) {
    if (!isFunction(fn)) {
      throw new TypeError(
        'to select a value in the store it is necessary to pass a function - ex: (store)=>store.myKey'
      );
    }
    const objectStore = Store.convertStoreToObject(this.__store);
    return fn(objectStore);
  }

  notifySelectors(prevStore: any, newStore: any) {
    this.__listener.notify(prevStore, newStore);
  }

  subscribeSelector(listener: (prevStore: any, newStore: any) => void) {
    return this.__listener.subscribe(listener);
  }

  subscribe(key: UniqueKey, listener: FnVoid) {
    return this.__observer.subscribe(key, listener);
  }

  notify(key: UniqueKey) {
    this.__observer.notify(key);
  }
}
