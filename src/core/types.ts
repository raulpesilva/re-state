export type FnVoid = () => void;
export type UniqueKey = string | symbol;
export type SetReStateAction<S> = S | ((prevState: S) => S) | undefined;
export type CompareStore<T> = (prevStore: T, newStore: T) => void;
export type SubscribeFn<T> = (prev: T, next: T) => void;
