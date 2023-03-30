import { matches } from '../index';

describe('matches', () => {
  test('should return true if received exactly matches expected', () => {
    expect(matches('Exact', 'Exact')).toBe(true);
  });
  test('should return true if expected is a substring of the received value', () => {
    expect(matches('A few words', 'few')).toBe(true);
  });
  test('should return true if the received value matches the expected regular expression', () => {
    expect(matches('A few words', /FEW/i)).toBe(true);
  });
  test('should return false if expected is not a substring of the received value', () => {
    expect(matches('A few words', 'FEW')).toBe(false);
  });
  test('should return false if the received value does not match the expected regular expression', () => {
    expect(matches('A few words', /FEW/)).toBe(false);
  });
});
