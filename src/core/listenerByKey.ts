import type { SubscribeFn } from './types';

export class ListenerByKey<
  T extends Record<string, unknown>,
  Listener extends <K extends keyof T>(prev: T[K] | undefined, next: T[K]) => void = <K extends keyof T>(
    prev: T[K] | undefined,
    next: T[K]
  ) => void,
  Listeners extends Set<Listener> = Set<Listener>,
  Fields extends keyof T = keyof T
> {
  private listeners = new Map<keyof T, Listeners>();

  get size(): number {
    return this.listeners.size ;
  }

  getListeners<K extends Fields>(key: K): Set<SubscribeFn<T[K]>> {
    return this.listeners.get(key) as Set<SubscribeFn<T[K]>>;
  }

  subscribe<K extends Fields>(key: K, listener: (prev: T[K], next: T[K]) => void) {
    const hasListeners = this.listeners.has(key);
    if (hasListeners) {
      const listeners = this.listeners.get(key) as Set<(prev: T[K], next: T[K]) => void>;
      listeners.add(listener);
    }

    if (!hasListeners) this.listeners.set(key, new Set([listener]) as Listeners);

    return (): void => {
      const listeners = this.listeners.get(key) as Set<(prev: T[K], next: T[K]) => void>;
      if (listeners) listeners.delete(listener);
      if (listeners?.size === 0) this.listeners.delete(key);
    };
  }

  notify<K extends Fields>(key: K, prev: T[K] | undefined, next: T[K]): void {
    if (this.listeners.has(key)) {
      const listeners = this.listeners.get(key);
      listeners!.forEach((listener) => listener(prev, next));
    }
  }
}
