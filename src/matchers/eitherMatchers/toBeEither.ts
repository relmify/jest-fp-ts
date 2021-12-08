import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isEither } from '../../predicates';
import { printReceivedValue } from '../../either/print';
import { Either } from 'fp-ts/lib/Either';

const passMessage = (received: Either<unknown, unknown>) => () =>
  matcherHint('.not.toBeEither', 'received', '') + '\n\n' + `${printReceivedValue(received)}`;

const failMessage = (received: unknown) => () =>
  matcherHint('.toBeEither', 'received', '') + '\n\n' + `Received: ${printReceived(received)}`;

/**
 * Matches if the received value is an Either
 */
export const toBeEither = (received: unknown): any => {
  const pass = isEither(received);
  return {
    pass,
    message: pass ? passMessage(received as Either<unknown, unknown>) : failMessage(received),
  };
};
