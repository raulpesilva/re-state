import { shallowEqual } from '../utils';

describe('utils', () => {
  it('should return true when shallowEqual', () => {
    expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(shallowEqual(0, 0)).toBe(true);
    expect(shallowEqual(NaN, NaN)).toBe(true);
  });

  it('should return false when not shallowEqual', () => {
    expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
  });
});
