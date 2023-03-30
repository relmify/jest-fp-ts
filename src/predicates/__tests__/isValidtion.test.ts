import { isValidation } from '../index';
import { left, right } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

const person = t.type({
  name: t.string,
  id: t.number,
});

describe('isValidation', () => {
  test('should return true for the return value of a successful decode', () => {
    expect(isValidation(person.decode({ name: 'Nikolai Tesla', id: 1234 }))).toBe(true);
  });
  test('should return true for the return vale of a failed decode', () => {
    expect(isValidation(person.decode({ name: 'Nikolai Tesla', id: 'string not number' }))).toBe(
      true,
    );
  });
  test('should return true if the value is a right', () => {
    expect(isValidation(right('right value'))).toBe(true);
  });
  test('should return false if the value is not an Either', () => {
    expect(isValidation('not a Validation')).toBe(false);
  });
  test('should return false if the value is a left that does not contain decode Errors', () => {
    expect(isValidation(left('left value'))).toBe(false);
  });
  test('should return false if the value is null', () => {
    expect(isValidation(null)).toBe(false);
  });
  test('should return false if the value is undefined', () => {
    expect(isValidation(undefined)).toBe(false);
  });
});
