import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { applyPredicateRight } from '../../eitherOrThese/applyPredicate';
import { strictEquals, isEitherOrThese } from '../../predicates';
import { diffReceivedRight } from '../../eitherOrThese/print';

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

/**
 * Check that the received value is a Right that matches the expected value
 */
export const toStrictEqualRight = (received: unknown, expected: unknown): any => {
  const predicate = strictEquals(expected);
  const pass = isEitherOrThese(received) && applyPredicateRight(predicate)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
