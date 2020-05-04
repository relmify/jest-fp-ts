import { left, right } from 'fp-ts/lib/Either';
import matchers from '../index';

expect.extend(matchers);

describe('.toSubsetEqualLeft should pass', () => {
  test('if the received is a Left with a subset of properties that match the expected value', () => {
    expect(left({ orderId: '123', orderNumber: 100 })).toSubsetEqualLeft({ orderNumber: 100 });
  });
  test('if the received is a Left with the expected value', () => {
    expect(left('Left')).toSubsetEqualLeft('Left');
  });
  test('if received is a Left with an undefined expected value', () => {
    expect(left(undefined)).toSubsetEqualLeft(undefined);
  });
  test('if received is a Left with a null expected value', () => {
    expect(left(null)).toSubsetEqualLeft(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(left('People who are truly strong lift others up.')).toEqual(
      expect.toSubsetEqualLeft('People who are truly strong lift others up.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(left('People who are truly powerful bring others together.')).toSubsetEqualLeft(
      expect.stringContaining('powerful'),
    );
  });
});

describe('.toSubsetEqualLeft should fail', () => {
  test('if the received is a Left that does not contain all of the expected properties', () => {
    expect(() =>
      expect(left({ orderNumber: 100 })).toSubsetEqualLeft({ orderId: '123', orderNumber: 100 }),
    ).toThrowError();
  });
  test('if the received is a Left with an array of objects that does not contain all of the expected objects', () => {
    expect(() =>
      expect(left([{ a: 'a' }, { b: 'b' }])).toSubsetEqualLeft([
        { a: 'a' },
        { b: 'b' },
        { c: 'c' },
      ]),
    ).toThrowError();
  });
  test('if the received is a Left with an array of objects that contains more than the expected objects', () => {
    expect(() =>
      expect(left([{ a: 'a' }, { b: 'b' }, { c: 'c' }])).toSubsetEqualLeft([
        { a: 'a' },
        { b: 'b' },
      ]),
    ).toThrowError();
  });
  test('if received is a Right', () => {
    expect(() => expect(right('left')).toSubsetEqualLeft('left')).toThrowError();
  });
  test('if received is a Left that does not equal the expected value', () => {
    expect(() => expect(left('another left')).toSubsetEqualLeft('left')).toThrowError();
  });
});

describe('.not.toSubsetEqualLeft should pass', () => {
  test('if received is a Left that does not equal the expected value', () => {
    expect(left('Left')).not.toSubsetEqualLeft('A different value');
  });
  test('if received is a Right', () => {
    expect(right('Right')).not.toSubsetEqualLeft('Hello');
  });
});

describe('.not.toSubsetEqualLeft should fail', () => {
  test('if received is a Left that equals the expected value', () => {
    expect(() => expect(left('left')).not.toSubsetEqualLeft('left')).toThrowError();
  });
});
