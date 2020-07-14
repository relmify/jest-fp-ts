import { some, none } from 'fp-ts/lib/Option';
import { matchers } from '../index';

expect.extend(matchers);

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toStrictEqualSome should pass', () => {
  test('if received is a Some with the expected value', () => {
    expect(some('Some')).toStrictEqualSome('Some');
  });
  test('if received is a Some with an undefined expected value', () => {
    expect(some(undefined)).toStrictEqualSome(undefined);
  });
  test('if the received is a Some with a null expected value', () => {
    expect(some(null)).toStrictEqualSome(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(some('People who are truly strong lift others up.')).toEqual(
      expect.toStrictEqualSome('People who are truly strong lift others up.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(some('People who are truly powerful bring others together.')).toStrictEqualSome(
      expect.stringContaining('powerful'),
    );
  });
});

describe('.toStrictEqualSome should fail', () => {
  test('if received is a None', () => {
    expect(() => expect(none).toStrictEqualSome('Some')).toThrowError();
  });
  test('if received is a Some that does not equal the expected value', () => {
    expect(() => expect(some('another Some')).toStrictEqualSome('Some')).toThrowError();
  });
  test('if received is a Some that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(some([1, undefined, 3])).toStrictEqualSome([1, , 3])).toThrowError();
  });
  test('if received is a Some that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(some({ message: 'Does not compute!' })).toStrictEqualSome(
        new Message('Does not compute!'),
      ),
    ).toThrowError();
  });
});

describe('.not.toStrictEqualSome should pass', () => {
  test('if received is a Some that does not have the expected value', () => {
    expect(some('Some')).not.toStrictEqualSome('A different value');
  });
  test('if received is a None', () => {
    expect(none).not.toStrictEqualSome('None');
  });
});

describe('.not.toStrictEqualSome should fail', () => {
  test('if received is a Some that equals the expected value', () => {
    expect(() => expect(some('Some')).not.toStrictEqualSome('Some')).toThrowError();
  });
});
