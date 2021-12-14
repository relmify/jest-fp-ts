import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isRight } from '../../eitherOrThese/eitherOrThese';
import { isEitherOrThese } from '../../predicates';
import { printReceivedValue } from '../../eitherOrThese/print';
import { EitherOrThese } from '../../eitherOrThese/eitherOrThese';

const passMessage = (received: EitherOrThese<unknown, unknown>) => () =>
  matcherHint('.not.toBeRight', 'received', '') + '\n\n' + `${printReceivedValue(received)}`;

const failMessage = (received: unknown) => () => {
  return isEitherOrThese(received)
    ? matcherHint('.toBeRight', 'received', '') + '\n\n' + `${printReceivedValue(received)}`
    : matcherHint('.toBeRight', 'received', '') +
        '\n\n' +
        'Received value is not an Either or These.\n' +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Right.
       */
      readonly toBeRight: () => R;
    }
    interface Expect {
      /**
       * Used to check if a value is a Right.
       */
      readonly toBeRight: () => any;
    }
  }
}

/**
 * Checked that the received value is a Right
 */
export const toBeRight = (received: unknown): any => {
  const pass = isEitherOrThese(received) && isRight(received);

  return {
    pass: pass,
    message: pass ? passMessage(received) : failMessage(received),
  };
};
