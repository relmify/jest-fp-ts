import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { applyPredicateLeft } from '../eitherOrThese/applyPredicate';
import { strictEquals, isEitherOrThese } from '../predicates';
import { diffReceivedLeft } from '../eitherOrThese/print';

const passMessage = (expected: unknown) => () =>
  matcherHint('.not.toStrictEqualLeft', 'received', 'expectedLeft') +
  '\n\n' +
  `Expected Left: not ${printExpected(expected)}`;

const failMessage = (received: unknown, expected: unknown) => () => {
  return isEitherOrThese(received)
    ? matcherHint('.toStrictEqualLeft', 'received', 'expectedLeft') +
        '\n\n' +
        diffReceivedLeft(received, expected)
    : matcherHint('.toStrictEqualLeft', 'received', 'expectedLeft') +
        '\n\n' +
        'Received value is not an Either or These.\n' +
        `Expected Left: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Left that contains a value that strictly equals an expected
       * value. See Jest's
       * [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation
       * for information about how `.toStrictEqual()` differs from `toEqual()`.
       */
      readonly toStrictEqualLeft: (expected: unknown) => R;
    }
    interface Expect {
      /**
       * Used to check if a value is a Left that contains a value that strictly equals an expected
       * value. See Jest's
       * [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation
       * for information about how `.toStrictEqual()` differs from `toEqual()`.
       */
      readonly toStrictEqualLeft: (expected: unknown) => any;
    }
  }
}

/**
 * Check that the received value is a Left that strictly equals an expected value
 */
export const toStrictEqualLeft = (received: unknown, expected: unknown): any => {
  const predicate = strictEquals(expected);
  const pass = isEitherOrThese(received) && applyPredicateLeft(predicate)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
