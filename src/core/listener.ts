import type { CompareStore, FnVoid } from './types';

export class Listener {
  _listeners: CompareStore[] = [];

  subscribe(listener: CompareStore): FnVoid {
    this._listeners.push(listener);
    return (): void => {
      const index = this._listeners.indexOf(listener);
      if (index > -1) {
        this._listeners[index] = this._listeners[this._listeners.length - 1] as CompareStore;
        this._listeners.length--;
      }
    };
  }

  notify(prevStore: any, newStore: any): void {
    for (const listener of this._listeners) {
      listener(prevStore, newStore);
    }
  }
}
