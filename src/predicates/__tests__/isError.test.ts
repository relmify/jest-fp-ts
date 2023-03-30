import { isError } from '../index';

describe('isError', () => {
  test('should return true for a standard error object', () => {
    expect(isError(new Error('Standard error object'))).toBe(true);
  });
  test('should return true for a TypeError', () => {
    expect(isError(new TypeError('a Type Error'))).toBe(true);
  });
  test('should return true for a custom class that extends error', () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        Object.defineProperty(this, 'name', { value: 'CustomError' });
      }
    }
    expect(isError(new CustomError('a Custom Error'))).toBe(true);
  });
  test('should return false if the value is not an object', () => {
    expect(isError('not an Error')).toBe(false);
  });
  test('should return false if the value is a plain object with a name and message', () => {
    expect(isError({ name: 'Error', message: 'Message' })).toBe(false);
  });
  test('should return false if the value is null', () => {
    expect(isError(null)).toBe(false);
  });
  test('should return false if the value is undefined', () => {
    expect(isError(undefined)).toBe(false);
  });
});
