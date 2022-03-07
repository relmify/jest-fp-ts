import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { applyPredicateRight } from '../eitherOrThese/applyPredicate';
import { strictEquals, isEitherOrThese } from '../predicates';
import { diffReceivedRight } from '../eitherOrThese/print';

const passMessage = (expected: unknown) => () =>
  matcherHint('.not.toStrictEqualRight', 'received', 'expectedRight') +
  '\n\n' +
  `Expected Right: not ${printExpected(expected)}`;

const failMessage = (received: unknown, expected: unknown) => () => {
  return isEitherOrThese(received)
    ? matcherHint('.toStrictEqualRight', 'received', 'expectedRight') +
        '\n\n' +
        diffReceivedRight(received, expected)
    : matcherHint('.toStrictEqualRight', 'received', 'expectedRight') +
        '\n\n' +
        'Received value is not an Either or These.\n' +
        `Expected Right: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Right that contains a value that strictly equals an expected
       * value. See Jest's
       * [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation
       * for information about how `.toStrictEqual()` differs from `toEqual()`.
       */
      readonly toStrictEqualRight: (expected: unknown) => R;
    }
    interface Expect {
      /**
       * Used to check if a value is a Right that contains a value that strictly equals an expected
       * value. See Jest's
       * [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation
       * for information about how `.toStrictEqual()` differs from `toEqual()`.
       */
      readonly toStrictEqualRight: (expected: unknown) => any;
    }
  }
}

/**
 * Check that the received value is a Right that strictly equals the expected value
 */
export const toStrictEqualRight = (received: unknown, expected: unknown): any => {
  const predicate = strictEquals(expected);
  const pass = isEitherOrThese(received) && applyPredicateRight(predicate)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
