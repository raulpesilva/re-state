import { act, renderHook } from '@testing-library/react-hooks';
import { createReState } from '../createReState';
import { createReStateDispatch } from '../createReStateDispatch';
import { resetHardStore } from '../store';

afterEach(resetHardStore);

describe('createReStateDispatch', () => {
  it('should return the current state', () => {
    const key = 'key';
    const useTestHook = createReState(key, 0);
    const testHookDispatch = createReStateDispatch<number>(key);
    const { result } = renderHook(() => useTestHook());
    expect(result.current[0]).toBe(0);
    act(() => testHookDispatch((state) => state + 1));
    expect(result.current[0]).toBe(1);
    act(() => testHookDispatch(5));
    expect(result.current[0]).toBe(5);
    act(() => result.current[1](6));
    expect(result.current[0]).toBe(6);
    act(() => testHookDispatch((state) => state + 1));
    expect(result.current[0]).toBe(7);
  });
});
