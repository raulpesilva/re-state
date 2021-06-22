import { setBatch } from './batch'
import { unstable_batchedUpdates as batch } from './reactBatchedUpdates'
export { createReState } from './createReState'
export { createReStateDispatch } from './createReStateDispatch'
export { createReStateSelect } from './createReStateSelect'
export type { Selector, UniqueKey } from './types'
export { useReState } from './useReState'
export { useReStateSelector } from './useReStateSelector'
setBatch(batch)
