import { some, none } from 'fp-ts/lib/Option';
import { toStrictEqualSome } from '../../../index';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toStrictEqualSome });

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

describe('.toStrictEqualSome should pass', () => {
  test('if received is a Some with the expected value', () => {
    expect(some('Some')).toStrictEqualSome('Some');
  });
  test('if received is a Some with an undefined expected value', () => {
    expect(some(undefined)).toStrictEqualSome(undefined);
  });
  test('if the received is a Some with a null expected value', () => {
    expect(some(null)).toStrictEqualSome(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(some('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
      expect.toStrictEqualSome('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
  test('if called with an asymmetric matcher', () => {
    expect(some('You affect the world by what you browse.')).toStrictEqualSome(
      expect.stringContaining('world'),
    );
  });
});

describe('.toStrictEqualSome should fail', () => {
  test('if received is a None', () => {
    expect(() => expect(none).toStrictEqualSome('Some')).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualSome(expectedSome)

      Expected Some: "Some"
      Received None
    `);
  });
  test('if received is a Some that does not equal the expected value', () => {
    expect(() => expect(some('another Some')).toStrictEqualSome('Some'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualSome(expectedSome)

      Expected Some: "Some"
      Received Some: "another Some"
    `);
  });
  test('if received is a Some that does not strictly equal the expected sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(() => expect(some([1, undefined, 3])).toStrictEqualSome([1, , 3]))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualSome(expectedSome)

      Expected Some: [1, , 3]
      Received Some: [1, undefined, 3]
    `);
  });
  test('if received is a Some that does not strictly equal the expected class instance', () => {
    expect(() =>
      expect(some({ message: 'Does not compute!' })).toStrictEqualSome(
        new Message('Does not compute!'),
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualSome(expectedSome)

      - Expected Some  - 1
      + Received Some  + 1

      - Message {
      + Object {
          "message": "Does not compute!",
        }
    `);
  });
  test('if received is a Some with a number value that does not equal the expected value', () => {
    expect(() => expect(some(1)).toStrictEqualSome(2)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualSome(expectedSome)

      Expected Some: 2
      Received Some: 1
    `);
  });
  test('if received value is not an Option', () => {
    expect(() => expect(undefined).toStrictEqualSome(undefined))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toStrictEqualSome(expectedSome)

      Received value is not an Option.
      Expected Some: undefined
      Received: undefined
    `);
  });
});

describe('.not.toStrictEqualSome should pass', () => {
  test('if received is a Some that does not have the expected value', () => {
    expect(some('Some')).not.toStrictEqualSome('A different value');
  });
  test('if received is a None', () => {
    expect(none).not.toStrictEqualSome('None');
  });
  test('if received value is not an Option', () => {
    expect(1).not.toStrictEqualSome(1);
  });
});

describe('.not.toStrictEqualSome should fail', () => {
  test('if received is a Some that equals the expected value', () => {
    expect(() => expect(some('Some')).not.toStrictEqualSome('Some'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toStrictEqualSome(expectedSome)

      Expected Some: not "Some"
    `);
  });
});
