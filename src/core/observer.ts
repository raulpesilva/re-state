import type { FnVoid, UniqueKey } from './types';

export class Observer {
  _listeners = new Map();

  subscribe(key: UniqueKey, listener: FnVoid): FnVoid {
    if (this._listeners.has(key)) {
      const listeners = this._listeners.get(key);
      this._listeners.set(key, [...listeners, listener]);
    }

    if (!this._listeners.has(key)) {
      this._listeners.set(key, [listener]);
    }

    return (): void => {
      const listenersCopy = [...this._listeners.get(key)];
      const index = this._listeners.get(key).indexOf(listener);
      if (index < 0) return;
      listenersCopy[index] = listenersCopy[listenersCopy.length - 1];
      listenersCopy.length--;
      this._listeners.set(key, listenersCopy);
    };
  }

  notify(key: UniqueKey): void {
    if (this._listeners.has(key)) {
      for (const listener of this._listeners.get(key)) {
        listener();
      }
    }
  }
}
