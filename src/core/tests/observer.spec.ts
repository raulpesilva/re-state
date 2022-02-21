import { Observer } from '../observer';

let observer = new Observer();
afterEach(() => {
  observer = new Observer();
});

describe('Observer', () => {
  test('should add an function to listeners', () => {
    const key = 'key';
    observer.subscribe(key, () => {});
    expect(observer._listeners.get(key).length).toBe(1);
    observer.subscribe(key, () => {});
    observer.subscribe(key, () => {});
    expect(observer._listeners.get(key).length).toBe(3);
  });

  test('should remove an function from listeners', () => {
    const key = 'key';
    const unsubscribe1 = observer.subscribe(key, () => {});
    const unsubscribe2 = observer.subscribe(key, () => {});
    const unsubscribe3 = observer.subscribe(key, () => {});
    expect(observer._listeners.get(key).length).toBe(3);

    unsubscribe1();
    expect(observer._listeners.get(key).length).toBe(2);

    unsubscribe2();
    expect(observer._listeners.get(key).length).toBe(1);

    unsubscribe3();
    expect(observer._listeners.get(key).length).toBe(0);
  });

  test('should notify listeners', () => {
    const key = 'key';
    const callback = jest.fn();
    observer.subscribe(key, callback);
    observer.notify(key);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith();
  });

  test('should only notify listeners with the same key', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    observer.subscribe(key1, callback1);
    observer.subscribe(key2, callback2);
    observer.notify(key1);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith();
    expect(callback2).not.toBeCalled();
  });
});
