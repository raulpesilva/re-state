import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-hooks';
import { createReState } from '../createReState';
import { onReStateChange } from '../onReStateChange';
import { resetHardStore } from '../store';

afterEach(resetHardStore);

describe('onReStateChange', () => {
  it('should have been called when state change', () => {
    const key = 'key';
    const useTestHook = createReState(key, 0);
    const { result } = renderHook(() => useTestHook());
    const fn = jest.fn();
    onReStateChange(fn, [key]);
    expect(result.current[0]).toBe(0);
    expect(fn).toHaveBeenCalledTimes(0);
    act(() => result.current[1](1));
    expect(result.current[0]).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should have been called only when key state change', () => {
    const key1 = 't-key1';
    const key2 = 't-key2';
    const useTestHook1 = createReState(key1, 0);
    const useTestHook2 = createReState(key2, 0);
    const { result: hook1 } = renderHook(() => useTestHook1());
    const { result: hook2 } = renderHook(() => useTestHook2());
    const fn = jest.fn();
    onReStateChange(fn, [key1]);
    expect(hook1.current[0]).toBe(0);
    expect(hook2.current[0]).toBe(0);
    expect(fn).toHaveBeenCalledTimes(0);
    act(() => hook1.current[1](1));
    expect(hook1.current[0]).toBe(1);
    expect(hook2.current[0]).toBe(0);
  });

  it('should have been called only when some dependency key state change', () => {
    const key1 = 'change-key1';
    const key2 = 'change-key2';
    const key3 = 'change-key3';
    const key4 = 'change-key4';
    const useTestHook1 = createReState(key1, 0);
    const useTestHook2 = createReState(key2, 0);
    const useTestHook3 = createReState(key3, 0);
    const useTestHook4 = createReState(key4, 0);
    const { result: hook1 } = renderHook(() => useTestHook1());
    const { result: hook2 } = renderHook(() => useTestHook2());
    const { result: hook3 } = renderHook(() => useTestHook3());
    const { result: hook4 } = renderHook(() => useTestHook4());
    const fn = jest.fn();
    onReStateChange(fn, [key1, key3]);
    expect(hook1.current[0]).toBe(0);
    expect(hook2.current[0]).toBe(0);
    expect(hook3.current[0]).toBe(0);
    expect(hook4.current[0]).toBe(0);
    expect(fn).toHaveBeenCalledTimes(0);
    act(() => hook1.current[1](1));
    expect(hook1.current[0]).toBe(1);
    expect(hook2.current[0]).toBe(0);
    expect(hook3.current[0]).toBe(0);
    expect(hook4.current[0]).toBe(0);
    expect(fn).toHaveBeenCalledTimes(1);
    act(() => hook3.current[1](1));
    expect(hook1.current[0]).toBe(1);
    expect(hook2.current[0]).toBe(0);
    expect(hook3.current[0]).toBe(1);
    expect(hook4.current[0]).toBe(0);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should not have been called when some non dependency key state change', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    const key3 = 'key3';
    const key4 = 'key4';
    const useTestHook1 = createReState(key1, 0);
    const useTestHook2 = createReState(key2, 0);
    const useTestHook3 = createReState(key3, 0);
    const useTestHook4 = createReState(key4, 0);
    const { result: hook1 } = renderHook(() => useTestHook1());
    const { result: hook2 } = renderHook(() => useTestHook2());
    const { result: hook3 } = renderHook(() => useTestHook3());
    const { result: hook4 } = renderHook(() => useTestHook4());
    const fn = jest.fn();
    onReStateChange(fn, [key1, key3]);
    expect(hook1.current[0]).toBe(0);
    expect(hook2.current[0]).toBe(0);
    expect(hook3.current[0]).toBe(0);
    expect(hook4.current[0]).toBe(0);
    expect(fn).toHaveBeenCalledTimes(0);
    act(() => hook2.current[1](1));
    expect(hook1.current[0]).toBe(0);
    expect(hook2.current[0]).toBe(1);
    expect(hook3.current[0]).toBe(0);
    expect(hook4.current[0]).toBe(0);
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
