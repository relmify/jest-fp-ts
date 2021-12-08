import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { equals, isEitherOrThese } from '../../predicates';
import { applyPredicateRight } from '../../eitherOrThese/applyPredicate';
import { diffReceivedRight } from '../../eitherOrThese/print';

const passMessage = (expected: unknown) => () =>
  matcherHint('.not.toEqualRight', 'received', 'expectedRight') +
  '\n\n' +
  `Expected Right: not ${printExpected(expected)}`;

const failMessage = (received: unknown, expected: unknown) => () => {
  return isEitherOrThese(received)
    ? matcherHint('.toEqualRight', 'received', 'expectedRight') +
        '\n\n' +
        diffReceivedRight(received, expected)
    : matcherHint('.toEqualRight', 'received', 'expectedRight') +
        '\n\n' +
        'Received value is not an Either or These.\n' +
        `Expected Right: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};
/**
 * Check that the received value is a Left that equals an expected value
 */
export const toEqualRight = (received: unknown, expected: unknown): any => {
  const predicate = equals(expected);
  const pass = isEitherOrThese(received) && applyPredicateRight(predicate)(received);

  const message = pass ? passMessage(expected) : failMessage(received, expected);

  return {
    pass,
    message,
  };
};
