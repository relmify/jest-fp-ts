import { isEither } from '../index';
import { left, right } from 'fp-ts/lib/Either';

describe('isEither', () => {
  test('should return true if the value is a left', () => {
    expect(isEither(left('left value'))).toBe(true);
  });
  test('should return true if the value is a right', () => {
    expect(isEither(right('right value'))).toBe(true);
  });
  test('should return false if the value is neither a left nor a right', () => {
    expect(isEither('not an either')).toBe(false);
  });
  test('should return false if the value is null', () => {
    expect(isEither(null)).toBe(false);
  });
  test('should return false if the value is undefined', () => {
    expect(isEither(undefined)).toBe(false);
  });
});
