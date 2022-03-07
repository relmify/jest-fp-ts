import { left as leftEither, right as rightEither } from 'fp-ts/lib/Either';
import { left as leftThese, right as rightThese, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { toBeLeft } from '../../index';
import { stripAnsi } from '../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toBeLeft });

describe('.toBeLeft should pass', () => {
  test('if received is a Left Either', () => {
    expect(leftEither('Left')).toBeLeft();
  });
  test('if received is a Left These', () => {
    expect(leftThese('Left')).toBeLeft();
  });
  test('if called as an asymmetric matcher', () => {
    expect(leftThese('Left')).toEqual(expect.toBeLeft());
  });
});

describe('.toBeLeft should fail', () => {
  test('if received is a Right Either', () => {
    expect(() => expect(rightEither('right')).toBeLeft()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeft()

      Received Right: "right"
    `);
  });
  test('if received is a Right These', () => {
    expect(() => expect(rightThese('right')).toBeLeft()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeft()

      Received Right: "right"
    `);
  });
  test('if received is a Both', () => {
    expect(() => expect(both('left', 'right')).toBeLeft()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeft()

      Received Both:
      Left: "left"
      Right: "right"
    `);
  });
  test('if received is a Some', () => {
    expect(() => expect(some(1)).toBeLeft()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeft()

      Received value is not an Either or These.
      Received: {"_tag": "Some", "value": 1}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect(42).toBeLeft()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeft()

      Received value is not an Either or These.
      Received: 42
    `);
  });
  test('if received is undefined', () => {
    expect(() => expect(undefined).toBeLeft()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeft()

      Received value is not an Either or These.
      Received: undefined
    `);
  });
});

describe('.not.toBeLeft should pass', () => {
  test('if received is a Right Either', () => {
    expect(rightEither('Right')).not.toBeLeft();
  });
  test('if received is a Right These', () => {
    expect(rightThese('Right')).not.toBeLeft();
  });
  test('if received is a Both', () => {
    expect(both('Left', 'Right')).not.toBeLeft();
  });
  test('if received is a None', () => {
    expect(none).not.toBeLeft();
  });
  test('if received is a basic type', () => {
    expect('a').not.toBeLeft();
  });
  test('if received is null', () => {
    expect(null).not.toBeLeft();
  });
});

describe('.not.toBeLeft should fail', () => {
  test('if received is a left Either', () => {
    expect(() => expect(leftEither('left')).not.toBeLeft()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeLeft()

      Received Left: "left"
    `);
  });
  test('if received is a left These', () => {
    expect(() => expect(leftThese('left')).not.toBeLeft()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeLeft()

      Received Left: "left"
    `);
  });
});
