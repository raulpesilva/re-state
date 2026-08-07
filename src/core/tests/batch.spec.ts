import { describe, expect, test, vi } from 'vitest';
import { getBatch, setBatch } from '../batch';

describe('Batch', () => {
  test('should initiate batch with function which receive callback function', () => {
    const callback = vi.fn();
    const batch = getBatch();
    expect(batch).toBeInstanceOf(Function);
    expect(callback).toHaveBeenCalledTimes(0);
    batch(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should should set batch', () => {
    const callback = vi.fn();
    const newBatch = vi.fn();
    setBatch(newBatch);
    getBatch()(callback);
    expect(newBatch).toHaveBeenCalledWith(callback);
  });
});
