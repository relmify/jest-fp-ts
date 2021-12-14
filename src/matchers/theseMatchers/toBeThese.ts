import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isThese } from '../../predicates';
import { printReceivedValue } from '../../eitherOrThese/print';
import { These } from 'fp-ts/lib/These';

const passMessage = (received: These<unknown, unknown>) => () =>
  matcherHint('.not.toBeThese', 'received', '') + '\n\n' + `${printReceivedValue(received)}`;

const failMessage = (received: unknown) => () =>
  matcherHint('.toBeThese', 'received', '') + '\n\n' + `Received: ${printReceived(received)}`;

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is consistent with a These. In other words, this
       * matcher confirms that the value is a Left, a Right, or a Both.
       *
       * Note that a Left or a Right value is also consistent with an Either and would also pass a
       * `.toBeEither()` test.
       */
      readonly toBeThese: () => R;
    }
    interface Expect {
      /**
       * Used to check if a value is consistent with a These. In other words, this
       * matcher confirms that the value is a Left, a Right, or a Both.
       *
       * Note that a Left or a Right value is also consistent with an Either and would also pass a
       * `.toBeEither()` test.
       */
      readonly toBeThese: () => any;
    }
  }
}

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
