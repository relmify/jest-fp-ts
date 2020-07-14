import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isOption } from '../../predicates';

const passMessage = (received: unknown) => () =>
  matcherHint('.not.toBeOption', 'received', '') +
  '\n\n' +
  'Unexpected Option, received:\n' +
  `  ${printReceived(received)}`;

const failMessage = (received: unknown) => () =>
  matcherHint('.toBeOption', 'received', '') +
  '\n\n' +
  'Expected Option, received:\n' +
  `  ${printReceived(received)}`;

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
