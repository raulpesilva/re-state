import { FnVoid } from './types'

class Listener {
  _listeners: ((prevStore: any, newStore: any) => void)[] = []

  subscribe(listener: (prevStore: any, newStore: any) => void): FnVoid {
    this._listeners.push(listener)
    return (): void => {
      const index = this._listeners.indexOf(listener)
      if (index > -1) {
        this._listeners[index] = this._listeners[this._listeners.length - 1]
        this._listeners.length--
      }
    }
  }

  notify(prevStore: any, newStore: any): void {
    for (const listener of this._listeners) {
      listener(prevStore, newStore)
    }
  }
}

export default Listener
