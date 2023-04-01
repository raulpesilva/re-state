import { act, renderHook } from '@testing-library/react-hooks';
import { createGetReState } from '../createGetReState';
import { createReState } from '../createReState';
import { resetHardStore } from '../store';

afterEach(resetHardStore);

describe('createGetReState', () => {
  it('should return the initial state', () => {
    const key = 'key';
    const useTestHook = createReState(key, 0);
    const getTestHook = createGetReState(key);
    const { result } = renderHook(() => useTestHook());
    expect(result.current[0]).toBe(0);
    expect(getTestHook()).toBe(0);
  });

  it('should return the current state', () => {
    const key = 'key';
    const useTestHook = createReState(key, 0);
    const getTestHook = createGetReState(key);
    const { result } = renderHook(() => useTestHook());
    act(() => result.current[1](1));
    expect(result.current[0]).toBe(1);
    expect(getTestHook()).toBe(1);
  });
});
