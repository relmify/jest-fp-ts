import { left as leftEither, right as rightEither } from 'fp-ts/lib/Either';
import { left as leftThese, right as rightThese, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { matchers } from '../index';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend(matchers);

describe('.toSubsetEqualRight should pass', () => {
  test('if the received is a Right with a subset of properties that match the expected value', () => {
    expect(rightEither({ orderId: '123', orderNumber: 100 })).toSubsetEqualRight({
      orderNumber: 100,
    });
  });
  test('if the received is a Right with the expected value', () => {
    expect(rightThese(42)).toSubsetEqualRight(42);
  });
  test('if received is a Right with an undefined expected value', () => {
    expect(rightEither(undefined)).toSubsetEqualRight(undefined);
  });
  test('if received is a Right with a null expected value', () => {
    expect(rightThese(null)).toSubsetEqualRight(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(rightEither('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
      expect.toSubsetEqualRight('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(rightThese('You affect the world by what you browse.')).toSubsetEqualRight(
      expect.stringContaining('world'),
    );
  });
});

describe('.toSubsetEqualRight should fail', () => {
  test('if the received is a Right that does not contain all of the expected properties', () => {
    expect(() =>
      expect(rightEither({ orderNumber: 100 })).toSubsetEqualRight({
        orderId: '123',
        orderNumber: 100,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Difference from Right:

      - Expected
      + Received

        Object {
      -   "orderId": "123",
          "orderNumber": 100,
        }
    `);
  });
  test('if the received is a Right with an array of objects that does not contain all of the expected objects', () => {
    expect(() =>
      expect(rightThese([{ a: 'a' }, { b: 'b' }])).toSubsetEqualRight([
        { a: 'a' },
        { b: 'b' },
        { c: 'c' },
      ]),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Difference from Right:

      - Expected
      + Received

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
  test('if the received is a Right with an array of objects that contains more than the expected objects', () => {
    expect(() =>
      expect(rightEither([{ a: 'a' }, { b: 'b' }, { c: 'c' }])).toSubsetEqualRight([
        { a: 'a' },
        { b: 'b' },
      ]),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Difference from Right:

      - Expected
      + Received

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
  test('if received is a Left', () => {
    expect(() => expect(leftEither('right')).toSubsetEqualRight('right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Expected Right: "right"
      Received Left: "right"
    `);
  });
  test('if received is a Right that does not equal the expected value', () => {
    expect(() => expect(rightThese('another right')).toSubsetEqualRight('right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Difference from Right:

      - Expected
      + Received

      - right
      + another right
    `);
  });
});

describe('.toSubsetEqualRight should fail and include the expected and received values', () => {
  test('if the received is a Right that does not contain all of the expected properties', () => {
    expect(() =>
      expect(rightEither({ orderNumber: 100 })).toSubsetEqualRight({
        orderId: '123',
        orderNumber: 100,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Difference from Right:

      - Expected
      + Received

        Object {
      -   "orderId": "123",
          "orderNumber": 100,
        }
    `);
  });
  test('if received is a Right that does not equal the expected value', () => {
    expect(() => expect(rightThese('received right')).toSubsetEqualRight('expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Difference from Right:

      - Expected
      + Received

      - expected right
      + received right
    `);
  });
  test('if received is a Left', () => {
    expect(() => expect(leftEither(200)).toSubsetEqualRight(null))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Expected Right: null
      Received Left: 200
    `);
  });
  test('if received is a Both', () => {
    expect(() => expect(both('a', 'b')).toSubsetEqualRight(undefined))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Expected Right: undefined
      Received Both:
        Left: "a"
        Right: "b"
    `);
  });
  test('if received is not an Either or These', () => {
    expect(() => expect(null).toSubsetEqualRight(42)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: 42
      Received: null
    `);
  });
  // special case where jest diff returns an empty string
  test('if received is a Right with a number that does not equal the expected number', () => {
    expect(() => expect(rightEither(1)).toSubsetEqualRight(2)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Expected Right: 2
      Received Right: 1
    `);
  });
});

describe('.toSubsetEqualRight should fail and indicate not an Either or These', () => {
  test('if received is a Some', () => {
    expect(() => expect(some('my some')).toSubsetEqualRight('expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: "expected right"
      Received: {"_tag": "Some", "value": "my some"}
    `);
  });
  test('if received is a None', () => {
    expect(() => expect(none).toSubsetEqualRight(none)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: {"_tag": "None"}
      Received: {"_tag": "None"}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(200).toSubsetEqualRight(200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: 200
      Received: 200
    `);
  });
  test('if received is null', () => {
    expect(() => expect(null).toSubsetEqualRight(null)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: null
      Received: null
    `);
  });
  test('if received is undefined', () => {
    expect(() => expect(undefined).toSubsetEqualRight(undefined))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: undefined
      Received: undefined
    `);
  });
});

describe('.not.toSubsetEqualRight should pass', () => {
  test('if received is a Right that does not equal the expected value', () => {
    expect(rightEither('Right')).not.toSubsetEqualRight('A different value');
  });
  test('if received is a Right that does not subset equal the expected value', () => {
    expect(rightEither({ a: 1 })).not.toSubsetEqualRight({ a: 1, b: expect.anything });
  });
  test('if received is a Left with the expected value', () => {
    expect(leftThese('Left')).not.toSubsetEqualRight('Left');
  });
});

describe('.not.toSubsetEqualRight should fail', () => {
  test('if received is a Right that equals the expected value', () => {
    expect(() => expect(rightThese({ a: 1 })).not.toSubsetEqualRight({ a: 1 }))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toSubsetEqualRight(expectedRight)

      Expected Right: not {"a": 1}
    `);
  });
  test('if received is a Right that subset equals the expected value', () => {
    expect(() => expect(rightThese({ a: 1, b: 2 })).not.toSubsetEqualRight({ a: 1 }))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toSubsetEqualRight(expectedRight)

      Expected Right: not {"a": 1}
      Received Right:     {"a": 1, "b": 2}
    `);
  });
});
