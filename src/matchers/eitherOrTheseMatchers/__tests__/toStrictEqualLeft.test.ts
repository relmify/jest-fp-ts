import { left, right } from 'fp-ts/lib/Either';
import { matchers } from '../index';

expect.extend(matchers);

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toStrictEqualLeft should pass', () => {
  test('if the received is a Left with the expected value', () => {
    expect(left('Left')).toStrictEqualLeft('Left');
  });
  test('if received is a Left with an undefined expected value', () => {
    expect(left(undefined)).toStrictEqualLeft(undefined);
  });
  test('if received is a Left with a null expected value', () => {
    expect(left(null)).toStrictEqualLeft(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(left('People who are truly strong lift others up.')).toEqual(
      expect.toStrictEqualLeft('People who are truly strong lift others up.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(left('People who are truly powerful bring others together.')).toStrictEqualLeft(
      expect.stringContaining('powerful'),
    );
  });
});

describe('.toStrictEqualLeft should fail', () => {
  test('if received is a Right', () => {
    expect(() => expect(right('left')).toStrictEqualLeft('left')).toThrowError();
  });
  test('if received is a Left that does not equal the expected value', () => {
    expect(() => expect(left('another left')).toStrictEqualLeft('left')).toThrowError();
  });
  test('if received is a Left that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(left([1, undefined, 3])).toStrictEqualLeft([1, , 3])).toThrowError();
  });
  test('if received is a Left that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(left({ message: 'Does not compute!' })).toStrictEqualLeft(
        new Message('Does not compute!'),
      ),
    ).toThrowError();
  });
});

describe('.not.toStrictEqualLeft should pass', () => {
  test('if received is a Left that does not equal the expected value', () => {
    expect(left('Left')).not.toStrictEqualLeft('A different value');
  });
  test('if received is a Right', () => {
    expect(right('Right')).not.toStrictEqualLeft('Hello');
  });
});

describe('.not.toStrictEqualLeft should fail', () => {
  test('if received is a Left that equals the expected value', () => {
    expect(() => expect(left('left')).not.toStrictEqualLeft('left')).toThrowError();
  });
});
