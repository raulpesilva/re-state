export type UniqueKey = string | symbol
export type DispatchReState<A> = (value: A) => void
export type SetReStateAction<S> = S | ((prevState: S) => S) | undefined
export type FnVoid = () => void
export type Selector<T, S = T> = (store: T) => S
