import { some, none } from 'fp-ts/lib/Option';
import { toBeNone } from '../../../index';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toBeNone });

describe('.toBeNone should pass', () => {
  test('if received is a None', () => {
    expect(none).toBeNone();
  });
  test('if called as an asymmetric matcher', () => {
    expect(none).toEqual(expect.toBeNone());
  });
});

describe('.toBeNone should fail', () => {
  test('if received is a Some', () => {
    expect(() => expect(some(1)).toBeNone()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeNone()

      Received Some: 1
    `);
  });
  test('if received is not an Option', () => {
    expect(() => expect(null).toBeNone()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeNone()

      Received value is not an Option.
      Received: null
    `);
  });
});

describe('.not.toBeNone should pass', () => {
  test('if received is a Some', () => {
    expect(some('Some')).not.toBeNone();
  });
  test('if received is not an Option', () => {
    expect(null).not.toBeNone();
  });
});

describe('.not.toBeNone should fail', () => {
  test('if received is a None', () => {
    expect(() => expect(none).not.toBeNone()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeNone()

      Received None
    `);
  });
});
