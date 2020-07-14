import { matcherHint } from 'jest-matcher-utils';
import { Option, isSome } from 'fp-ts/lib/Option';

/* istanbul ignore next */
const passMessage = () => () =>
  matcherHint('.not.toBeSome', 'received', '') +
  '\n\n' +
  'Expected Option not to be Some, received Some.';

/* istanbul ignore next */
const failMessage = () => () =>
  matcherHint('.toBeSome', 'received', '') + '\n\n' + 'Expected Option to be Some, received None.';

/**
 * Checked that the supplied Option is a Some
 */
export const toBeSome = (received: Option<unknown>): any => {
  const pass = isSome(received);

  return {
    pass: pass,
    message: pass ? passMessage() : failMessage(),
  };
};
