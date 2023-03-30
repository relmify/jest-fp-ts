import { left as leftEither, right as rightEither } from 'fp-ts/lib/Either';
import { left as leftThese, right as rightThese, both } from 'fp-ts/lib/These';
import { some, none } from 'fp-ts/lib/Option';
import { toBeLeftErrorMatching } from '../../index';

expect.extend({ toBeLeftErrorMatching });

describe('.toBeLeftErrorMatching should pass', () => {
  test('if the received is a Left Either Error with the expected message', () => {
    expect(leftEither(new Error('egad'))).toBeLeftErrorMatching('egad');
  });
  test('if the received is a Left These Error with the expected message', () => {
    expect(leftThese(new Error('oops'))).toBeLeftErrorMatching('oops');
  });
  test('if the received is a Left Either Error with a message matching the supplied substring', () => {
    expect(leftEither(new Error('egad'))).toBeLeftErrorMatching('gad');
  });
  test('if the received is a Left These Error with a message matching the supplied regex', () => {
    expect(leftThese(new Error('oops'))).toBeLeftErrorMatching(/ps$/);
  });
  test('if called as an asymmetric matcher', () => {
    expect(
      leftEither(new Error('Any sufficiently advanced technology is equivalent to magic.')),
    ).toEqual(
      expect.toBeLeftErrorMatching('Any sufficiently advanced technology is equivalent to magic.'),
    );
  });
});

describe('.toBeLeftErrorMatching should fail', () => {
  test('if received is a Left Error whose message does not match the expected value', () => {
    expect(() => expect(leftThese(new Error('oops'))).toBeLeftErrorMatching('egad'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftErrorMatching(expectedErrorMessage)

      Expected Left Error: "egad"
      Received Left Error: "oops"
    `);
  });
  test('if received is a Left Error whose message does not match the expected substring', () => {
    expect(() => expect(leftThese(new Error('egad'))).toBeLeftErrorMatching('egad!'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftErrorMatching(expectedErrorMessage)

      Expected Left Error: "egad!"
      Received Left Error: "egad"
    `);
  });
  test('if received is a Left Error whose message does not match the expected regex', () => {
    expect(() => expect(leftEither(new Error('egad!'))).toBeLeftErrorMatching(/egad$/))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftErrorMatching(expectedErrorMessage)

      Expected Left Error: /egad$/
      Received Left Error: "egad!"
    `);
  });
  test('if received is a Left that does not contain an Error', () => {
    expect(() => expect(leftEither('whoa')).toBeLeftErrorMatching(/egad/))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftErrorMatching(expectedErrorMessage)

      Received Left value is not an Error.
      Expected Left Error: /egad/
      Received Left: "whoa"
    `);
  });
  test('if received is a Right', () => {
    expect(() => expect(rightEither(new Error('whoa'))).toBeLeftErrorMatching('whoa'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftErrorMatching(expectedErrorMessage)

      Received value is not a Left.
      Expected Left Error: "whoa"
      Received Right: [Error: whoa]
    `);
  });
  test('if received is a Both', () => {
    expect(() => expect(both('uh', 'oh')).toBeLeftErrorMatching('uh-oh'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftErrorMatching(expectedErrorMessage)

      Received value is not a Left.
      Expected Left Error: "uh-oh"
      Received Both:
      Left: "uh"
      Right: "oh"
    `);
  });
});

describe('.toBeLeftErrorMatching should fail and indicate not an Either or These', () => {
  test('if received is undefined', () => {
    expect(() => expect(undefined).toBeLeftErrorMatching('oops'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftErrorMatching(expectedErrorMessage)

      Received value is not an Either or These.
      Expected Left Error: "oops"
      Received: undefined
    `);
  });
  test('if received is a Some', () => {
    expect(() => expect(some('uh-oh')).toBeLeftErrorMatching('uh-oh'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftErrorMatching(expectedErrorMessage)

      Received value is not an Either or These.
      Expected Left Error: "uh-oh"
      Received: {"_tag": "Some", "value": "uh-oh"}
    `);
  });
  test('if received is just a string', () => {
    expect(() => expect('egad').toBeLeftErrorMatching('egad')).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftErrorMatching(expectedErrorMessage)

      Received value is not an Either or These.
      Expected Left Error: "egad"
      Received: "egad"
    `);
  });
});

describe('.not.toBeLeftErrorMatching should pass', () => {
  test('if received is a Left Error that does not match the expected value', () => {
    expect(leftEither(new Error('gosh'))).not.toBeLeftErrorMatching('darn');
  });
  test('if received is a Right', () => {
    expect(rightThese('Hello')).not.toBeLeftErrorMatching('Hello');
  });
  test('if received is a Both', () => {
    expect(both('golly', 'golly')).not.toBeLeftErrorMatching('golly');
  });
  test('if received is null', () => {
    expect(null).not.toBeLeftErrorMatching('null');
  });
  test('if received is a None', () => {
    expect(none).not.toBeLeftErrorMatching('none');
  });
});

describe('.not.toBeLeftErrorMatching should fail', () => {
  test('if received is a Left Either with an Error that exactly matches the expected string', () => {
    expect(() => expect(leftEither(new Error('gee'))).not.toBeLeftErrorMatching('gee'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeLeftErrorMatching(expectedErrorMessage)

      Expected Left Error: not "gee"
    `);
  });
  test('if received is a Left These with an Error that matches the expected substring', () => {
    expect(() => expect(leftThese(new Error('oh-no'))).not.toBeLeftErrorMatching('no'))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeLeftErrorMatching(expectedErrorMessage)

      Expected Left Error: not "no"
      Received Left Error: "oh-no"
    `);
  });
  test('if received is a Left Either with an Error that matches the supplied regex', () => {
    expect(() => expect(leftEither(new Error('totally wrong'))).not.toBeLeftErrorMatching(/wrong/))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeLeftErrorMatching(expectedErrorMessage)

      Expected Left Error: not /wrong/
      Received Left Error: "totally wrong"
    `);
  });
  test('if received is a Left These with an Error that matches the supplied regex', () => {
    expect(() => expect(leftThese(new Error('faux-pas'))).not.toBeLeftErrorMatching(/faux/))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeLeftErrorMatching(expectedErrorMessage)

      Expected Left Error: not /faux/
      Received Left Error: "faux-pas"
    `);
  });
});
