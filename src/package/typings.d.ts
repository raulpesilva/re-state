declare type UniqueKey = string | symbol
declare type voidFunction = () => void

declare type batchCallback = (callback: () => any) => void
declare type DispatchReState<A> = (value: A) => void
declare type SetReStateAction<S> = undefined | S | ((prevState: S) => S)
