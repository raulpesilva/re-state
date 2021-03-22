import store from './store'
import { UniqueKey, SetReStateAction } from './types'

export const createReStateDispatch = <S>(key: UniqueKey) => {
  return (value: SetReStateAction<S>) => store.set(key, value)
}
