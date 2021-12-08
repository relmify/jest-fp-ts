import { matcherHint, printReceived } from 'jest-matcher-utils';
import { Option, isSome } from 'fp-ts/lib/Option';
import { isOption } from '../../predicates';
import { printReceivedOption } from '../../option/print';

const passMessage = (received: Option<unknown>) => () =>
  matcherHint('.not.toBeSome', 'received', '') + '\n\n' + `${printReceivedOption(received)}`;

const failMessage = (received: unknown) => () => {
  return isOption(received)
    ? matcherHint('.toBeSome', 'received', '') + '\n\n' + `${printReceivedOption(received)}`
    : matcherHint('.toBeSome', 'received', '') +
        '\n\n' +
        'Received value is not an Option.\n' +
        `Received: ${printReceived(received)}`;
};

/**
 * Checked that the supplied value is a Some
 */
export const toBeSome = (received: unknown): any => {
  const pass = isOption(received) && isSome(received);

  return {
    pass: pass,
    message: pass ? passMessage(received) : failMessage(received),
  };
};
