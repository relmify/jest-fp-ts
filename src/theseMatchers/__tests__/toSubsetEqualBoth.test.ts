import { left, right, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { toSubsetEqualBoth } from '../../index';
import { stripAnsi } from '../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toSubsetEqualBoth });

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toSubsetEqualBoth should pass', () => {
  test('if the received is a Both with the expected value', () => {
    expect(both('Left', 'Right')).toSubsetEqualBoth('Left', 'Right');
  });
  test('if received is a Both with undefined expected values', () => {
    expect(both(undefined, undefined)).toSubsetEqualBoth(undefined, undefined);
  });
  test('if called as an asymmetric matcher', () => {
    expect(
      both('Any sufficiently advanced technology is equivalent to magic.', 'Arthur C. Clarke'),
    ).toEqual(
      expect.toSubsetEqualBoth(
        'Any sufficiently advanced technology is equivalent to magic.',
        'Arthur C. Clarke',
      ),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(both('You affect the world by what you browse.', 'Tim Berners-Lee')).toSubsetEqualBoth(
      expect.stringContaining('world'),
      expect.any(String),
    );
  });
  test('if received is a Both that does not strictly equal the expected sparse array', () => {
    expect(() =>
      // eslint-disable-next-line no-sparse-arrays
      expect(both([1, undefined, 3], [undefined, 2])).toSubsetEqualBoth([1, , 3], [, 2]),
    );
  });
  test('if received is a Both whose values do not strictly equal the expected class instances', () => {
    expect(() =>
      expect(both({ message: 'Does not compute!' }, { message: 'All clear' })).toSubsetEqualBoth(
        new Message('Does not compute!'),
        new Message('All clear'),
      ),
    );
  });
});

describe('.toSubsetEqualBoth should fail', () => {
  test('if received is a Both that does not equal the expected value', () => {
    expect(() => expect(both({ a: 1 }, { b: 2 })).toSubsetEqualBoth({ a: 2 }, { b: 2 }))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: {"a": 2}
      Right: {"b": 2}

      Difference from Left:
      - Expected  - 1
      + Received  + 1

        Object {
      -   "a": 2,
      +   "a": 1,
        }
    `);
  });
  test('if the received is a both that does not contain all of the expected properties', () => {
    expect(() =>
      expect(both({ orderNumber: 100 }, 1)).toSubsetEqualBoth(
        {
          orderId: '123',
          orderNumber: 100,
        },

        1,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: {"orderId": "123", "orderNumber": 100}
      Right: 1

      Difference from Left:
      - Expected  - 1
      + Received  + 0

        Object {
      -   "orderId": "123",
          "orderNumber": 100,
        }
    `);
  });
  test('if the received is a Both with an array of objects that does not contain all of the expected objects', () => {
    expect(() =>
      expect(both([{ a: 'a' }, { b: 'b' }], [{ d: 'd' }])).toSubsetEqualBoth(
        [{ a: 'a' }, { b: 'b' }, { c: 'c' }],
        [{ e: 'e' }],
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: [{"a": "a"}, {"b": "b"}, {"c": "c"}]
      Right: [{"e": "e"}]

      Difference from Left:
      - Expected  - 3
      + Received  + 0

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

      Difference from Right:
      - Expected  - 1
      + Received  + 1

        Array [
          Object {
      -     "e": "e",
      +     "d": "d",
          },
        ]
    `);
  });
  test('if the received is a Both with an array of objects that contains more than the expected objects', () => {
    expect(() =>
      expect(
        both([{ num: 1 }, { num: 2 }, { num: 3 }], [{ str: 'a' }, { str: 'b' }]),
      ).toSubsetEqualBoth([{ num: 1 }, { num: 2 }], [{ str: 'a' }, { str: 'b' }]),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: [{"num": 1}, {"num": 2}]
      Right: [{"str": "a"}, {"str": "b"}]

      Difference from Left:
      - Expected  - 0
      + Received  + 3

        Array [
          Object {
            "num": 1,
          },
          Object {
            "num": 2,
          },
      +   Object {
      +     "num": 3,
      +   },
        ]
    `);
  });
  test('if received is a Left', () => {
    expect(() => expect(left('received left')).toSubsetEqualBoth('expected left', 'expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: "expected left"
      Right: "expected right"

      Received Left: "received left"
    `);
  });
  test('if received is a Right', () => {
    expect(() =>
      expect(right('received right')).toSubsetEqualBoth('expected left', 'expected right'),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: "expected left"
      Right: "expected right"

      Received Right: "received right"
    `);
  });
});

describe('.toSubsetEqualBoth should fail and indicate not a These', () => {
  test('if received is undefined', () => {
    expect(() => expect(undefined).toSubsetEqualBoth(1, 2)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualBoth(expectedLeft, expectedRight)

      Received value is not a These.
      Expected Both:
        Left: 1
        Right: 2
      Received: undefined
    `);
  });
  test('if received is a Some', () => {
    expect(() => expect(some(1)).toSubsetEqualBoth(1, 1)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualBoth(expectedLeft, expectedRight)

      Received value is not a These.
      Expected Both:
        Left: 1
        Right: 1
      Received: {"_tag": "Some", "value": 1}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(200).toSubsetEqualBoth(404, 200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toSubsetEqualBoth(expectedLeft, expectedRight)

      Received value is not a These.
      Expected Both:
        Left: 404
        Right: 200
      Received: 200
    `);
  });
});

describe('.not.toSubsetEqualBoth should pass', () => {
  test('if received is a Both that does not equal the expected value', () => {
    expect(both('Left', 'Right')).not.toSubsetEqualBoth('A different left', 'A different right');
  });
  test('if received is a Left', () => {
    expect(left('Left')).not.toSubsetEqualBoth('Left', 'Left');
  });
  test('if received is a Right', () => {
    expect(right('Hello')).not.toSubsetEqualBoth('Hello', 'again');
  });
  test('if received is null', () => {
    expect(null).not.toSubsetEqualBoth(null, null);
  });
  test('if received is a None', () => {
    expect(none).not.toSubsetEqualBoth(none, none);
  });
});

describe('.not.toEqualLeft should fail', () => {
  test('if received is a Both that strictly equals the expected value', () => {
    expect(() => expect(both('a', 'b')).not.toSubsetEqualBoth('a', 'b'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toSubsetEqualBoth(expectedBoth)

      Expected Both: not 
        Left: "a"
        Right: "b"
    `);
  });
});
