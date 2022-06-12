import type { UniqueKey, FnVoid } from './types';
import { isFunction } from './utils';
import { getBatch } from './batch';
import { Listener } from './listener';
import { Observer } from './observer';

export class Store {
  __store = new Map<UniqueKey, unknown>();
  __initial_store = new Map<UniqueKey, unknown>();
  __observer = new Observer();
  __listener = new Listener();

  static convertStoreToObject(receivedStore: Map<UniqueKey, unknown>) {
    const obj = Object.fromEntries(receivedStore.entries());
    return obj;
  }

  static getStoreKeys(store: Map<UniqueKey, unknown>): UniqueKey[] {
    return Array.from(store.keys());
  }

  get<S = undefined>(key: UniqueKey) {
    return this.__store.get(key) as S;
  }

  getMany<T>(fn: (state: any) => T) {
    if (!isFunction(fn)) {
      throw new TypeError(
        'to select a value in the store it is necessary to pass a function - ex: (store) => store.myKey'
      );
    }
    const objectStore = Store.convertStoreToObject(this.__store);
    return fn(objectStore);
  }

  _set<S>(key: UniqueKey, newValue: S): void {
    const hasKey = this.__store.has(key);
    if (typeof newValue === 'function') {
      const prevValue = this.get<S>(key);
      const value = newValue(prevValue);
      this.__store.set(key, value);
      if (!hasKey) this.setInitialValue(key, value);
    } else {
      this.__store.set(key, newValue);
      if (!hasKey) this.setInitialValue(key, newValue);
    }
  }

  set<S>(key: UniqueKey, newValue: S): void {
    const { ...prevStore } = Store.convertStoreToObject(this.__store);

    this._set(key, newValue);

    const { ...newStore } = Store.convertStoreToObject(this.__store);

    const batch = getBatch();
    batch(() => {
      this.notify(key);
      this.notifySelectors(prevStore, newStore);
    });
  }

  setWithoutNotify<S>(key: UniqueKey, newValue: S): void {
    this._set(key, newValue);
  }

  setInitialValue<S>(key: UniqueKey, value: S) {
    this.__initial_store.set(key, value);
  }

  has(key: UniqueKey) {
    return this.__store.has(key);
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

  reset() {
    this.__store = new Map(this.__initial_store.entries());
    const keys = Store.getStoreKeys(this.__store);
    const batch = getBatch();
    const newStore = Store.convertStoreToObject(this.__store);
    batch(() => {
      keys.forEach((key) => {
        this.notify(key);
        this.notifySelectors(undefined, newStore);
      });
    });
  }
}
