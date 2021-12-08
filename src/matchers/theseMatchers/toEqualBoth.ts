import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { equals, isThese } from '../../predicates';
import { applyPredicateBoth } from '../../These/applyPredicate';
import { diffReceivedBoth } from '../../These/print';

const passMessage = (expectedLeft: unknown, expectedRight: unknown) => () =>
  matcherHint('.not.toEqualBoth', 'received', 'expectedBoth') +
  '\n\n' +
  `Expected Both: not \n` +
  `  Left: ${printExpected(expectedLeft)}` +
  `  Right: ${printExpected(expectedRight)}`;

const failMessage = (received: unknown, expectedLeft: unknown, expectedRight: unknown) => () => {
  return isThese(received)
    ? matcherHint('.toEqualBoth', 'received', 'expectedLeft, expectedRight') +
        '\n\n' +
        diffReceivedBoth(received, expectedLeft, expectedRight)
    : matcherHint('.toEqualBoth', 'received', 'expectedLeft, expectedRight') +
        '\n\n' +
        'Received value is not a These.\n' +
        `Expected Both:\n` +
        `  Left: ${printExpected(expectedLeft)}\n` +
        `  Right: ${printExpected(expectedRight)}\n` +
        `Received: ${printReceived(received)}`;
};

/**
 * Check that the received value is a Left that equals an expected value
 */
export const toEqualBoth = (
  received: unknown,
  expectedLeft: unknown,
  expectedRight: unknown,
): any => {
  const predicateLeft = equals(expectedLeft);
  const predicateRight = equals(expectedRight);
  const pass = isThese(received) && applyPredicateBoth(predicateLeft, predicateRight)(received);

  const message = pass
    ? passMessage(expectedLeft, expectedRight)
    : failMessage(received, expectedLeft, expectedRight);

  return {
    pass,
    message,
  };
};
