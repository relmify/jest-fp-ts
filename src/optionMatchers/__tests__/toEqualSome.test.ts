import { some, none } from 'fp-ts/lib/Option';
import { toEqualSome } from '../../index';
import { stripAnsi } from '../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toEqualSome });

describe('.toEqualSome should pass', () => {
  test('if received is a Some with the expected value', () => {
    expect(some('Some')).toEqualSome('Some');
  });
  test('if received is a Some with an undefined expected value', () => {
    expect(some(undefined)).toEqualSome(undefined);
  });
  test('if the received is a Some with a null expected value', () => {
    expect(some(null)).toEqualSome(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(some('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
      expect.toEqualSome('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(some('You affect the world by what you browse.')).toEqualSome(
      expect.stringContaining('world'),
    );
  });
});

describe('.toEqualSome should fail', () => {
  test('if received is a None', () => {
    expect(() => expect(none).toEqualSome('Some')).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualSome(expectedSome)

      Expected Some: "Some"
      Received None
    `);
  });
  test('if received is a Some that does not equal the expected value', () => {
    expect(() => expect(some('another Some')).toEqualSome('Some'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualSome(expectedSome)

      Expected Some: "Some"
      Received Some: "another Some"
    `);
  });
  test('if received is a Some with a number value that does not equal the expected value', () => {
    expect(() => expect(some(1)).toEqualSome(2)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualSome(expectedSome)

      Expected Some: 2
      Received Some: 1
    `);
  });
  test('if received value is not an Option', () => {
    expect(() => expect(undefined).toEqualSome(undefined)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqualSome(expectedSome)

      Received value is not an Option.
      Expected Some: undefined
      Received: undefined
    `);
  });
});

describe('.not.toEqualSome should pass', () => {
  test('if received is a Some that does not have the expected value', () => {
    expect(some('Some')).not.toEqualSome('A different value');
  });
  test('if received is a None', () => {
    expect(none).not.toEqualSome('Some');
  });
  test('if received value is not an Option', () => {
    expect(1).not.toEqualSome(1);
  });
});

describe('.not.toEqualSome should fail', () => {
  test('if received is a Some that equals the expected value', () => {
    expect(() => expect(some('Some')).not.toEqualSome('Some')).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toEqualSome(expectedSome)

      Expected Some: not "Some"
    `);
  });
});
