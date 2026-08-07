import type { SetReStateAction } from '../core';

export type DispatchReState<A> = (value: A) => void;
export type Selector<T, S = unknown> = (store: T) => S;
type useReState<S extends string, V> = Record<`use${Capitalize<S>}`, () => [V, DispatchReState<SetReStateAction<V>>]>;
type useReStateSelect<S extends string, V> = Record<`use${Capitalize<S>}Select`, () => V>;
type dispatchReState<S extends string, V> = Record<`dispatch${Capitalize<S>}`, DispatchReState<SetReStateAction<V>>>;
type getReState<S extends string, V> = Record<`get${Capitalize<S>}`, () => V>;
type resetReState<S extends string> = Record<`reset${Capitalize<S>}`, () => void>;

export type ReStateMethods<T extends string, S> = useReState<T, S> &
  useReStateSelect<T, S> &
  dispatchReState<T, S> &
  getReState<T, S> &
  resetReState<T>;
