import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isThese } from '../../predicates';
import { printReceivedValue } from '../../eitherOrThese/print';
import { These } from 'fp-ts/lib/These';

const passMessage = (received: These<unknown, unknown>) => () =>
  matcherHint('.not.toBeThese', 'received', '') + '\n\n' + `${printReceivedValue(received)}`;

const failMessage = (received: unknown) => () =>
  matcherHint('.toBeThese', 'received', '') + '\n\n' + `Received: ${printReceived(received)}`;

/**
 * Matches if the received value is a These
 */
export const toBeThese = (received: unknown): any => {
  const pass = isThese(received);
  return {
    pass,
    message: pass ? passMessage(received) : failMessage(received),
  };
};
