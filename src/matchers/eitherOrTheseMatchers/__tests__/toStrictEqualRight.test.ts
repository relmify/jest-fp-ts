import { left as leftEither, right as rightEither } from 'fp-ts/lib/Either';
import { left as leftThese, right as rightThese, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { matchers } from '../index';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend(matchers);

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toStrictEqualRight should pass', () => {
  test('if the received is a Right Either with the expected value', () => {
    expect(rightEither('Expected Right')).toStrictEqualRight('Expected Right');
  });
  test('if the received is a Right These with the expected value', () => {
    expect(rightThese(42)).toStrictEqualRight(42);
  });
  test('if received is a Right with an undefined expected value', () => {
    expect(rightEither(undefined)).toStrictEqualRight(undefined);
  });
  test('if received is a Right with a null expected value', () => {
    expect(rightThese(null)).toStrictEqualRight(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(rightEither('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
      expect.toStrictEqualRight('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(rightThese('You affect the world by what you browse.')).toStrictEqualRight(
      expect.stringContaining('world'),
    );
  });
});

describe('.toStrictEqualRight should fail and include the expected and received values', () => {
  test('if received is a Right that does not equal the expected value', () => {
    expect(() => expect(rightThese(404)).toStrictEqualRight(200))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Expected Right: 200
      Received Right: 404
    `);
  });
  test('if received is a Left', () => {
    expect(() => expect(leftEither('received left')).toStrictEqualRight('expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Expected Right: "expected right"
      Received Left: "received left"
    `);
  });
  test('if received is a Both', () => {
    expect(() =>
      expect(both('received left', 'received right')).toStrictEqualRight('expected right'),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Expected Right: "expected right"
      Received Both:
        Left: "received left"
        Right: "received right"
    `);
  });
});

describe('.toStrictEqualRight should fail and show the difference', () => {
  test('if received is a Right that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(rightEither({ message: 'Does not compute!' })).toStrictEqualRight(
        new Message('Does not compute!'),
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Difference from Right:

      - Expected
      + Received

      - Message {
      + Object {
          "message": "Does not compute!",
        }
    `);
  });
  test('if received is a Right sparse array that serializes to the same value as an expected non-sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(rightThese([1, , 3])).toStrictEqualRight([1, undefined, 3]))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Difference from Right:

      - Expected
      + Received

        Array [
          1,
      -   undefined,
      +   ,
          3,
        ]
    `);
  });
  test('if received is a Right non-sparse array that serializes to the same value as an expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(rightThese([1, undefined, 3])).toStrictEqualRight([1, , 3]))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Difference from Right:

      - Expected
      + Received

        Array [
          1,
      -   ,
      +   undefined,
          3,
        ]
    `);
  });
});

describe('.toStrictEqualRight should fail and indicate not an Either or These', () => {
  test('if received is a Some', () => {
    expect(() => expect(some('my some')).toStrictEqualRight('expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: "expected right"
      Received: {"_tag": "Some", "value": "my some"}
    `);
  });
  test('if received is a None', () => {
    expect(() => expect(none).toStrictEqualRight(none)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: {"_tag": "None"}
      Received: {"_tag": "None"}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(200).toStrictEqualRight(200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: 200
      Received: 200
    `);
  });
  test('if received is null', () => {
    expect(() => expect(null).toStrictEqualRight(null)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: null
      Received: null
    `);
  });
  test('if received is undefined', () => {
    expect(() => expect(undefined).toStrictEqualRight(undefined))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: undefined
      Received: undefined
    `);
  });
});

describe('.not.toStrictEqualRight should pass', () => {
  test('if received is a Right that does not equal the expected value', () => {
    expect(rightEither('Right')).not.toStrictEqualRight('A different value');
  });
  test('if received is a Left', () => {
    expect(leftThese('Hello')).not.toStrictEqualRight('Hello');
  });
  test('if received is a Both', () => {
    expect(both('Right', 'Right')).not.toStrictEqualRight('Right');
  });
  test('if received is a Some', () => {
    expect(some('value')).not.toStrictEqualRight('value');
  });
  test('if received is a None', () => {
    expect(none).not.toStrictEqualRight(none);
  });
  test('if received is null', () => {
    expect(null).not.toStrictEqualRight(null);
  });
  test('if received is undefined', () => {
    expect(undefined).not.toStrictEqualRight(undefined);
  });
  test('if received is a Right that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(rightThese([1, undefined, 3])).not.toStrictEqualRight([1, , 3]));
  });
  test('if received is a Right that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(rightEither({ message: 'Does not compute!' })).not.toStrictEqualRight(
        new Message('Does not compute!'),
      ),
    );
  });
});

describe('.not.toStrictEqualRight should fail', () => {
  test('if received is a Right Either that equals the expected value', () => {
    expect(() => expect(rightEither('right')).not.toStrictEqualRight('right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toStrictEqualRight(expectedRight)

      Expected Right: not "right"
    `);
  });
  test('if received is a Right These that equals the expected value', () => {
    expect(() => expect(rightThese(200)).not.toStrictEqualRight(200))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toStrictEqualRight(expectedRight)

      Expected Right: not 200
    `);
  });
});
