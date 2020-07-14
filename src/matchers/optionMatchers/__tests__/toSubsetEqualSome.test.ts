import { some, none } from 'fp-ts/lib/Option';
import { matchers } from '../index';

expect.extend(matchers);

describe('.toSubsetEqualSome should pass', () => {
  test('if the received is a Some with a subset of properties that match the expected value', () => {
    expect(some({ orderId: '123', orderNumber: 100 })).toSubsetEqualSome({ orderNumber: 100 });
  });
  test('if received is a Some with the expected value', () => {
    expect(some('Some')).toSubsetEqualSome('Some');
  });
  test('if received is a Some with an undefined expected value', () => {
    expect(some(undefined)).toSubsetEqualSome(undefined);
  });
  test('if the received is a Some with a null expected value', () => {
    expect(some(null)).toSubsetEqualSome(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(some('People who are truly strong lift others up.')).toEqual(
      expect.toSubsetEqualSome('People who are truly strong lift others up.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(some('People who are truly powerful bring others together.')).toSubsetEqualSome(
      expect.stringContaining('powerful'),
    );
  });
});

describe('.toSubsetEqualSome should fail', () => {
  test('if the received is a Some that does not contain all of the expected properties', () => {
    expect(() =>
      expect(some({ orderNumber: 100 })).toSubsetEqualSome({ orderId: '123', orderNumber: 100 }),
    ).toThrowError();
  });
  test('if the received is a Some with an array of objects that does not contain all of the expected objects', () => {
    expect(() =>
      expect(some([{ a: 'a' }, { b: 'b' }])).toSubsetEqualSome([
        { a: 'a' },
        { b: 'b' },
        { c: 'c' },
      ]),
    ).toThrowError();
  });
  test('if the received is a Some with an array of objects that contains more than the expected objects', () => {
    expect(() =>
      expect(some([{ a: 'a' }, { b: 'b' }, { c: 'c' }])).toSubsetEqualSome([
        { a: 'a' },
        { b: 'b' },
      ]),
    ).toThrowError();
  });
  test('if received is a None', () => {
    expect(() => expect(none).toSubsetEqualSome('Some')).toThrowError();
  });
  test('if received is a Some that does not equal the expected value', () => {
    expect(() => expect(some('another Some')).toSubsetEqualSome('Some')).toThrowError();
  });
});

describe('.not.toSubsetEqualSome should pass', () => {
  test('if received is a Some that does not have the expected value', () => {
    expect(some('Some')).not.toSubsetEqualSome('A different value');
  });
  test('if received is a None', () => {
    expect(none).not.toSubsetEqualSome('None');
  });
});

describe('.not.toSubsetEqualSome should fail', () => {
  test('if received is a Some that equals the expected value', () => {
    expect(() => expect(some('Some')).not.toSubsetEqualSome('Some')).toThrowError();
  });
});
