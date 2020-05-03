import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isEither } from '../../predicates';

declare global {
  namespace jest {
    interface Matchers<R> {
      readonly toBeEither: () => CustomMatcherResult;
    }
    interface Expect {
      readonly toBeEither: () => CustomMatcherResult;
    }
  }
}

const passMessage = (received: unknown) => () =>
  matcherHint('.not.toBeEither', 'received', '') +
  '\n\n' +
  'Unexpected Either, received:\n' +
  `  ${printReceived(received)}`;

const failMessage = (received: unknown) => () =>
  matcherHint('.toBeEither', 'received', '') +
  '\n\n' +
  'Expected Either, received:\n' +
  `  ${printReceived(received)}`;

/**
 * Matches if the received value is an Either
 */
export const toBeEither = (received: unknown): jest.CustomMatcherResult => {
  const pass = isEither(received);
  return {
    pass,
    message: pass ? passMessage(received) : failMessage(received),
  };
};
