import { left, right, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { toEqualBoth } from '../../../index';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toEqualBoth });

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toEqualBoth should pass', () => {
  test('if the received is a Both with the expected value', () => {
    expect(both('Left', 'Right')).toEqualBoth('Left', 'Right');
  });
  test('if received is a Both with undefined expected values', () => {
    expect(both(undefined, undefined)).toEqualBoth(undefined, undefined);
  });
  test('if called as an asymmetric matcher', () => {
    expect(
      both('Any sufficiently advanced technology is equivalent to magic.', 'Arthur C. Clarke'),
    ).toEqual(
      expect.toEqualBoth(
        'Any sufficiently advanced technology is equivalent to magic.',
        'Arthur C. Clarke',
      ),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(both('You affect the world by what you browse.', 'Tim Berners-Lee')).toEqualBoth(
      expect.stringContaining('world'),
      expect.stringContaining('Tim'),
    );
  });
  test('if received is a Both that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(both([1, undefined, 3], [undefined, 2])).toEqualBoth([1, , 3], [, 2]));
  });
  test('if received is a Both whose values do not strictly equal the expected class instances', () => {
    expect(() =>
      expect(both({ message: 'Does not compute!' }, { message: 'All clear' })).toEqualBoth(
        new Message('Does not compute!'),
        new Message('All clear'),
      ),
    );
  });
});

describe('.toEqualBoth should fail', () => {
  test('if received is a Both that does not equal the expected value', () => {
    expect(() => expect(both({ a: 1 }, { b: 2 })).toEqualBoth({ a: 2 }, { b: 2 }))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualBoth(expectedLeft, expectedRight)

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
  test('if received is a Both that does not match the expected asymmetric matcher', () => {
    expect(() =>
      expect(both({ a: 1 }, { b: 2 })).toEqualBoth(expect.any(Object), expect.any(String)),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: Any<Object>
      Right: Any<String>

      Difference from Right:
      Expected: Any<String>
      Received: {"b": 2}
    `);
  });
  test('if received is a Left', () => {
    expect(() => expect(left('received left')).toEqualBoth('expected left', 'expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: "expected left"
      Right: "expected right"

      Received Left: "received left"
    `);
  });
  test('if received is a Right', () => {
    expect(() => expect(right('received right')).toEqualBoth('expected left', 'expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualBoth(expectedLeft, expectedRight)

      Expected Both:
      Left: "expected left"
      Right: "expected right"

      Received Right: "received right"
    `);
  });
});

describe('.toEqualBoth should fail and indicate not a These', () => {
  test('if received is a Some', () => {
    expect(() => expect(some(1)).toEqualBoth(1, 1)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualBoth(expectedLeft, expectedRight)

      Received value is not a These.
      Expected Both:
        Left: 1
        Right: 1
      Received: {"_tag": "Some", "value": 1}
    `);
  });
  test('if received is undefined', () => {
    expect(() => expect(undefined).toEqualBoth(1, 2)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualBoth(expectedLeft, expectedRight)

      Received value is not a These.
      Expected Both:
        Left: 1
        Right: 2
      Received: undefined
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(200).toEqualBoth(404, 200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualBoth(expectedLeft, expectedRight)

      Received value is not a These.
      Expected Both:
        Left: 404
        Right: 200
      Received: 200
    `);
  });
});

describe('.not.toEqualBoth should pass', () => {
  test('if received is a Both that does not equal the expected value', () => {
    expect(both('Left', 'Right')).not.toEqualBoth('A different left', 'A different right');
  });
  test('if received is a Left', () => {
    expect(left('Left')).not.toEqualBoth('Left', 'Left');
  });
  test('if received is a Right', () => {
    expect(right('Hello')).not.toEqualBoth('Hello', 'again');
  });
  test('if received is null', () => {
    expect(null).not.toEqualBoth(null, null);
  });
  test('if received is a None', () => {
    expect(none).not.toEqualBoth(none, none);
  });
});

describe('.not.toEqualLeft should fail', () => {
  test('if received is a Both that equals the expected value', () => {
    expect(() => expect(both('a', 'b')).not.toEqualBoth('a', 'b'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toEqualBoth(expectedBoth)

      Expected Both: not 
        Left: "a"  Right: "b"
    `);
  });
});
