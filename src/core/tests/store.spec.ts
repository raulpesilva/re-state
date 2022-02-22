import { setBatch } from '../batch';
import { Store } from '../store';

let store = new Store();

afterEach(() => {
  store = new Store();
});

describe('Store', () => {
  test('should initiate store without value', () => {
    expect(store.__store.size).toBe(0);
  });

  test('should add a value to store', () => {
    const key = 'key';
    const value = 'value';
    store.set(key, value);
    expect(store.__store.size).toBe(1);
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
    expect(store.__store.size).toBe(1);
    expect(store.get(key)).toBe(value1);
    store.set(key, value2);
    expect(store.get(key)).toBe(value2);
    expect(store.__store.size).toBe(1);
  });

  test('should set a value with function value', () => {
    const key = 'key';
    const value = () => 'value';
    store.set(key, value);
    expect(store.__store.size).toBe(1);
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
    store.subscribeSelector(callback3);
    store.subscribeSelector(callback4);
    store.set(key, value1);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith();
    expect(callback2).toHaveBeenCalledWith();
    expect(callback3).toHaveBeenCalledTimes(1);
    expect(callback3).toHaveBeenCalledWith({}, { [key]: value1 });
    expect(callback4).toHaveBeenCalledTimes(1);
    expect(callback4).toHaveBeenCalledWith({}, { [key]: value1 });
    store.set(key, value2);
    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledWith();
    expect(callback2).toHaveBeenCalledWith();
    expect(callback3).toHaveBeenCalledTimes(2);
    expect(callback3).toHaveBeenCalledWith({ [key]: value1 }, { [key]: value2 });
    expect(callback4).toHaveBeenCalledTimes(2);
    expect(callback4).toHaveBeenCalledWith({ [key]: value1 }, { [key]: value2 });
  });

  test('should receive entire store to a function', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    const value1 = 1;
    const value2 = 2;
    store.set(key1, value1);
    store.set(key2, value2);
    const callback = jest.fn();
    store.getMany(callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ [key1]: value1, [key2]: value2 });
  });

  test('should return an error when not pass a function', () => {
    // @ts-ignore (this line to force to pass the test string)
    expect(() => store.getMany('test')).toThrowError();
  });

  test('should initiate without listeners', () => {
    expect(store.__listener._listeners.length).toBe(0);
    expect(store.__observer._listeners.size).toBe(0);
  });

  test('should subscribe', () => {
    const key = 'key';
    store.subscribe(key, () => {});
    expect(store.__observer._listeners.get(key).length).toBe(1);
  });

  test('should subscribeSelector', () => {
    store.subscribeSelector(() => {});
    expect(store.__listener._listeners.length).toBe(1);
  });

  test('should unsubscribe', () => {
    const key = 'key';
    const unsubscribe1 = store.subscribe(key, () => {});
    const unsubscribe2 = store.subscribe(key, () => {});
    const unsubscribe3 = store.subscribe(key, () => {});
    expect(store.__observer._listeners.get(key).length).toBe(3);

    unsubscribe1();
    expect(store.__observer._listeners.get(key).length).toBe(2);

    unsubscribe2();
    expect(store.__observer._listeners.get(key).length).toBe(1);

    unsubscribe3();
    expect(store.__observer._listeners.get(key).length).toBe(0);
  });

  test('should unsubscribe selectors', () => {
    const unsubscribe1 = store.subscribeSelector(() => {});
    const unsubscribe2 = store.subscribeSelector(() => {});
    const unsubscribe3 = store.subscribeSelector(() => {});
    expect(store.__listener._listeners.length).toBe(3);

    unsubscribe1();
    expect(store.__listener._listeners.length).toBe(2);

    unsubscribe2();
    expect(store.__listener._listeners.length).toBe(1);

    unsubscribe3();
    expect(store.__listener._listeners.length).toBe(0);
  });

  test('should notify', () => {
    const key = 'key';
    const callback = jest.fn();
    store.subscribe(key, callback);
    store.notify(key);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should notify all listeners in a key', () => {
    const key = 'key';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    store.subscribe(key, callback1);
    store.subscribe(key, callback2);
    store.notify(key);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  test('should notifySelector with prevStore and newStore', () => {
    const callback = jest.fn();
    store.subscribeSelector(callback);
    store.notifySelectors(1, 2);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1, 2);
  });

  test('should notifySelector with prevStore and newStore and remove listener', () => {
    const callback = jest.fn();
    const unsubscribe = store.subscribeSelector(callback);
    store.notifySelectors(1, 2);
    unsubscribe();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(store.__listener._listeners.length).toBe(0);
  });

  test('should notify all subscribed selectors', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    store.subscribeSelector(callback1);
    store.subscribeSelector(callback2);
    store.notifySelectors(1, 2);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(1, 2);
    expect(callback2).toHaveBeenCalledWith(1, 2);
  });

  test('should convert Map to object', () => {
    const map = new Map([
      ['key1', 1],
      ['key2', 2],
    ]);
    const obj = Store.convertStoreToObject(map);
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
    store.setWithoutNotify(key, value);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(store.get(key)).toBe(value);
  });

  test('should set store without notify with value function', () => {
    const key = 'key';
    const value = 1;
    const value1 = jest.fn(() => 1);
    const callback = jest.fn();
    store.subscribe(key, callback);
    store.setWithoutNotify(key, value1);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(value1).toHaveBeenCalledTimes(1);
    expect(value1).toHaveBeenCalledWith(undefined);
    expect(store.get(key)).toBe(value);
  });
});
