import { left, right, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { toStrictEqualBoth } from '../../index';

expect.extend({ toStrictEqualBoth });

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toStrictEqualBoth should pass', () => {
  test('if the received is a Both with the expected value', () => {
    expect(both('Left', 'Right')).toStrictEqualBoth('Left', 'Right');
  });
  test('if received is a Both with undefined expected values', () => {
    expect(both(undefined, undefined)).toStrictEqualBoth(undefined, undefined);
  });
  test('if called as an asymmetric matcher', () => {
    expect(
      both('Any sufficiently advanced technology is equivalent to magic.', 'Arthur C. Clarke'),
    ).toEqual(
      expect.toStrictEqualBoth(
        'Any sufficiently advanced technology is equivalent to magic.',
        'Arthur C. Clarke',
      ),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(both('You affect the world by what you browse.', 'Tim Berners-Lee')).toStrictEqualBoth(
      expect.stringContaining('world'),
      expect.any(String),
    );
  });
});

describe('.toStrictEqualBoth should fail', () => {
  test('if received is a Both that does not equal the expected value', () => {
    expect(() => expect(both({ a: 1 }, { b: 2 })).toStrictEqualBoth({ a: 2 }, { b: 2 }))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualBoth(expectedLeft, expectedRight)

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
  test('if received is a Left', () => {
    expect(() => expect(left('received left')).toStrictEqualBoth('expected left', 'expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: "expected left"
      Right: "expected right"

      Received Left: "received left"
    `);
  });
  test('if received is a Right', () => {
    expect(() =>
      expect(right('received right')).toStrictEqualBoth('expected left', 'expected right'),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: "expected left"
      Right: "expected right"

      Received Right: "received right"
    `);
  });
  test('if received is a Both that does not strictly equal the expected sparse array', () => {
    expect(() =>
      // eslint-disable-next-line no-sparse-arrays
      expect(both([1, undefined, 3], [undefined, 2])).toStrictEqualBoth([1, , 3], [, 2]),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: [1, , 3]
      Right: [, 2]

      Difference from Left:
      Expected: [1, , 3]
      Received: [1, undefined, 3]

      Difference from Right:
      Expected: [, 2]
      Received: [undefined, 2]
    `);
  });
  test('if received is a Both whose values do not strictly equal the expected class instances', () => {
    expect(() =>
      expect(both({ message: 'Does not compute!' }, { message: 'All clear' })).toStrictEqualBoth(
        new Message('Does not compute!'),
        new Message('All clear'),
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: {"message": "Does not compute!"}
      Right: {"message": "All clear"}

      Difference from Left:
      - Expected  - 1
      + Received  + 1

      - Message {
      + Object {
          "message": "Does not compute!",
        }

      Difference from Right:
      - Expected  - 1
      + Received  + 1

      - Message {
      + Object {
          "message": "All clear",
        }
    `);
  });
});

describe('.toStrictEqualBoth should fail and indicate not a These', () => {
  test('if received is undefined', () => {
    expect(() => expect(undefined).toStrictEqualBoth(1, 2)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualBoth(expectedLeft, expectedRight)

      Received value is not a These.
      Expected Both:
        Left: 1
        Right: 2
      Received: undefined
    `);
  });
  test('if received is a Some', () => {
    expect(() => expect(some(1)).toStrictEqualBoth(1, 1)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualBoth(expectedLeft, expectedRight)

      Received value is not a These.
      Expected Both:
        Left: 1
        Right: 1
      Received: {"_tag": "Some", "value": 1}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(200).toStrictEqualBoth(404, 200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualBoth(expectedLeft, expectedRight)

      Received value is not a These.
      Expected Both:
        Left: 404
        Right: 200
      Received: 200
    `);
  });
});

describe('.not.toStrictEqualBoth should pass', () => {
  test('if received is a Both that does not equal the expected value', () => {
    expect(both('Left', 'Right')).not.toStrictEqualBoth('A different left', 'A different right');
  });
  test('if received is a Left', () => {
    expect(left('Left')).not.toStrictEqualBoth('Left', 'Left');
  });
  test('if received is a Right', () => {
    expect(right('Hello')).not.toStrictEqualBoth('Hello', 'again');
  });
  test('if received is null', () => {
    expect(null).not.toStrictEqualBoth(null, null);
  });
  test('if received is a None', () => {
    expect(none).not.toStrictEqualBoth(none, none);
  });
});

describe('.not.toEqualLeft should fail', () => {
  test('if received is a Both that strictly equals the expected value', () => {
    expect(() => expect(both('a', 'b')).not.toStrictEqualBoth('a', 'b'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toStrictEqualBoth(expectedBoth)

      Expected Both: not 
        Left: "a"
        Right: "b"
    `);
  });
});
