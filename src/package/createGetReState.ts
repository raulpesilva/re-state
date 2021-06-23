import store from './store'
import { UniqueKey } from './types'

export const createGetReState = <S>(key: UniqueKey) => {
  return (): S => store.get(key)
}
