import { SetReStateAction } from '../core';
import { createGetReState } from './createGetReState';
import { createReState } from './createReState';
import { createReStateDispatch } from './createReStateDispatch';
import { createReStateSelect } from './createReStateSelect';
import { setReStateInitialValue } from './store';
import type { ReStateMethods } from './types';

/**
 * Creates a set of methods to use with React.
 * @param name Unique name of the state
 * @param initialValue initial value of the state
 * @param valueOfReset value to reset when calling resetReState
 * @returns a set of methods to use with React
 */
export const createReStateMethods = <S extends string = string, V extends any = any>(
  name: S,
  initialValue?: SetReStateAction<V>,
  valueOfReset?: { value: V }
): { [K in keyof ReStateMethods<S, V>]: ReStateMethods<S, V>[K] } => {
  if (!name) throw new Error('Name is required');
  if (typeof name !== 'string') throw new Error('Name need to be a string');

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  const use = createReState<V>(name, initialValue);
  const useSelect = createReStateSelect<V>(name);
  const dispatch = createReStateDispatch<V>(name);
  const get = createGetReState<V>(name);
  if (valueOfReset) setReStateInitialValue(name, valueOfReset.value);

  const methods = {
    [`use${capitalizedName}`]: use,
    [`use${capitalizedName}Select`]: useSelect,
    [`dispatch${capitalizedName}`]: dispatch,
    [`get${capitalizedName}`]: get,
    [`reset${capitalizedName}`]: () => dispatch(valueOfReset?.value ?? initialValue),
  } as ReStateMethods<S, V>;

  return methods;
};
