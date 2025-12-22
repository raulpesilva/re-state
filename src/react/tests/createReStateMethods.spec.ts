import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-hooks';
import { SetReStateAction } from '../../core';
import { createReStateMethods } from '../createReStateMethods';
import { resetHardStore } from '../store';

afterEach(resetHardStore);

describe('createReStateMethods', () => {
  it('should return all methods', () => {
    const key = 'key';
    const methods = createReStateMethods(key, 0);
    expect(methods.useKey).toBeTruthy();
    expect(methods.useKeySelect).toBeTruthy();
    expect(methods.dispatchKey).toBeTruthy();
    expect(methods.getKey).toBeTruthy();
    expect(methods.resetKey).toBeTruthy();
  });

  it('should render reState hook', () => {
    const key = 'key';
    const { useKey } = createReStateMethods(key, 0);
    const { result } = renderHook(() => useKey());
    expect(result.current[0]).toBe(0);
  });

  it('should render new value reState hook', () => {
    const key = 'key';
    const { useKey } = createReStateMethods(key, 0);
    const { result } = renderHook(() => useKey());
    act(() => result.current[1](1));
    expect(result.current[0]).toBe(1);
  });

  it('should render reState hook select', () => {
    const key = 'keyRender';
    const { useKeyRenderSelect } = createReStateMethods(key, 0);
    const { result } = renderHook(() => useKeyRenderSelect());
    expect(result.current).toBe(0);
  });

  it('should render new value reState hook select', () => {
    const key = 'key';
    const { useKeySelect, dispatchKey } = createReStateMethods(key, 0);
    const { result } = renderHook(() => useKeySelect());
    act(() => dispatchKey(1));
    expect(result.current).toBe(1);
  });

  it('should get the store value when call getReState', () => {
    const key = 'key';
    const { getKey, dispatchKey } = createReStateMethods(key, 0);
    act(() => dispatchKey(1));
    expect(getKey()).toBe(1);
  });

  it('should reset the store value when call resetReState', () => {
    const key = 'key';
    const { resetKey, getKey, dispatchKey } = createReStateMethods(key, 0);
    act(() => dispatchKey(2));
    expect(getKey()).toBe(2);
    act(() => resetKey());
    expect(getKey()).toBe(0);
  });

  it('should set valueOfReset', () => {
    const key = 'key';
    const valueOfReset = 1;
    const { useKey, resetKey } = createReStateMethods(key, 0, { value: valueOfReset });
    const { result } = renderHook(() => useKey());
    act(resetKey);
    expect(result.current[0]).toBe(valueOfReset);
  });

  it('should throw an error if name is not provided', () => {
    // @ts-expect-error
    expect(() => createReStateMethods(undefined)).toThrowError('Name is required');
    // @ts-expect-error
    expect(() => createReStateMethods(null)).toThrowError('Name is required');
    expect(() => createReStateMethods('')).toThrowError('Name is required');
    // @ts-expect-error
    expect(() => createReStateMethods(NaN)).toThrowError('Name is required');
    // @ts-expect-error
    expect(() => createReStateMethods(12)).toThrowError('Name need to be a string');
    // @ts-expect-error
    expect(() => createReStateMethods(BigInt(123))).toThrowError('Name need to be a string');
    // @ts-expect-error
    expect(() => createReStateMethods([])).toThrowError('Name need to be a string');
    // @ts-expect-error
    expect(() => createReStateMethods({})).toThrowError('Name need to be a string');
    // @ts-expect-error
    expect(() => createReStateMethods(true)).toThrowError('Name need to be a string');
  });

  it('should not throw an error if initialValue is not provided', () => {
    expect(() => createReStateMethods('key')).not.toThrowError('InitialValue is required');
  });

  it('should accept function as initialValue', () => {
    const key = 'funcInit';
    const initFn: SetReStateAction<number> = () => 42;
    const { useFuncInit, getFuncInit } = createReStateMethods(key, initFn);
    const { result } = renderHook(() => useFuncInit());
    expect(result.current[0]).toBe(42);
    expect(getFuncInit()).toBe(42);
  });

  it('should compute initialValue from function only once', () => {
    const key = 'funcOnce';
    const initFn = jest.fn(() => 100) as SetReStateAction<number>;
    const { useFuncOnce } = createReStateMethods(key, initFn);
    const { result: result1 } = renderHook(() => useFuncOnce());
    const { result: result2 } = renderHook(() => useFuncOnce());
    expect(result1.current[0]).toBe(100);
    expect(result2.current[0]).toBe(100);
    expect(initFn).toHaveBeenCalledTimes(1);
  });

  it('should not override existing state when called with function initialValue', () => {
    const key = 'noOverride';
    const initFn1: SetReStateAction<number> = () => 10;
    const { useNoOverride, dispatchNoOverride } = createReStateMethods(key, initFn1);
    const { result } = renderHook(() => useNoOverride());
    expect(result.current[0]).toBe(10);
    act(() => dispatchNoOverride(20));
    expect(result.current[0]).toBe(20);
    const initFn2: SetReStateAction<number> = () => 30;
    const { useNoOverride: useNoOverride2 } = createReStateMethods(key, initFn2);
    const { result: result2 } = renderHook(() => useNoOverride2());
    expect(result2.current[0]).toBe(20);
  });
});
