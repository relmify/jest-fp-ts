import { left, right } from 'fp-ts/lib/Either';
import { matchers } from '../index';

expect.extend(matchers);

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toStrictEqualRight should pass', () => {
  test('if received is a Right with the expected value', () => {
    expect(right('Right')).toStrictEqualRight('Right');
  });
  test('if received is a Right with an undefined expected value', () => {
    expect(right(undefined)).toStrictEqualRight(undefined);
  });
  test('if the received is a Right with a null expected value', () => {
    expect(right(null)).toStrictEqualRight(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(right('People who are truly strong lift others up.')).toEqual(
      expect.toStrictEqualRight('People who are truly strong lift others up.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(right('People who are truly powerful bring others together.')).toStrictEqualRight(
      expect.stringContaining('powerful'),
    );
  });
});

describe('.toStrictEqualRight should fail', () => {
  test('if received is a Left', () => {
    expect(() => expect(left('right')).toStrictEqualRight('right')).toThrowError();
  });
  test('if received is a Right that does not equal the expected value', () => {
    expect(() => expect(right('another right')).toStrictEqualRight('right')).toThrowError();
  });
  test('if received is a Right that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(right([1, undefined, 3])).toStrictEqualRight([1, , 3])).toThrowError();
  });
  test('if received is a Right that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(right({ message: 'Does not compute!' })).toStrictEqualRight(
        new Message('Does not compute!'),
      ),
    ).toThrowError();
  });
});

describe('.not.toStrictEqualRight should pass', () => {
  test('if received is a Right that does not have the expected value', () => {
    expect(right('Right')).not.toStrictEqualRight('A different value');
  });
  test('if received is a Left with the expected value', () => {
    expect(left('Left')).not.toStrictEqualRight('Left');
  });
});

describe('.not.toStrictEqualRight should fail', () => {
  test('if received is a Right that equals the expected value', () => {
    expect(() => expect(right('right')).not.toStrictEqualRight('right')).toThrowError();
  });
});
