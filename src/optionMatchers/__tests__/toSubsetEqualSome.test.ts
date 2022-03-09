import { some, none } from 'fp-ts/lib/Option';
import { toSubsetEqualSome } from '../../index';

expect.extend({ toSubsetEqualSome });

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
    expect(some('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
      expect.toSubsetEqualSome('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(some('You affect the world by what you browse.')).toSubsetEqualSome(
      expect.stringContaining('world'),
    );
  });
});

describe('.toSubsetEqualSome should fail', () => {
  test('if the received is a Some that does not contain all of the expected properties', () => {
    expect(() =>
      expect(some({ orderNumber: 100 })).toSubsetEqualSome({ orderId: '123', orderNumber: 100 }),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualSome(expectedSome)

      - Expected Some  - 1
      + Received Some  + 0

        Object {
      -   "orderId": "123",
          "orderNumber": 100,
        }
    `);
  });
  test('if the received is a Some with an array of objects that does not contain all of the expected objects', () => {
    expect(() =>
      expect(some([{ a: 'a' }, { b: 'b' }])).toSubsetEqualSome([
        { a: 'a' },
        { b: 'b' },
        { c: 'c' },
      ]),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualSome(expectedSome)

      - Expected Some  - 3
      + Received Some  + 0

        Array [
          Object {
            "a": "a",
          },
          Object {
            "b": "b",
          },
      -   Object {
      -     "c": "c",
      -   },
        ]
    `);
  });
  test('if the received is a Some with an array of objects that contains more than the expected objects', () => {
    expect(() =>
      expect(some([{ a: 'a' }, { b: 'b' }, { c: 'c' }])).toSubsetEqualSome([
        { a: 'a' },
        { b: 'b' },
      ]),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualSome(expectedSome)

      - Expected Some  - 0
      + Received Some  + 3

        Array [
          Object {
            "a": "a",
          },
          Object {
            "b": "b",
          },
      +   Object {
      +     "c": "c",
      +   },
        ]
    `);
  });
  test('if received is a None', () => {
    expect(() => expect(none).toSubsetEqualSome('Some')).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualSome(expectedSome)

      Expected Some: "Some"
      Received None
    `);
  });
  test('if received is a Some that does not equal the expected value', () => {
    expect(() => expect(some('another Some')).toSubsetEqualSome('Some'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualSome(expectedSome)

      Expected Some: "Some"
      Received Some: "another Some"
    `);
  });
  test('if received is a Some with a number value that does not equal the expected value', () => {
    expect(() => expect(some(1)).toSubsetEqualSome(2)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualSome(expectedSome)

      Expected Some: 2
      Received Some: 1
    `);
  });
  test('if received is not an Option value', () => {
    expect(() => expect(1).toSubsetEqualSome(expect.anything()))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualSome(expectedSome)

      Received value is not an Option.
      Expected Some: Anything
      Received: 1
    `);
  });
});

describe('.not.toSubsetEqualSome should pass', () => {
  test('if received is a Some that does not have the expected value', () => {
    expect(some('Some')).not.toSubsetEqualSome('A different value');
  });
  test('if received is a None', () => {
    expect(none).not.toSubsetEqualSome('None');
  });
  test('if received is not an Option value', () => {
    expect(1).not.toSubsetEqualSome(expect.any(Number));
  });
});

describe('.not.toSubsetEqualSome should fail', () => {
  test('if received is a Some that equals the expected value', () => {
    expect(() => expect(some('Some')).not.toSubsetEqualSome('Some'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toSubsetEqualSome(expectedSome)

      Expected Some: not "Some"
    `);
  });
});
