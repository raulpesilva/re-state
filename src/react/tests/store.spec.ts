import { resetHardStore, resetReState, setReStateInitialValue, store } from '../store';

afterEach(resetHardStore);

describe('store', () => {
  it('should set initial value with set', () => {
    const key = 'key';
    const value = 'value';
    store.set(key, value);

    expect(store.getInitialValue(key)).toBe(value);
  });

  it('should update initial value with setReStateInitialValue', () => {
    const key = 'key';
    const value = 'value';
    store.set(key, 'never');
    setReStateInitialValue(key, value);

    expect(store.getInitialValue(key)).toBe(value);
  });

  it('should update initial value with setReStateInitialValue', () => {
    const key = 'key';
    const initialValue = 'value';
    const neverInitialValue = 'never';
    store.set(key, initialValue);

    expect(store.getInitialValue(key)).toBe(initialValue);
    expect(store.get(key)).toBe(initialValue);

    store.set(key, neverInitialValue);

    expect(store.get(key)).toBe(neverInitialValue);
    expect(store.getInitialValue(key)).toBe(initialValue);
    expect(store.getInitialValue(key)).not.toBe(neverInitialValue);

    resetReState();

    expect(store.get(key)).toBe(initialValue);
    expect(store.getInitialValue(key)).toBe(initialValue);
    expect(store.getInitialValue(key)).not.toBe(neverInitialValue);
  });
});
