import { left, right } from 'fp-ts/lib/Either';
import { matchers } from '../index';

expect.extend(matchers);

describe('.toSubsetEqualRight should pass', () => {
  test('if the received is a Right with a subset of properties that match the expected value', () => {
    expect(right({ orderId: '123', orderNumber: 100 })).toSubsetEqualRight({ orderNumber: 100 });
  });
  test('if received is a Right with the expected value', () => {
    expect(right('Right')).toSubsetEqualRight('Right');
  });
  test('if received is a Right with an undefined expected value', () => {
    expect(right(undefined)).toSubsetEqualRight(undefined);
  });
  test('if the received is a Right with a null expected value', () => {
    expect(right(null)).toSubsetEqualRight(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(right('People who are truly strong lift others up.')).toEqual(
      expect.toSubsetEqualRight('People who are truly strong lift others up.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(right('People who are truly powerful bring others together.')).toSubsetEqualRight(
      expect.stringContaining('powerful'),
    );
  });
});

describe('.toSubsetEqualRight should fail', () => {
  test('if the received is a Right that does not contain all of the expected properties', () => {
    expect(() =>
      expect(right({ orderNumber: 100 })).toSubsetEqualRight({ orderId: '123', orderNumber: 100 }),
    ).toThrowError();
  });
  test('if the received is a Right with an array of objects that does not contain all of the expected objects', () => {
    expect(() =>
      expect(right([{ a: 'a' }, { b: 'b' }])).toSubsetEqualRight([
        { a: 'a' },
        { b: 'b' },
        { c: 'c' },
      ]),
    ).toThrowError();
  });
  test('if the received is a Right with an array of objects that contains more than the expected objects', () => {
    expect(() =>
      expect(right([{ a: 'a' }, { b: 'b' }, { c: 'c' }])).toSubsetEqualRight([
        { a: 'a' },
        { b: 'b' },
      ]),
    ).toThrowError();
  });
  test('if received is a Left', () => {
    expect(() => expect(left('right')).toSubsetEqualRight('right')).toThrowError();
  });
  test('if received is a Right that does not equal the expected value', () => {
    expect(() => expect(right('another right')).toSubsetEqualRight('right')).toThrowError();
  });
});

describe('.not.toSubsetEqualRight should pass', () => {
  test('if received is a Right that does not have the expected value', () => {
    expect(right('Right')).not.toSubsetEqualRight('A different value');
  });
  test('if received is a Left with the expected value', () => {
    expect(left('Left')).not.toSubsetEqualRight('Left');
  });
});

describe('.not.toSubsetEqualRight should fail', () => {
  test('if received is a Right that equals the expected value', () => {
    expect(() => expect(right('right')).not.toSubsetEqualRight('right')).toThrowError();
  });
});
