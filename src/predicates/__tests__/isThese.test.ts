import { isThese } from '../index';
import { left, right, both } from 'fp-ts/lib/These';
import { left as leftEither, right as rightEither } from 'fp-ts/lib/Either';

describe('isThese', () => {
  test('should return true if the value is a left (These)', () => {
    expect(isThese(left('left value'))).toBe(true);
  });
  test('should return true if the value is a left (Either)', () => {
    expect(isThese(leftEither('left value'))).toBe(true);
  });
  test('should return true if the value is a right (These)', () => {
    expect(isThese(right('right value'))).toBe(true);
  });
  test('should return true if the value is a right (Either)', () => {
    expect(isThese(rightEither('right value'))).toBe(true);
  });
  test('should return true if the value is a both', () => {
    expect(isThese(both('left value', 'right value'))).toBe(true);
  });
  test('should return false if the value is not a left, right, or both', () => {
    expect(isThese('not a These')).toBe(false);
  });
  test('should return false if the value is null', () => {
    expect(isThese(null)).toBe(false);
  });
  test('should return false if the value is undefined', () => {
    expect(isThese(undefined)).toBe(false);
  });
});
