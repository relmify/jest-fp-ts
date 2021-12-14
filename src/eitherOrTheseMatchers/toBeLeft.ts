import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isEitherOrThese } from '../../predicates';
import { isLeft } from '../../eitherOrThese/eitherOrThese';
import { EitherOrThese } from '../../eitherOrThese/eitherOrThese';
import { printReceivedValue } from '../../eitherOrThese/print';

const passMessage = (received: EitherOrThese<unknown, unknown>) => () =>
  matcherHint('.not.toBeLeft', 'received', '') + '\n\n' + `${printReceivedValue(received)}`;

const failMessage = (received: unknown) => () => {
  return isEitherOrThese(received)
    ? matcherHint('.toBeLeft', 'received', '') + '\n\n' + `${printReceivedValue(received)}`
    : matcherHint('.toBeLeft', 'received', '') +
        '\n\n' +
        'Received value is not an Either or These.\n' +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Left.
       */
      readonly toBeLeft: () => R;
    }
    interface Expect {
      /**
       * Used to check if a value is a Left.
       */
      readonly toBeLeft: () => any;
    }
  }
}

/**
 * Check that the received value is a Left
 */
export const toBeLeft = (received: unknown): any => {
  const pass = isEitherOrThese(received) && isLeft(received);
  return {
    pass,
    message: pass ? passMessage(received) : failMessage(received),
  };
};
