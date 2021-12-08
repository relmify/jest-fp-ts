import { left, right, both } from 'fp-ts/lib/These';
import { matchers } from '../index';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend(matchers);

describe('.toBeBoth should pass', () => {
  test('if received is a Both', () => {
    expect(both('Left', 'Right')).toBeBoth();
  });
  test('if called as an asymmetric matcher', () => {
    expect(both('Left', 'Right')).toEqual(expect.toBeBoth());
  });
});

describe('.toBeBoth should fail', () => {
  test('if received is a right', () => {
    expect(() => expect(right('right')).toBeBoth()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeBoth()

      Received Right: "right"
    `);
  });
  test('if received is a left', () => {
    expect(() => expect(left('left')).toBeBoth()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeBoth()

      Received Left: "left"
    `);
  });
  test('if received is not a These', () => {
    expect(() => expect(null).toBeBoth()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeBoth()

      Received value is not a These.
      Received: null
    `);
  });
});

describe('.not.toBeBoth should pass', () => {
  test('if received is a Right', () => {
    expect(right('Right')).not.toBeBoth();
  });
  test('if received is a Left', () => {
    expect(left('Left')).not.toBeBoth();
  });
  test('if received is not a These', () => {
    expect(undefined).not.toBeBoth();
  });
});

describe('.not.toBeBoth should fail', () => {
  test('if received is a Both', () => {
    expect(() => expect(both('left', 'right')).not.toBeBoth()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeBoth()

      Received Both:
        Left: "left"
        Right: "right"
    `);
  });
});
