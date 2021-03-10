import store from './store'

export const createReStateDispatch = <S>(key: UniqueKey) => {
  return (value: SetReStateAction<S>) => store.set(key, value)
}
