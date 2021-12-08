import { matcherHint, printReceived } from 'jest-matcher-utils';
import { Option, isNone } from 'fp-ts/lib/Option';
import { isOption } from '../../predicates';
import { printReceivedOption } from '../../option/print';

const passMessage = (received: Option<unknown>) => () =>
  matcherHint('.not.toBeNone', 'received', '') + '\n\n' + `${printReceivedOption(received)}`;

const failMessage = (received: unknown) => () => {
  return isOption(received)
    ? matcherHint('.toBeNone', 'received', '') + '\n\n' + `${printReceivedOption(received)}`
    : matcherHint('.toBeNone', 'received', '') +
        '\n\n' +
        'Received value is not an Option.\n' +
        `Received: ${printReceived(received)}`;
};

/**
 * Check that the supplied value is a None
 */
export const toBeNone = (received: unknown): any => {
  const pass = isOption(received) && isNone(received);
  return {
    pass,
    message: pass ? passMessage(received) : failMessage(received),
  };
};
