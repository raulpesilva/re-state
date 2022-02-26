import { renderHook, act } from '@testing-library/react-hooks';
import { useReState } from '../useReState';

describe('useReState', () => {
  it('should return the initial state', () => {
    const key = 'key';
    const { result } = renderHook(() => useReState(key, 0));
    expect(result.current[0]).toBe(0);
  });

  it('should return the current state', () => {
    const key = 'key';
    const { result } = renderHook(() => useReState(key, 0));
    act(() => result.current[1](1));
    expect(result.current[0]).toBe(1);
  });

  it('should return the current state', () => {
    const key = 'key';
    const { result } = renderHook(() => useReState(key, 0));
    act(() => result.current[1](1));
    act(() => result.current[1](2));
    expect(result.current[0]).toBe(2);
  });

  it('should update all current state of hooks', () => {
    const key = 'key';
    const { result: result1 } = renderHook(() => useReState(key, 0));
    const { result: result2 } = renderHook(() => useReState(key, 0));

    act(() => result1.current[1](1));
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);

    act(() => result2.current[1](2));
    expect(result1.current[0]).toBe(2);
    expect(result2.current[0]).toBe(2);
  });
});
