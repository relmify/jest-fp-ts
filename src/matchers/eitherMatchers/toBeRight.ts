import { matcherHint } from 'jest-matcher-utils';
import { Either, isRight } from 'fp-ts/lib/Either';

/* istanbul ignore next */
const passMessage = () => () =>
  matcherHint('.not.toBeRight', 'received', '') +
  '\n\n' +
  'Expected Either not to be Right, received Right.';

/* istanbul ignore next */
const failMessage = () => () =>
  matcherHint('.toBeRight', 'received', '') +
  '\n\n' +
  'Expected Either to be Right, received Left.';

/**
 * Checked that the supplied Either is a Right
 */
export const toBeRight = (received: Either<unknown, unknown>): any => {
  const pass = isRight(received);

  return {
    pass: pass,
    message: pass ? passMessage() : failMessage(),
  };
};
