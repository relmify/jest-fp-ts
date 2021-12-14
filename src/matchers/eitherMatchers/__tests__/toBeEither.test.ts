import { left, right } from 'fp-ts/lib/Either';
import { left as leftThese, right as rightThese, both } from 'fp-ts/lib/These';
import { toBeEither } from '../../../index';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toBeEither });

describe('.toBeEither should pass', () => {
  test('if received is a Left', () => {
    expect(left('Left')).toBeEither();
  });
  test('if received is a Right', () => {
    expect(right('Right')).toBeEither();
  });
  // cannot distinguish left These from left Either
  test('if received is a Left These', () => {
    expect(leftThese('LeftThese')).toBeEither();
  });
  // cannot distinguish right These from right Either
  test('if received is a Right These', () => {
    expect(rightThese('RightThese')).toBeEither();
  });
  test('if called as an asymmetric matcher', () => {
    expect(left('Left')).toEqual(expect.toBeEither());
  });
});

describe('.toBeEither should fail', () => {
  test('if received is neither a left nor a right', () => {
    expect(() => expect(1).toBeEither()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeEither()

      Received: 1
    `);
  });
  test('if received is a both', () => {
    expect(() => expect(both('left', 'right')).toBeEither()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeEither()

      Received: {"_tag": "Both", "left": "left", "right": "right"}
    `);
  });
});

describe('.not.toBeEither should pass', () => {
  test('if received is null', () => {
    expect(null).not.toBeEither();
  });
  test('if received is undefined', () => {
    expect(undefined).not.toBeEither();
  });
  test('if received is a Both', () => {
    expect(both('left', 'right')).not.toBeEither();
  });
  test('if received is a string', () => {
    expect('not an Either').not.toBeEither();
  });
});

describe('.not.toBeEither should fail', () => {
  test('if received is a left', () => {
    expect(() => expect(left('left')).not.toBeEither()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeEither()

      Received Left:  "left"
    `);
  });
  test('if received is a right', () => {
    expect(() => expect(right('right')).not.toBeEither()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeEither()

      Received Right: "right"
    `);
  });
  // cannot distinguish left These from left Either
  test('if received is a left These', () => {
    expect(() => expect(leftThese('left')).not.toBeEither()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeEither()

      Received Left:  "left"
    `);
  });
  // cannot distinguish right These from right Either
  test('if received is a right These', () => {
    expect(() => expect(rightThese('right')).not.toBeEither()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeEither()

      Received Right: "right"
    `);
  });
});
