import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { applyPredicate } from '../../option/applyPredicate';
import { isOption, strictEquals } from '../../predicates';
import { diffReceivedSome } from '../../option/print';

const passMessage = (expected: unknown) => () =>
  matcherHint('.not.toStrictEqualSome', 'received', 'expectedSome') +
  '\n\n' +
  `Expected Some: not ${printExpected(expected)}`;

const failMessage = (received: unknown, expected: unknown) => () => {
  return isOption(received)
    ? matcherHint('.toStrictEqualSome', 'received', 'expectedSome') +
        '\n\n' +
        diffReceivedSome(received, expected)
    : matcherHint('.toStrictEqualSome', 'received', 'expectedSome') +
        '\n\n' +
        'Received value is not an Option.\n' +
        `Expected Some: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Some that contains a value that strictly equals an expected
       * value. See Jest's
       * [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation
       * for information about how `.toStrictEqual()` differs from `toEqual()`.
       */
      readonly toStrictEqualSome: (expected: unknown) => R;
    }
    interface Expect {
      /**
       * Used to check if a value is a Some that contains a value that strictly equals an expected
       * value. See Jest's
       * [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation
       * for information about how `.toStrictEqual()` differs from `toEqual()`.
       */
      readonly toStrictEqualSome: (expected: unknown) => any;
    }
  }
}

/**
 * Check that the received value is a Some that strictly equals the expected value
 */
export const toStrictEqualSome = (received: unknown, expected: unknown): any => {
  const predicate = strictEquals(expected);
  const pass = isOption(received) && applyPredicate(predicate)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
