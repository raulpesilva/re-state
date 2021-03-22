export type UniqueKey = string | symbol
export type IStore<T> = { [key: string]: T }
export type voidFunction = () => void
export type batchCallback = (callback: () => any) => void
export type DispatchReState<A> = (value: A) => void
export type SetReStateAction<S> = S | ((prevState: S) => S) | undefined
export type FnVoid = () => void
