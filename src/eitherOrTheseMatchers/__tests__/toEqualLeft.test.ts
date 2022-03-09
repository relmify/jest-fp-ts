import { left as leftEither, right as rightEither } from 'fp-ts/lib/Either';
import { left as leftThese, right as rightThese, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { toEqualLeft } from '../../index';

expect.extend({ toEqualLeft });

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toEqualLeft should pass', () => {
  test('if the received is a Left Either with the expected value', () => {
    expect(leftEither('Left')).toEqualLeft('Left');
  });
  test('if the received is a Left These with the expected value', () => {
    expect(leftThese('Left')).toEqualLeft('Left');
  });
  test('if received is a Left with an undefined expected value', () => {
    expect(leftEither(undefined)).toEqualLeft(undefined);
  });
  test('if called as an asymmetric matcher', () => {
    expect(leftEither('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
      expect.toEqualLeft('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(leftThese('You affect the world by what you browse.')).toEqualLeft(
      expect.stringContaining('world'),
    );
  });
  test('if received is a Left that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(leftThese([1, undefined, 3])).toEqualLeft([1, , 3]));
  });
  test('if received is a Left that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(leftEither({ message: 'Does not compute!' })).toEqualLeft(
        new Message('Does not compute!'),
      ),
    );
  });
});

describe('.toEqualLeft should fail', () => {
  test('if received is a Left that does not equal the expected value', () => {
    expect(() => expect(leftThese({ a: 1 })).toEqualLeft({ a: 2 }))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualLeft(expectedLeft)

      - Expected Left  - 1
      + Received Left  + 1

        Object {
      -   "a": 2,
      +   "a": 1,
        }
    `);
  });
  test('if received is a Right', () => {
    expect(() => expect(rightEither('received right')).toEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualLeft(expectedLeft)

      Expected Left: "expected left"
      Received Right: "received right"
    `);
  });
  test('if received is a Both', () => {
    expect(() => expect(both('received left', 'received right')).toEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualLeft(expectedLeft)

      Expected Left: "expected left"
      Received Both:
      Left: "received left"
      Right: "received right"
    `);
  });
});

describe('.toEqualLeft should fail and indicate not an Either or These', () => {
  test('if received is undefined', () => {
    expect(() => expect(undefined).toEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: "expected left"
      Received: undefined
    `);
  });
  test('if received is a Some', () => {
    expect(() => expect(some('my some')).toEqualLeft('expected left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: "expected left"
      Received: {"_tag": "Some", "value": "my some"}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(200).toEqualLeft(200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualLeft(expectedLeft)

      Received value is not an Either or These.
      Expected Left: 200
      Received: 200
    `);
  });
});

describe('.not.toEqualLeft should pass', () => {
  test('if received is a Left that does not equal the expected value', () => {
    expect(leftEither('Left')).not.toEqualLeft('A different value');
  });
  test('if received is a Right', () => {
    expect(rightThese('Hello')).not.toEqualLeft('Hello');
  });
  test('if received is a Both', () => {
    expect(both('Right', 'Right')).not.toEqualLeft('Right');
  });
  test('if received is null', () => {
    expect(null).not.toEqualLeft(null);
  });
  test('if received is a None', () => {
    expect(none).not.toEqualLeft(none);
  });
});

describe('.not.toEqualLeft should fail', () => {
  test('if received is a Left Either that equals the expected value', () => {
    expect(() => expect(leftEither('left')).not.toEqualLeft('left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toEqualLeft(expectedLeft)

      Expected Left: not "left"
    `);
  });
  test('if received is a Left These that equals the expected value', () => {
    expect(() => expect(leftThese('left')).not.toEqualLeft('left'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toEqualLeft(expectedLeft)

      Expected Left: not "left"
    `);
  });
});
