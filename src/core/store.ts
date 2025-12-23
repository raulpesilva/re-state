import { getBatch } from './batch';
import { Listener } from './listener';
import { ListenerByKey } from './listenerByKey';
import { convertMapToObj, isFunction } from './utils';

type TListener<T> = (prev: T | undefined, next: T) => void;

export class Store<
  T extends Record<string, unknown>,
  Fields extends keyof T = keyof T,
  Values extends T[keyof T] = T[keyof T]
> {
  private store = new Map<keyof T, T[keyof T]>();
  private initialStore = new Map<keyof T, T[keyof T]>();
  private listeners = new ListenerByKey<T>();
  private watchAllListeners = new Listener<T>();

  constructor(initialStore: T = {} as T) {
    this.store = new Map<Fields, Values>(Object.entries(initialStore) as [Fields, Values][]);
  }

  get size(): number {
    return this.store.size;
  }

  get<K extends Fields>(key: K): T[K] {
    return this.store.get(key) as T[K];
  }

  getInitialValue<K extends Fields>(key: K): T[K] {
    return this.initialStore.get(key) as T[K];
  }

  getStore(): T {
    return convertMapToObj(this.store);
  }

  update<K extends Fields>(key: K, value: T[K]): void {
    this.store.set(key, value);
    if (!this.initialStore.has(key)) this.initialStore.set(key, value);
  }

  setInitialValue<K extends Fields>(key: K, value: T[K] | ((prev: T[K]) => T[K])): void {
    const isFunction = typeof value === 'function';
    const nextValue = isFunction ? (value as (prevState: T[K]) => T[K])(this.get(key)) : value;
    this.initialStore.set(key, nextValue);
    if (!this.store.has(key)) this.store.set(key, nextValue);
  }

  initiateState<K extends Fields>(key: K, value: T[K] | ((prev: T[K]) => T[K])): void {
    const isFunction = typeof value === 'function';
    const nextValue = isFunction ? (value as (prevState: T[K]) => T[K])(this.get(key)) : value;
    if (!this.initialStore.has(key)) this.initialStore.set(key, nextValue);
    if (!this.store.has(key)) this.store.set(key, nextValue);
  }

  set<K extends Fields>(key: K, value: T[K] | ((prev: T[K]) => T[K])): void {
    const isFunction = typeof value === 'function';
    const nextValue = isFunction ? (value as (prevState: T[K]) => T[K])(this.get(key)) : value;
    const prevValue = this.get(key);
    const prevStore = this.getStore();

    const batch = getBatch();

    batch(() => {
      this.update(key, nextValue);
      this.listeners.notify(key, prevValue, nextValue);

      const nextStore = this.getStore();
      this.watchAllListeners.notify(prevStore, nextStore);
    });
  }

  subscribe(listener: TListener<T>): () => void;
  subscribe<K extends Fields>(key: K, listener: TListener<T[K]>): () => void;
  subscribe<K extends Fields>(keyOrListener: K | TListener<T>, listener?: TListener<T[K]>) {
    if (typeof keyOrListener === 'function') return this.watchAllListeners.subscribe(keyOrListener);
    if (!isFunction(listener) || !listener) return () => {};
    return this.listeners.subscribe(keyOrListener, listener);
  }

  has<K extends Fields>(key: K): boolean {
    return this.store.has(key);
  }

  reset(): void {
    this.store = new Map(this.initialStore);
    const keys = Array.from(this.store.keys()) as Fields[];
    const batch = getBatch();
    batch(() => {
      keys.forEach((key) => this.listeners.notify(key, undefined, this.get(key)));
      this.watchAllListeners.notify(undefined, this.getStore());
    });
  }

  resetKey<K extends Fields>(key: K): void {
    const initialValue = this.initialStore.get(key) as T[K];
    this.store.set(key, initialValue);
  }

  clear(): void {
    this.store.clear();
    this.initialStore.clear();
    const batch = getBatch();
    batch(() => {
      this.listeners.clear();
      this.watchAllListeners.notify(undefined, this.getStore());
    });
  }
}
