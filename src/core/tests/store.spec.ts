import { setBatch } from '../batch';
import { Store } from '../store';
import { convertMapToObj } from '../utils';

let store = new Store();

afterEach(() => {
  store = new Store();
});

describe('Store', () => {
  test('should initiate store without value', () => {
    expect(store.size).toBe(0);
  });

  test('should add a value to store', () => {
    const key = 'key';
    const value = 'value';
    store.set(key, value);
    expect(store.size).toBe(1);
  });

  test('should get store value', () => {
    const key = 'key';
    const value = 'value';
    store.set(key, value);
    expect(store.get(key)).toBe(value);
  });

  test('should update store value ', () => {
    const key = 'key';
    const value1 = 'value1';
    const value2 = 'value2';
    store.set(key, value1);
    expect(store.size).toBe(1);
    expect(store.get(key)).toBe(value1);
    store.set(key, value2);
    expect(store.get(key)).toBe(value2);
    expect(store.size).toBe(1);
  });

  test('should set a value with function value', () => {
    const key = 'key';
    const value = () => 'value';
    store.set(key, value);
    expect(store.size).toBe(1);
    expect(store.get(key)).toBe(value());
  });

  test('should receive previous value on function value', () => {
    const key = 'key';
    const value1 = 1;
    const value2 = 2;
    const setValue1 = jest.fn(() => 1);
    const setValue2 = jest.fn((prev: number) => prev + 2);
    store.set(key, setValue1);
    expect(store.get(key)).toBe(value1);
    expect(setValue1).toHaveBeenCalledTimes(1);
    expect(setValue1).toHaveBeenCalledWith(undefined);
    store.set(key, setValue2);
    expect(store.get(key)).toBe(value1 + value2);
    expect(setValue2).toHaveBeenCalledTimes(1);
    expect(setValue2).toHaveBeenCalledWith(value1);
  });

  test('should notify all listeners and selectors when set value', () => {
    const key = 'key';
    const value1 = 1;
    const value2 = 2;
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();
    const callback4 = jest.fn();
    store.subscribe(key, callback1);
    store.subscribe(key, callback2);
    store.subscribe(callback3);
    store.subscribe(callback4);
    store.set(key, value1);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(undefined, value1);
    expect(callback2).toHaveBeenCalledWith(undefined, value1);
    expect(callback3).toHaveBeenCalledTimes(1);
    expect(callback3).toHaveBeenCalledWith({}, { [key]: value1 });
    expect(callback4).toHaveBeenCalledTimes(1);
    expect(callback4).toHaveBeenCalledWith({}, { [key]: value1 });
    store.set(key, value2);
    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledWith(1, 2);
    expect(callback2).toHaveBeenCalledWith(1, 2);
    expect(callback3).toHaveBeenCalledTimes(2);
    expect(callback3).toHaveBeenCalledWith({ [key]: value1 }, { [key]: value2 });
    expect(callback4).toHaveBeenCalledTimes(2);
    expect(callback4).toHaveBeenCalledWith({ [key]: value1 }, { [key]: value2 });
  });

  test('should return entire store', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    const value1 = 1;
    const value2 = 2;
    store.set(key1, value1);
    store.set(key2, value2);

    expect(store.getStore()).toStrictEqual({ [key1]: value1, [key2]: value2 });
  });

  test('should return an error when not pass a function', () => {
    // @ts-ignore (this line to force to pass the test string)
    expect(() => store.getMany('test')).toThrowError();
  });

  test('should notify', () => {
    const key = 'key';
    const callback = jest.fn();
    store.subscribe(key, callback);
    store.set(key, undefined);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should notify all listeners in a key', () => {
    const key = 'key';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    store.subscribe(key, callback1);
    store.subscribe(key, callback2);
    store.set(key, undefined);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  test('should notifySelector with prevStore and newStore', () => {
    const key = 'key';
    const callback = jest.fn();
    store.subscribe(callback);
    store.set(key, 1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({}, { [key]: 1 });
  });

  test('should notifySelector with prevStore and newStore and remove listener', () => {
    const key = 'key';
    const callback = jest.fn();
    const unsubscribe = store.subscribe(callback);
    store.set(key, 1);
    unsubscribe();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({}, { [key]: 1 });
  });

  test('should notify all subscribed selectors', () => {
    const key = 'key';

    const callback1 = jest.fn();
    const callback2 = jest.fn();
    store.subscribe(callback1);
    store.subscribe(callback2);
    store.set(key, 1);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith({}, { [key]: 1 });
    expect(callback2).toHaveBeenCalledWith({}, { [key]: 1 });
  });

  test('should convert Map to object', () => {
    const map = new Map([
      ['key1', 1],
      ['key2', 2],
    ]);
    const obj = convertMapToObj(map);
    expect(obj).toEqual({ key1: 1, key2: 2 });
  });

  test('should batch set store', () => {
    const key1 = 'key1';
    const value1 = 1;
    const callback = jest.fn();
    const batch = jest.fn((fn) => fn());
    store.subscribe(key1, callback);
    setBatch(batch);
    store.set(key1, value1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(batch).toHaveBeenCalledTimes(1);
  });

  test('should batch set store with multiple keys', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    const value1 = 1;
    const value2 = 2;
    const callback = jest.fn();
    const batch = jest.fn((fn) => fn());
    store.subscribe(key1, callback);
    store.subscribe(key2, callback);
    setBatch(batch);
    store.set(key1, value1);
    store.set(key2, value2);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(batch).toHaveBeenCalledTimes(2);
  });

  test('should update store when value is undefined', () => {
    const key = 'key';
    const value = 1;
    const callback = jest.fn();
    store.subscribe(key, callback);
    store.set(key, value);
    store.set(key, undefined);
    // @ts-ignore
    store.set(key);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('should check has key', () => {
    const key = 'key';
    const value = 1;
    expect(store.has(key)).toBe(false);
    store.set(key, value);
    expect(store.has(key)).toBeTruthy();
  });

  test('should return undefined when key not exist', () => {
    const key = 'key';
    expect(store.get(key)).toBeUndefined();
  });

  test('should set store without notify', () => {
    const key = 'key';
    const value = 1;
    const callback = jest.fn();
    store.subscribe(key, callback);
    store.update(key, value);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(store.get(key)).toBe(value);
  });

  test('should set store without notify with value function', () => {
    const key = 'key';
    const value = 1;
    const callback = jest.fn();
    store.subscribe(key, callback);
    store.update(key, 1);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(store.get(key)).toBe(value);
  });

  test('should keep initial value when set store', () => {
    const key = 'key';
    const initialValue = 1;
    store.set(key, initialValue);
    expect(store.get(key)).toBe(initialValue);
    expect(store.getInitialValue(key)).toBe(initialValue);
    store.set(key, 2);
    expect(store.get(key)).toBe(2);
    expect(store.getInitialValue(key)).toBe(initialValue);
  });

  test('should reset store', () => {
    const key = 'key';
    const key2 = 'key2';
    const value = 1;
    const callback = jest.fn();
    const callback2 = jest.fn();
    store.subscribe(key, callback);
    store.subscribe(key2, callback2);
    store.set(key, value);
    store.set(key2, value);
    expect(store.get(key)).toBe(value);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    store.set(key, 2);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledTimes(1);
    store.reset();
    expect(store.get(key)).toBe(value);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback2).toHaveBeenCalledTimes(2);
  });

  test('should reset store key', () => {
    const key = 'key';
    const key2 = 'key2';
    const value = 1;

    store.set(key, value);
    store.set(key2, value);
    expect(store.get(key)).toBe(value);
    store.set(key, 2);
    store.set(key2, 2);
    store.resetKey(key);
    expect(store.get(key)).toBe(value);
    expect(store.get(key2)).toBe(2);
  });

  test('should not crash when pass invalid subscribe', () => {
    //@ts-expect-error
    const unsubscribe = store.subscribe();
    expect(unsubscribe).toBeTruthy();
    expect(unsubscribe()).toBeUndefined();
  });

  describe('initiateState', () => {
    test('should set initial value if key does not exist', () => {
      const key = 'initKey';
      const value = 'initValue';
      store.initiateState(key, value);
      expect(store.get(key)).toBe(value);
      expect(store.getInitialValue(key)).toBe(value);
    });

    test('should not override existing initial value', () => {
      const key = 'initKey';
      const value1 = 'value1';
      const value2 = 'value2';
      store.initiateState(key, value1);
      store.initiateState(key, value2);
      expect(store.get(key)).toBe(value1);
      expect(store.getInitialValue(key)).toBe(value1);
    });

    test('should accept function value and compute initial value', () => {
      const key = 'initFuncKey';
      const getValue = jest.fn(() => 42);
      store.initiateState(key, getValue);
      expect(store.get(key)).toBe(42);
      expect(store.getInitialValue(key)).toBe(42);
      expect(getValue).toHaveBeenCalledTimes(1);
      expect(getValue).toHaveBeenCalledWith(undefined);
    });

    test('should not override with function value if key exists', () => {
      const key = 'initFuncKey';
      const value1 = 10;
      const getValue = jest.fn((prev: number) => prev + 5);
      store.initiateState(key, value1);
      store.initiateState(key, getValue);
      expect(store.get(key)).toBe(value1);
      expect(store.getInitialValue(key)).toBe(value1);
      expect(getValue).toHaveBeenCalledTimes(1);
    });
  });

  describe('setInitialValue', () => {
    test('should set initial value with plain value', () => {
      const key = 'setInitKey';
      const value = 'setValue';
      store.setInitialValue(key, value);
      expect(store.get(key)).toBe(value);
      expect(store.getInitialValue(key)).toBe(value);
    });

    test('should override initial value even if it exists', () => {
      const key = 'setInitKey';
      const value1 = 'value1';
      const value2 = 'value2';
      store.setInitialValue(key, value1);
      store.setInitialValue(key, value2);
      expect(store.getInitialValue(key)).toBe(value2);
    });

    test('should accept function value and compute initial value', () => {
      const key = 'setInitFuncKey';
      const getValue = jest.fn(() => 100);
      store.setInitialValue(key, getValue);
      expect(store.get(key)).toBe(100);
      expect(store.getInitialValue(key)).toBe(100);
      expect(getValue).toHaveBeenCalledTimes(1);
      expect(getValue).toHaveBeenCalledWith(undefined);
    });

    test('should pass previous value to function when key exists', () => {
      const key = 'setInitFuncKey';
      const value1 = 50;
      const getValue = jest.fn((prev: number) => prev + 25);
      store.set(key, value1);
      store.setInitialValue(key, getValue);
      expect(store.getInitialValue(key)).toBe(75);
      expect(getValue).toHaveBeenCalledWith(value1);
    });

    test('should not override store value if it already exists', () => {
      const key = 'setInitKey';
      const value1 = 'storeValue';
      const value2 = 'newInitValue';
      store.set(key, value1);
      store.setInitialValue(key, value2);
      expect(store.get(key)).toBe(value1);
      expect(store.getInitialValue(key)).toBe(value2);
    });
  });
});
