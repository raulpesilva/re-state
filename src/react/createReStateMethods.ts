import { SetReStateAction } from '../core';
import { createGetReState } from './createGetReState';
import { createReState } from './createReState';
import { createReStateDispatch } from './createReStateDispatch';
import { createReStateSelect } from './createReStateSelect';
import { setReStateInitialValue } from './store';
import { DispatchReState } from './types';

type A = string;
type useReState<T, S> = T extends A ? { [K in T as `use${T}`]: [S, DispatchReState<SetReStateAction<S>>] } : never;
type useReStateSelect<T, S> = T extends A ? { [K in T as `use${T}Select`]: () => S } : never;
type dispatchReState<T, S> = T extends A ? { [K in T as `dispatch${T}`]: DispatchReState<SetReStateAction<S>> } : never;
type getReState<T, S> = T extends A ? { [K in T as `get${T}`]: () => S } : never;
type resetReState<S> = S extends A ? { [K in S as `reset${S}`]: () => void } : never;

type ReState<T, S> = useReState<T, S> &
  useReStateSelect<T, S> &
  dispatchReState<T, S> &
  getReState<T, S> &
  resetReState<T>;

export const createReStateMethods = <T extends any = any, S extends string = string, I extends S = S>(
  name: S,
  value: T,
  valueOfReset?: I
) => {
  if (!name) throw new Error('Name is required');
  if (!value) throw new Error('Value is required');

  const use = createReState(name, value);
  const useSelect = createReStateSelect<T>(name);
  const dispatch = createReStateDispatch<T>(name);
  const get = createGetReState<T>(name);
  if (valueOfReset) setReStateInitialValue(name, valueOfReset);

  const methods = {
    [`use${name}`]: use,
    [`use${name}Select`]: useSelect,
    [`dispatch${name}`]: dispatch,
    [`get${name}`]: get,
    [`reset${name}`]: () => dispatch(value),
  } as ReState<S, T>;

  return methods;
};
