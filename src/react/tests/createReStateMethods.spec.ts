import { act, renderHook } from '@testing-library/react-hooks';
import { createReStateMethods } from '../createReStateMethods';

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
    const key = 'key';
    const { useKeySelect } = createReStateMethods(key, 0);
    const { result } = renderHook(() => useKeySelect());
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
    const { useKey, resetKey } = createReStateMethods(key, 0, valueOfReset);
    const { result } = renderHook(() => useKey());
    act(resetKey);
    expect(result.current[0]).toBe(valueOfReset);
  });

  it('should throw an error if name is not provided', () => {
    // @ts-expect-error
    expect(() => createReStateMethods(undefined, 0)).toThrowError('Name is required');
  });

  it('should throw an error if initialValue is not provided', () => {
    // @ts-expect-error
    expect(() => createReStateMethods('key')).toThrowError('InitialValue is required');
  });
});
