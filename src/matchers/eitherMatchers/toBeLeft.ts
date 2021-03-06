import { matcherHint } from 'jest-matcher-utils';
import { Either, isLeft } from 'fp-ts/lib/Either';

const passMessage = () => () =>
  matcherHint('.not.toBeLeft', 'received', '') +
  '\n\n' +
  'Expected Either not to be Left. Received Left.';

const failMessage = () => () =>
  matcherHint('.toBeLeft', 'received', '') + '\n\n' + 'Expected Either to be Left. Received Right.';

/**
 * Check that the supplied Either is a Left
 */
export const toBeLeft = (received: Either<unknown, unknown>): any => {
  const pass: boolean = isLeft(received);
  return {
    pass,
    message: pass ? passMessage() : failMessage(),
  };
};
