import { getBatch } from './batch'
import Listener from './listener'
import Observer from './observer'
import { UniqueKey, FnVoid } from './types'
import { isFunction } from './utils'
class Store {
  __store = new Map<UniqueKey, unknown>()
  __observer = new Observer()
  __listener = new Listener()

  static convertStoreToObject(receivedStore: Map<UniqueKey, unknown>) {
    const obj = Object.fromEntries(receivedStore.entries())
    return obj
  }

  get<S = undefined>(key: UniqueKey) {
    return this.__store.get(key) as S
  }

  set<S>(key: UniqueKey, newValue: S): void {
    const prevValue = this.get<S>(key)

    if (typeof newValue === 'function') {
      this.__store.set(key, newValue(prevValue))
    } else {
      this.__store.set(key, newValue)
    }

    const batch = getBatch()
    batch(() => {
      this.notify(key)
      this.notifySelectors()
    })
  }

  setWithoutNotify<S>(key: UniqueKey, newValue: S): void {
    const prevValue = this.get<S>(key)

    if (typeof newValue === 'function') {
      this.__store.set(key, newValue(prevValue))
    } else {
      this.__store.set(key, newValue)
    }
  }

  has(key: UniqueKey) {
    return this.__store.has(key)
  }

  getMany<T>(fn: (state: any) => T) {
    if (!isFunction(fn)) {
      throw new TypeError(
        'to select a value in the store it is necessary to pass a function - ex: (store)=>store.myKey'
      )
    }
    const objectStore = Store.convertStoreToObject(this.__store)
    return fn(objectStore)
  }

  notifySelectors() {
    this.__listener.notify()
  }

  subscribeSelector(listener: FnVoid) {
    this.__listener.subscribe(listener)
  }

  subscribe(key: UniqueKey, listener: FnVoid) {
    this.__observer.subscribe(key, listener)
  }

  notify(key: UniqueKey) {
    this.__observer.notify(key)
  }
}
const store = new Store()

export default store
