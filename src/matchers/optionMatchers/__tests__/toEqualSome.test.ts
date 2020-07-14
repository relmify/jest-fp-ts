import { some, none } from 'fp-ts/lib/Option';
import { matchers } from '../index';

expect.extend(matchers);

describe('.toEqualSome should pass', () => {
  test('if received is a Some with the expected value', () => {
    expect(some('Some')).toEqualSome('Some');
  });
  test('if received is a Some with an undefined expected value', () => {
    expect(some(undefined)).toEqualSome(undefined);
  });
  test('if the received is a Some with a null expected value', () => {
    expect(some(null)).toEqualSome(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(some('People who are truly strong lift others up.')).toEqual(
      expect.toEqualSome('People who are truly strong lift others up.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(some('People who are truly powerful bring others together.')).toEqualSome(
      expect.stringContaining('powerful'),
    );
  });
});

describe('.toEqualSome should fail', () => {
  test('if received is a None', () => {
    expect(() => expect(none).toEqualSome('Some')).toThrowError();
  });
  test('if received is a Some that does not equal the expected value', () => {
    expect(() => expect(some('another Some')).toEqualSome('Some')).toThrowError();
  });
});

describe('.not.toEqualSome should pass', () => {
  test('if received is a Some that does not have the expected value', () => {
    expect(some('Some')).not.toEqualSome('A different value');
  });
  test('if received is a None', () => {
    expect(none).not.toEqualSome('Some');
  });
});

describe('.not.toEqualSome should fail', () => {
  test('if received is a Some that equals the expected value', () => {
    expect(() => expect(some('Some')).not.toEqualSome('Some')).toThrowError();
  });
});
