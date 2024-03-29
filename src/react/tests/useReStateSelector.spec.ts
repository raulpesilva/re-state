import { renderHook, act } from '@testing-library/react-hooks';
import { useReStateSelector } from '../useReStateSelector';
import { createReState } from '../createReState';

describe('useReStateSelector', () => {
  it('should return the initial state', () => {
    const key = 'key';
    const useTestHook = createReState(key, 0);
    renderHook(() => useTestHook());
    const { result } = renderHook(() => useReStateSelector<{ [key]: number }, number>((state) => state[key]));
    expect(result.current).toBe(0);
  });

  it('should return the current state', () => {
    const key = 'key';
    const useTestHook = createReState(key, 0);
    const { result: resultTestHook } = renderHook(() => useTestHook());
    const { result } = renderHook(() => useReStateSelector<{ [key]: number }, number>((state) => state[key]));
    expect(result.current).toBe(0);
    act(() => resultTestHook.current[1](1));
    expect(result.current).toBe(1);
    act(() => resultTestHook.current[1](1));
    expect(result.current).toBe(1);
  });
});
