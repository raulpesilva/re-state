import store from './store'
import { UniqueKey } from './types'

export const createReStateSelect = <S>(key: UniqueKey) => {
  return (): S => store.get(key)
}
