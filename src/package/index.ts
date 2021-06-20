import { setBatch } from './batch'
import { unstable_batchedUpdates as batch } from './reactBatchedUpdates'
export { createReState } from './createReState'
export { createReStateDispatch } from './createReStateDispatch'
export { createReStateSelect } from './createReStateSelect'
export { useReState } from './useReState'
export { useReStateSelector } from './useReStateSelector'
export type { UniqueKey, Selector } from './types'
setBatch(batch)
