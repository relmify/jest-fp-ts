import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { equals, isEitherOrThese } from '../../predicates';
import { applyPredicateLeft } from '../../eitherOrThese/applyPredicate';
import { diffReceivedLeft } from '../../eitherOrThese/print';

const passMessage = (expected: unknown) => () =>
  matcherHint('.not.toEqualLeft', 'received', 'expectedLeft') +
  '\n\n' +
  `Expected Left: not ${printExpected(expected)}`;

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

/**
 * Check that the received value is a Left that equals an expected value
 */
export const toEqualLeft = (received: unknown, expected: unknown): any => {
  const predicate = equals(expected);
  const pass = isEitherOrThese(received) && applyPredicateLeft(predicate)(received);

  const message = pass ? passMessage(expected) : failMessage(received, expected);

  return {
    pass,
    message,
  };
};
