import { FnVoid } from './types'

class Listener {
  _listeners: ((state: any) => void)[] = []

  subscribe(listener: (state: any) => void): FnVoid {
    this._listeners.push(listener)
    return (): void => {
      const index = this._listeners.indexOf(listener)
      if (index > -1) {
        this._listeners[index] = this._listeners[this._listeners.length - 1]
        this._listeners.length--
      }
    }
  }

  notify(state: any): void {
    for (const listener of this._listeners) {
      listener(state)
    }
  }
}

export default Listener
