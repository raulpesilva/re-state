import { Listener } from '../listener';

let listener = new Listener();

afterEach(() => {
  listener = new Listener();
});

const noop = () => {};

describe('Listener', () => {
  test('should add an function to listeners', () => {
    listener.subscribe(noop);
    expect(listener._listeners.length).toBe(1);
    listener.subscribe(noop);
    listener.subscribe(noop);
    expect(listener._listeners.length).toBe(3);
  });

  test('should remove an function from listeners', () => {
    const unsubscribe1 = listener.subscribe(noop);
    const unsubscribe2 = listener.subscribe(noop);
    const unsubscribe3 = listener.subscribe(noop);
    expect(listener._listeners.length).toBe(3);

    unsubscribe1();
    expect(listener._listeners.length).toBe(2);

    unsubscribe2();
    expect(listener._listeners.length).toBe(1);

    unsubscribe3();
    expect(listener._listeners.length).toBe(0);
  });

  test('should notify listeners', () => {
    const callback = jest.fn();
    listener.subscribe(callback);
    listener.notify(null, 1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should notify listeners with prevStore and newStore', () => {
    const callback = jest.fn();
    listener.subscribe(callback);
    listener.notify(1, 2);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1, 2);
  });

  test('should notify listeners with prevStore and newStore and remove listener', () => {
    const callback = jest.fn();
    const unsubscribe = listener.subscribe(callback);
    listener.notify(1, 2);
    unsubscribe();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1, 2);

    listener.notify(1, 2);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
