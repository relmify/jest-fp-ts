import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isOption } from '../../predicates';
import { printReceivedOption } from '../../option/print';
import { Option } from 'fp-ts/lib/Option';

const passMessage = (received: Option<unknown>) => () =>
  matcherHint('.not.toBeOption', 'received', '') + '\n\n' + `${printReceivedOption(received)}`;

const failMessage = (received: unknown) => () =>
  matcherHint('.toBeOption', 'received', '') + '\n\n' + `Received: ${printReceived(received)}`;

/**
 * Matches if the received value is an Option
 */
export const toBeOption = (received: unknown): any => {
  const pass = isOption(received);
  return {
    pass,
    message: pass ? passMessage(received) : failMessage(received),
  };
};
