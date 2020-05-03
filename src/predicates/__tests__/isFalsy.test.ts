import { isFalsy } from '../index';

describe('isFalsey', () => {
  it('returns true for a falsy value', () => {
    expect(isFalsy(null)).toBe(true);
  });
  it('returns false for for a truthy value', () => {
    expect(isFalsy(-10)).toBe(false);
  });
});
