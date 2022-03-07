import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isEither } from '../predicates';
import { printReceivedValue } from '../either/print';
import { Either } from 'fp-ts/lib/Either';

const passMessage = (received: Either<unknown, unknown>) => () =>
  matcherHint('.not.toBeEither', 'received', '') + '\n\n' + `${printReceivedValue(received)}`;

const failMessage = (received: unknown) => () =>
  matcherHint('.toBeEither', 'received', '') + '\n\n' + `Received: ${printReceived(received)}`;

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Use `.toBeEither()` to check if a value is consistent with an Either. In other words, this
       * matcher confirms that the value is a Left or a Right.
       *
       * Note that a Left or a Right value is also consistent with a These and would also pass a
       * `.toBeThese()` test.
       */
      readonly toBeEither: () => R;
    }
    interface Expect {
      /**
       * Use `.toBeEither()` to check if a value is consistent with an Either. In other words, this
       * matcher confirms that the value is a Left or a Right.
       *
       * Note that a Left or a Right value is also consistent with a These and would also pass a
       * `.toBeThese()` test.
       */
      readonly toBeEither: () => any;
    }
  }
}

/**
 * Check that the received value is an Either
 */
export const toBeEither = (received: unknown): any => {
  const pass = isEither(received);
  return {
    pass,
    message: pass ? passMessage(received as Either<unknown, unknown>) : failMessage(received),
  };
};
