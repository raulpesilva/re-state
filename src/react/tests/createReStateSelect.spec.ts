import { renderHook, act } from '@testing-library/react-hooks';
import { createReState } from '../createReState';
import { createReStateSelect } from '../createReStateSelect';

describe('createReStateSelect', () => {
  it('should return the initial state', () => {
    const key = 'key';
    const useTestHook = createReState(key, 0);
    const useTestHookSelect = createReStateSelect(key);
    renderHook(() => useTestHook());
    const { result } = renderHook(() => useTestHookSelect());
    expect(result.current).toBe(0);
  });

  it('should return the current state', () => {
    const key = 'key';
    const useTestHook = createReState(key, 0);
    const useTestHookSelect = createReStateSelect(key);
    const { result: resultState } = renderHook(() => useTestHook());
    const { result } = renderHook(() => useTestHookSelect());
    expect(result.current).toBe(0);
    act(() => resultState.current[1](1));
    expect(result.current).toBe(1);
  });
});
