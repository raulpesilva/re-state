import store from './store'

export const createReStateDispatch = (key: UniqueKey) => {
  return (value: any) => store.set(key, value)
}
