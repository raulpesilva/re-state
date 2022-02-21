import { getBatch, setBatch } from '../batch';

describe('Batch', () => {
  test('should initiate batch with function which receive callback function', () => {
    const callback = jest.fn();
    const batch = getBatch();
    expect(batch).toBeInstanceOf(Function);
    expect(callback).toHaveBeenCalledTimes(0);
    batch(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should should set batch', () => {
    const callback = jest.fn();
    const newBatch = jest.fn();
    setBatch(newBatch);
    getBatch()(callback);
    expect(newBatch).toHaveBeenCalledWith(callback);
  });
});
