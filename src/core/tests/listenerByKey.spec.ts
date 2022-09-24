import { ListenerByKey } from '../listenerByKey';

let listenerByKey = new ListenerByKey();
afterEach(() => {
  listenerByKey = new ListenerByKey();
});

const noop = () => {};

describe('listenerByKey', () => {
  test('should add an function to listeners', () => {
    const key = 'key';
    const key2 = 'key2';
    listenerByKey.subscribe(key, noop);
    expect(listenerByKey.size).toBe(1);
    listenerByKey.subscribe(key2, noop);
    expect(listenerByKey.size).toBe(2);
  });

  test('should remove an function from listeners', () => {
    const key = 'key';
    const unsubscribe1 = listenerByKey.subscribe(key, () => noop());
    const unsubscribe2 = listenerByKey.subscribe(key, () => noop());
    const unsubscribe3 = listenerByKey.subscribe(key, () => noop());
    expect(listenerByKey.getListeners(key).size).toBe(3);

    unsubscribe1();
    expect(listenerByKey.getListeners(key).size).toBe(2);

    unsubscribe2();
    expect(listenerByKey.getListeners(key).size).toBe(1);

    unsubscribe3();
    expect(listenerByKey.getListeners(key)).toBe(undefined);
  });

  test('should notify listeners', () => {
    const key = 'key';
    const callback = jest.fn();
    listenerByKey.subscribe(key, callback);
    listenerByKey.notify(key, undefined, undefined);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined, undefined);
  });

  test('should only notify listeners with the same key', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    listenerByKey.subscribe(key1, callback1);
    listenerByKey.subscribe(key2, callback2);
    listenerByKey.notify(key1, undefined, undefined);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(undefined, undefined);
    expect(callback2).not.toBeCalled();
  });

  test('should add 2 listener to one key', () => {
    const key = 'key';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    listenerByKey.subscribe(key, callback1);
    listenerByKey.subscribe(key, callback2);
    expect(listenerByKey.getListeners(key).size).toBe(2);
  });

  test('should notify all listener in a key', () => {
    const key = 'key';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    listenerByKey.subscribe(key, callback1);
    listenerByKey.subscribe(key, callback2);
    listenerByKey.notify(key, undefined, undefined);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(undefined, undefined);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith(undefined, undefined);
  });

  test('should do nothing when try to remove 2 time the same listener', () => {
    const key = 'key';
    const unsubscribe1 = listenerByKey.subscribe(key, noop);
    expect(listenerByKey.getListeners(key).size).toBe(1);
    unsubscribe1();
    expect(listenerByKey.getListeners(key)).toBe(undefined);
    unsubscribe1();
    expect(listenerByKey.getListeners(key)).toBe(undefined);
  });
});
