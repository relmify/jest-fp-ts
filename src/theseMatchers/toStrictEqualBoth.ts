import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { strictEquals, isThese } from '../predicates';
import { applyPredicateBoth } from '../These/applyPredicate';
import { diffReceivedBoth } from '../These/print';

const passMessage = (expectedLeft: unknown, expectedRight: unknown) => () =>
  matcherHint('.not.toStrictEqualBoth', 'received', 'expectedBoth') +
  '\n\n' +
  `Expected Both: not \n` +
  `  Left: ${printExpected(expectedLeft)}\n` +
  `  Right: ${printExpected(expectedRight)}`;

const failMessage = (received: unknown, expectedLeft: unknown, expectedRight: unknown) => () => {
  return isThese(received)
    ? matcherHint('.toStrictEqualBoth', 'received', 'expectedLeft, expectedRight') +
        '\n\n' +
        diffReceivedBoth(received, expectedLeft, expectedRight, true)
    : matcherHint('.toStrictEqualBoth', 'received', 'expectedLeft, expectedRight') +
        '\n\n' +
        'Received value is not a These.\n' +
        `Expected Both:\n` +
        `  Left: ${printExpected(expectedLeft)}\n` +
        `  Right: ${printExpected(expectedRight)}\n` +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Both that contains a Left value that strictly equals an
       * expected value, and a Right value that strictly equals an expected value. See Jest's
       * [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation
       * for information about how `.toStrictEqual()` differs from `toEqual()`.
       */
      readonly toStrictEqualBoth: (expectedLeft: unknown, expectedRight: unknown) => R;
    }
    interface Expect {
      /**
       * Used to check if a value is a Both that contains a Left value that strictly equals an
       * expected value, and a Right value that strictly equals an expected value. See Jest's
       * [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation
       * for information about how `.toStrictEqual()` differs from `toEqual()`.
       */
      readonly toStrictEqualBoth: (expectedLeft: unknown, expectedRight: unknown) => any;
    }
  }
}

/**
 * Check that the received value is a Both with left and right values that strictly equal the
 * expected left and right values.
 */
export const toStrictEqualBoth = (
  received: unknown,
  expectedLeft: unknown,
  expectedRight: unknown,
): any => {
  const predicateLeft = strictEquals(expectedLeft);
  const predicateRight = strictEquals(expectedRight);
  const pass = isThese(received) && applyPredicateBoth(predicateLeft, predicateRight)(received);

  const message = pass
    ? passMessage(expectedLeft, expectedRight)
    : failMessage(received, expectedLeft, expectedRight);

  return {
    pass,
    message,
  };
};
