import { left as leftEither, right as rightEither } from 'fp-ts/lib/Either';
import { left as leftThese, right as rightThese, both } from 'fp-ts/lib/These';
import { none, some } from 'fp-ts/lib/Option';
import { toBeRight } from '../../../index';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toBeRight });

describe('.toBeRight', () => {
  test('should pass if the received object is a Right Either', () => {
    expect(rightEither('Right')).toBeRight();
  });
  test('should pass if the received object is a Right These', () => {
    expect(rightThese('Right')).toBeRight();
  });
  test('if called as an asymmetric matcher', () => {
    expect(rightEither('Right')).toEqual(expect.toBeRight());
  });
});

describe('.toBeRight should fail', () => {
  test('if received is a Left Either', () => {
    expect(() => expect(leftEither('left')).toBeRight()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeRight()

      Received Left: "left"
    `);
  });
  test('if received is a Left These', () => {
    expect(() => expect(leftThese('left')).toBeRight()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeRight()

      Received Left: "left"
    `);
  });
  test('if received is a Both', () => {
    expect(() => expect(both('left', 'right')).toBeRight()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeRight()

      Received Both:
      Left: "left"
      Right: "right"
    `);
  });
  test('if received is a None', () => {
    expect(() => expect(none).toBeRight()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeRight()

      Received value is not an Either or These.
      Received: {"_tag": "None"}
    `);
  });
  test('if received is a basic type', () => {
    expect(() => expect('a').toBeRight()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeRight()

      Received value is not an Either or These.
      Received: "a"
    `);
  });
  test('if received is null', () => {
    expect(() => expect(null).toBeRight()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeRight()

      Received value is not an Either or These.
      Received: null
    `);
  });
});

describe('not.toBeRight should pass', () => {
  test('if the received is a Left Either', () => {
    expect(leftEither('Left')).not.toBeRight();
  });
  test('if the received is a Left These', () => {
    expect(leftThese('Left')).not.toBeRight();
  });
  test('if the received is a Both', () => {
    expect(both('Left', 'Right')).not.toBeRight();
  });
  test('if received is a Some', () => {
    expect(some(1)).not.toBeRight();
  });
  test('if received is a basic type', () => {
    expect(0).not.toBeRight();
  });
  test('if received is undefined', () => {
    expect(undefined).not.toBeRight();
  });
});

describe('.not.toBeRight should fail', () => {
  test('if received is a Right Either', () => {
    expect(() => expect(rightEither('right')).not.toBeRight()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeRight()

      Received Right: "right"
    `);
  });
  test('if received is a Right These', () => {
    expect(() => expect(rightThese('right')).not.toBeRight()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeRight()

      Received Right: "right"
    `);
  });
});
