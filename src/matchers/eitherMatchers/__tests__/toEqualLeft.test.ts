import { left, right } from 'fp-ts/lib/Either';
import matchers from '../index';

expect.extend(matchers);

describe('.toEqualLeft should pass', () => {
  test('if the received is a Left with the expected value', () => {
    expect(left('Left')).toEqualLeft('Left');
  });
  test('if received is a Left with an undefined expected value', () => {
    expect(left(undefined)).toEqualLeft(undefined);
  });
  test('if received is a Left with a null expected value', () => {
    expect(left(null)).toEqualLeft(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(left('People who are truly strong lift others up.')).toEqual(
      expect.toEqualLeft('People who are truly strong lift others up.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(left('People who are truly powerful bring others together.')).toEqualLeft(
      expect.stringContaining('powerful'),
    );
  });
});

describe('.toEqualLeft should fail', () => {
  test('if received is a Right', () => {
    expect(() => expect(right('left')).toEqualLeft('left')).toThrowError();
  });
  test('if received is a Left that does not equal the expected value', () => {
    expect(() => expect(left('another left')).toEqualLeft('left')).toThrowError();
  });
});

describe('.not.toEqualLeft should pass', () => {
  test('if received is a Left that does not equal the expected value', () => {
    expect(left('Left')).not.toEqualLeft('A different value');
  });
  test('if received is a Right', () => {
    expect(right('Right')).not.toEqualLeft('Hello');
  });
});

describe('.not.toEqualLeft should fail', () => {
  test('if received is a Left that equals the expected value', () => {
    expect(() => expect(left('left')).not.toEqualLeft('left')).toThrowError();
  });
});
