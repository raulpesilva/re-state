class Listener {
  _listeners: FnVoid[] = []

  subscribe(listener: FnVoid): FnVoid {
    this._listeners.push(listener)
    return (): void => {
      const index = this._listeners.indexOf(listener)
      if (index > -1) {
        this._listeners[index] = this._listeners[this._listeners.length - 1]
        this._listeners.length--
      }
    }
  }

  notify(): void {
    for (const listener of this._listeners) {
      listener()
    }
  }
}

export default Listener
