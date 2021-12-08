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

describe('.toStrictEqualLeft should pass', () => {
  test('if the received is a Left Either with the expected value', () => {
    expect(leftEither('Expected Left')).toStrictEqualLeft('Expected Left');
  });
  test('if the received is a Left These with the expected value', () => {
    expect(leftThese(42)).toStrictEqualLeft(42);
  });
  test('if received is a Left with an undefined expected value', () => {
    expect(leftEither(undefined)).toStrictEqualLeft(undefined);
  });
  test('if received is a Left with a null expected value', () => {
    expect(leftThese(null)).toStrictEqualLeft(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(leftEither('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
      expect.toStrictEqualLeft('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(leftThese('You affect the world by what you browse.')).toStrictEqualLeft(
      expect.stringContaining('world'),
    );
  });
});

describe('.toStrictEqualLeft should fail and include the expected and received values', () => {
  test('if received is a Left that does not equal the expected value', () => {
    expect(() => expect(leftThese(404)).toStrictEqualLeft(200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Expected Left: 200
      Received Left: 404
    `);
  });
  test('if received is a Right', () => {
    expect(() => expect(rightEither('received right')).toStrictEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Expected Left: "expected left"
      Received Right: "received right"
    `);
  });
  test('if received is a Both', () => {
    expect(() => expect(both('received left', 'received right')).toStrictEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Expected Left: "expected left"
      Received Both:
        Left: "received left"
        Right: "received right"
    `);
  });
  test('if received is null', () => {
    expect(() => expect(null).toStrictEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: "expected left"
      Received: null
    `);
  });
  test('if received is undefined', () => {
    expect(() => expect(undefined).toStrictEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: "expected left"
      Received: undefined
    `);
  });
});

describe('.toStrictEqualLeft should fail and show the difference', () => {
  test('if received is a Left that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(leftEither({ message: 'Does not compute!' })).toStrictEqualLeft(
        new Message('Does not compute!'),
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Difference from Left:

      - Expected
      + Received

      - Message {
      + Object {
          "message": "Does not compute!",
        }
    `);
  });
  test('if received is a Left sparse array that serializes to the same value as an expected non-sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(leftThese([1, , 3])).toStrictEqualLeft([1, undefined, 3]))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Difference from Left:

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
  test('if received is a Left non-sparse array that serializes to the same value as an expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(leftThese([1, undefined, 3])).toStrictEqualLeft([1, , 3]))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Difference from Left:

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

describe('.toStrictEqualLeft should fail and indicate not an Either or These', () => {
  test('if received is a Some', () => {
    expect(() => expect(some('my some')).toStrictEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: "expected left"
      Received: {"_tag": "Some", "value": "my some"}
    `);
  });
  test('if received is a None', () => {
    expect(() => expect(none).toStrictEqualLeft(none)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: {"_tag": "None"}
      Received: {"_tag": "None"}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(200).toStrictEqualLeft(200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: 200
      Received: 200
    `);
  });
  test('if received is null', () => {
    expect(() => expect(null).toStrictEqualLeft(null)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: null
      Received: null
    `);
  });
  test('if received is undefined', () => {
    expect(() => expect(undefined).toStrictEqualLeft(undefined))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: undefined
      Received: undefined
    `);
  });
});

describe('.not.toStrictEqualLeft should pass', () => {
  test('if received is a Left that does not equal the expected value', () => {
    expect(leftEither('Left')).not.toStrictEqualLeft('A different value');
  });
  test('if received is a Right', () => {
    expect(rightThese('Hello')).not.toStrictEqualLeft('Hello');
  });
  test('if received is a Both', () => {
    expect(both('Right', 'Right')).not.toStrictEqualLeft('Right');
  });
  test('if received is a Some', () => {
    expect(some('value')).not.toStrictEqualLeft('value');
  });
  test('if received is a None', () => {
    expect(none).not.toStrictEqualLeft(none);
  });
  test('if received is null', () => {
    expect(null).not.toStrictEqualLeft(null);
  });
  test('if received is undefined', () => {
    expect(undefined).not.toStrictEqualLeft(undefined);
  });
  test('if received is a Left that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(leftThese([1, undefined, 3])).not.toStrictEqualLeft([1, , 3]));
  });
  test('if received is a Left that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(leftEither({ message: 'Does not compute!' })).not.toStrictEqualLeft(
        new Message('Does not compute!'),
      ),
    );
  });
});

describe('.not.toStrictEqualLeft should pass', () => {
  test('if received is a Left that does not strictly equal the expected value', () => {
    expect(leftEither('Left')).not.toStrictEqualLeft('A different value');
  });
  test('if received is a Right', () => {
    expect(rightThese('Right')).not.toStrictEqualLeft('Hello');
  });
  test('if received is a Left that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(leftThese([1, undefined, 3])).not.toStrictEqualLeft([1, , 3]));
  });
  test('if received is a Left that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(leftEither({ message: 'Does not compute!' })).not.toStrictEqualLeft(
        new Message('Does not compute!'),
      ),
    );
  });
});

describe('.not.toStrictEqualLeft should fail', () => {
  test('if received is a Left Either that equals the expected value', () => {
    expect(() => expect(leftEither('left')).not.toStrictEqualLeft('left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toStrictEqualLeft(expectedLeft)

      Expected Left: not "left"
    `);
  });
  test('if received is a Left These that equals the expected value', () => {
    expect(() => expect(leftThese('left')).not.toStrictEqualLeft('left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toStrictEqualLeft(expectedLeft)

      Expected Left: not "left"
    `);
  });
});
