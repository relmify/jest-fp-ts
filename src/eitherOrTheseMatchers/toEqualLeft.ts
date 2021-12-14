import { matcherHint, printExpected, printReceived, stringify } from 'jest-matcher-utils';
import { equals, isEitherOrThese } from '../../predicates';
import { applyPredicateLeft } from '../../eitherOrThese/applyPredicate';
import { diffReceivedLeft, printReceivedValue } from '../../eitherOrThese/print';
import { EitherOrThese } from '../../eitherOrThese/eitherOrThese';
import { left } from 'fp-ts/lib/Either';

const passMessage = (received: EitherOrThese<unknown, unknown>, expected: unknown) => () =>
  matcherHint('.not.toEqualLeft', 'received', 'expectedLeft') +
  '\n\n' +
  `Expected Left: not ${printExpected(expected)}` +
  (stringify(left(expected)) !== stringify(received) ? `${printReceivedValue(received)}` : '');

const failMessage = (received: unknown, expected: unknown) => () => {
  return isEitherOrThese(received)
    ? matcherHint('.toEqualLeft', 'received', 'expectedLeft') +
        '\n\n' +
        diffReceivedLeft(received, expected)
    : matcherHint('.toEqualLeft', 'received', 'expectedLeft') +
        '\n\n' +
        'Received value is not an Either or These.\n' +
        `Expected Left: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Left whose value equals an expected
       * value. See Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue)
       * documentation for information about how the `.toEqual()` comparison works.
       */
      readonly toEqualLeft: (expected: unknown) => R;
    }

    interface Expect {
      /**
       * Used to check if a value is a Left whose value equals an expected
       * value. See Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue)
       * documentation for information about how the `.toEqual()` comparison works.
       */
      readonly toEqualLeft: (expected: unknown) => any;
    }
  }
}

/**
 * Check that the received value is a Left that equals an expected value
 */
export const toEqualLeft = (received: unknown, expected: unknown): any => {
  const predicate = equals(expected);
  const pass = isEitherOrThese(received) && applyPredicateLeft(predicate)(received);

  const message = pass ? passMessage(received, expected) : failMessage(received, expected);

  return {
    pass,
    message,
  };
};
