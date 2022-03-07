import { left as leftEither, right as rightEither } from 'fp-ts/lib/Either';
import { left as leftThese, right as rightThese, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { toEqualRight } from '../../index';
import { stripAnsi } from '../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toEqualRight });

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toEqualRight should pass', () => {
  test('if the received is a Right Either with the expected value', () => {
    expect(rightEither('Right')).toEqualRight('Right');
  });
  test('if the received is a Right These with the expected value', () => {
    expect(rightThese('Right')).toEqualRight('Right');
  });
  test('if received is a Right with a null expected value', () => {
    expect(rightThese(null)).toEqualRight(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(rightEither('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
      expect.toEqualRight('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(rightThese('You affect the world by what you browse.')).toEqualRight(
      expect.stringContaining('world'),
    );
  });
  test('if received is a Right that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(rightThese([1, undefined, 3])).toEqualRight([1, , 3]));
  });
  test('if received is a Right that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(rightEither({ message: 'Does not compute!' })).toEqualRight(
        new Message('Does not compute!'),
      ),
    );
  });
});

describe('.toEqualRight should fail and include the expected and received values', () => {
  test('if received is a Right that does not equal the expected value', () => {
    expect(() => expect(rightThese('received right')).toEqualRight('expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualRight(expectedRight)

      Expected Right: "expected right"
      Received Right: "received right"
    `);
  });
  test('if received is a Left', () => {
    expect(() => expect(leftEither('received left')).toEqualRight('expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualRight(expectedRight)

      Expected Right: "expected right"
      Received Left: "received left"
    `);
  });
  test('if received is a Both', () => {
    expect(() => expect(both('received left', 'received right')).toEqualRight('expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualRight(expectedRight)

      Expected Right: "expected right"
      Received Both:
      Left: "received left"
      Right: "received right"
    `);
  });
});

describe('.toEqualRight should fail and indicate not an Either or These', () => {
  test('if received is a Some', () => {
    expect(() => expect(some('my some')).toEqualRight('expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: "expected right"
      Received: {"_tag": "Some", "value": "my some"}
    `);
  });
  test('if received is a None', () => {
    expect(() => expect(none).toEqualRight(none)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: {"_tag": "None"}
      Received: {"_tag": "None"}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(200).toEqualRight(200)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: 200
      Received: 200
    `);
  });
  test('if received is null', () => {
    expect(() => expect(null).toEqualRight(null)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: null
      Received: null
    `);
  });
  test('if received is undefined', () => {
    expect(() => expect(undefined).toEqualRight('expected right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualRight(expectedRight)

      Received value is not an Either or These.
      Expected Right: "expected right"
      Received: undefined
    `);
  });
});

describe('.not.toEqualRight should pass', () => {
  test('if received is a Right that does not equal the expected value', () => {
    expect(rightEither('Right')).not.toEqualRight('A different value');
  });
  test('if received is a Left', () => {
    expect(leftThese('Hello')).not.toEqualRight('Hello');
  });
  test('if received is a Both', () => {
    expect(both('Left', 'Left')).not.toEqualRight('Left');
  });
  test('if received is undefined', () => {
    expect(undefined).not.toEqualRight(null);
  });
  test('if received is a Some', () => {
    expect(some(1)).not.toEqualRight(1);
  });
});

describe('.not.toEqualRight should fail', () => {
  test('if received is a Right Either that equals the expected value', () => {
    expect(() => expect(rightEither('right')).not.toEqualRight('right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toEqualRight(expectedRight)

      Expected Right: not "right"
    `);
  });
  test('if received is a Right These that equals the expected value', () => {
    expect(() => expect(rightThese('right')).not.toEqualRight('right'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toEqualRight(expectedRight)

      Expected Right: not "right"
    `);
  });
});
