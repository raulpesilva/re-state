export type DispatchReState<A> = (value: A) => void;
export type Selector<T, S = T> = (store: T) => S;
