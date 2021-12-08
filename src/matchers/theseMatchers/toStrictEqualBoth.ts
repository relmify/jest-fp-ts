import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { strictEquals, isThese } from '../../predicates';
import { applyPredicateBoth } from '../../These/applyPredicate';
import { diffReceivedBoth } from '../../These/print';

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

/**
 * Check that the received value is a Left that equals an expected value
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
