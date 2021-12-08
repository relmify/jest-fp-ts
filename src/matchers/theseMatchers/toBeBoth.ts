import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isBoth, These } from 'fp-ts/lib/These';
import { isThese } from '../../predicates';
import { printReceivedValue } from '../../eitherOrThese/print';

const passMessage = (received: These<unknown, unknown>) => () =>
  matcherHint('.not.toBeBoth', 'received', '') + '\n\n' + `${printReceivedValue(received)}`;

const failMessage = (received: unknown) => () => {
  return isThese(received)
    ? matcherHint('.toBeBoth', 'received', '') + '\n\n' + `${printReceivedValue(received)}`
    : matcherHint('.toBeBoth', 'received', '') +
        '\n\n' +
        'Received value is not a These.\n' +
        `Received: ${printReceived(received)}`;
};

/**
 * Check that the received value is a Both
 */
export const toBeBoth = (received: unknown): any => {
  const pass = isThese(received) && isBoth(received);
  return {
    pass,
    message: pass ? passMessage(received) : failMessage(received),
  };
};
