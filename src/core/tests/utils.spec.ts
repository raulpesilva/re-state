import { isFunction } from '../utils';

describe('Utils', () => {
  test('should return true if is type function', () => {
    const fn = () => {};
    expect(isFunction(fn)).toBe(true);
  });
});
