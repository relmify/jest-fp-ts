import { left as leftEither, right as rightEither } from 'fp-ts/lib/Either';
import { left as leftThese, right as rightThese, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { matchers } from '../index';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend(matchers);

describe('.toSubsetEqualLeft should pass', () => {
  test('if the received is a Left with a subset of properties that match the expected value', () => {
    expect(leftEither({ orderId: '123', orderNumber: 100 })).toSubsetEqualLeft({
      orderNumber: 100,
    });
  });
  test('if the received is a Left with the expected value', () => {
    expect(leftThese(42)).toSubsetEqualLeft(42);
  });
  test('if received is a Left with an undefined expected value', () => {
    expect(leftEither(undefined)).toSubsetEqualLeft(undefined);
  });
  test('if received is a Left with a null expected value', () => {
    expect(leftThese(null)).toSubsetEqualLeft(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(leftEither('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
      expect.toSubsetEqualLeft('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(leftThese('You affect the world by what you browse.')).toSubsetEqualLeft(
      expect.stringContaining('world'),
    );
  });
});

describe('.toSubsetEqualLeft should fail', () => {
  test('if the received is a Left that does not contain all of the expected properties', () => {
    expect(() =>
      expect(leftEither({ orderNumber: 100 })).toSubsetEqualLeft({
        orderId: '123',
        orderNumber: 100,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Difference from Left:

      - Expected
      + Received

        Object {
      -   "orderId": "123",
          "orderNumber": 100,
        }
    `);
  });
  test('if the received is a Left with an array of objects that does not contain all of the expected objects', () => {
    expect(() =>
      expect(leftThese([{ a: 'a' }, { b: 'b' }])).toSubsetEqualLeft([
        { a: 'a' },
        { b: 'b' },
        { c: 'c' },
      ]),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Difference from Left:

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
  test('if the received is a Left with an array of objects that contains more than the expected objects', () => {
    expect(() =>
      expect(leftEither([{ a: 'a' }, { b: 'b' }, { c: 'c' }])).toSubsetEqualLeft([
        { a: 'a' },
        { b: 'b' },
      ]),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Difference from Left:

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
  test('if received is a Right', () => {
    expect(() => expect(rightEither('left')).toSubsetEqualLeft('left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Expected Left: "left"
      Received Right: "left"
    `);
  });
  test('if received is a Left that does not equal the expected value', () => {
    expect(() => expect(leftThese('another left')).toSubsetEqualLeft('left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Difference from Left:

      - Expected
      + Received

      - left
      + another left
    `);
  });
});

describe('.toSubsetEqualLeft should fail and include the expected and received values', () => {
  test('if the received is a Left that does not contain all of the expected properties', () => {
    expect(() =>
      expect(leftEither({ orderNumber: 100 })).toSubsetEqualLeft({
        orderId: '123',
        orderNumber: 100,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Difference from Left:

      - Expected
      + Received

        Object {
      -   "orderId": "123",
          "orderNumber": 100,
        }
    `);
  });
  test('if received is a Left that does not equal the expected value', () => {
    expect(() => expect(leftThese('received left')).toSubsetEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Difference from Left:

      - Expected
      + Received

      - expected left
      + received left
    `);
  });
  test('if received is a Right', () => {
    expect(() => expect(rightEither(200)).toSubsetEqualLeft(null))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Expected Left: null
      Received Right: 200
    `);
  });
  test('if received is a Both', () => {
    expect(() => expect(both('a', 'b')).toSubsetEqualLeft(undefined))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Expected Left: undefined
      Received Both:
        Left: "a"
        Right: "b"
    `);
  });
  test('if received is not an Either or These', () => {
    expect(() => expect(null).toSubsetEqualLeft(42)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: 42
      Received: null
    `);
  });
  // special case where jest diff returns an empty string
  test('if received is a Left with a number that does not equal the expected number', () => {
    expect(() => expect(leftEither(1)).toSubsetEqualLeft(2)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Expected Left: 2
      Received Left: 1
    `);
  });
});

describe('.toSubsetEqualLeft should fail and indicate not an Either or These', () => {
  test('if received is a Some', () => {
    expect(() => expect(some('my some')).toSubsetEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: "expected left"
      Received: {"_tag": "Some", "value": "my some"}
    `);
  });
  test('if received is a None', () => {
    expect(() => expect(none).toSubsetEqualLeft(none)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: {"_tag": "None"}
      Received: {"_tag": "None"}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(200).toSubsetEqualLeft(200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: 200
      Received: 200
    `);
  });
  test('if received is null', () => {
    expect(() => expect(null).toSubsetEqualLeft(null)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: null
      Received: null
    `);
  });
  test('if received is undefined', () => {
    expect(() => expect(undefined).toSubsetEqualLeft(undefined))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: undefined
      Received: undefined
    `);
  });
});

describe('.not.toSubsetEqualLeft should pass', () => {
  test('if received is a Left that does not equal the expected value', () => {
    expect(leftEither('Left')).not.toSubsetEqualLeft('A different value');
  });
  test('if received is a Left that does not subset equal the expected value', () => {
    expect(leftEither({ a: 1 })).not.toSubsetEqualLeft({ a: 1, b: expect.any(Number) });
  });
  test('if received is a Right with the expected value', () => {
    expect(rightThese('Right')).not.toSubsetEqualLeft('Right');
  });
});

describe('.not.toSubsetEqualLeft should fail', () => {
  test('if received is a Left that equals the expected value', () => {
    expect(() => expect(leftThese({ a: 1 })).not.toSubsetEqualLeft({ a: 1 }))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toSubsetEqualLeft(expectedLeft)

      Expected Left: not {"a": 1}
    `);
  });
  test('if received is a Left that subset equals the expected value', () => {
    expect(() => expect(leftThese({ a: 1, b: 2 })).not.toSubsetEqualLeft({ a: 1 }))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toSubsetEqualLeft(expectedLeft)

      Expected Left: not {"a": 1}
      Received Left:     {"a": 1, "b": 2}
    `);
  });
});
