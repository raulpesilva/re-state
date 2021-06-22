import store from './store'
import { SetReStateAction, UniqueKey } from './types'

export const createReStateDispatch = <S>(key: UniqueKey) => {
  return (value: SetReStateAction<S>) => store.set(key, value)
}
