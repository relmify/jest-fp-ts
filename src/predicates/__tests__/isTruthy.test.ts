import { isTruthy } from '../index';

describe('isTruthy', () => {
  it('returns true for for a truthy value', () => {
    expect(isTruthy(-10)).toBe(true);
  });
  it('returns false for a falsy value', () => {
    expect(isTruthy(null)).toBe(false);
  });
});
