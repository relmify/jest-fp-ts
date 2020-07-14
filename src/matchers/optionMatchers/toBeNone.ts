import { matcherHint } from 'jest-matcher-utils';
import { Option, isNone } from 'fp-ts/lib/Option';

const passMessage = () => () =>
  matcherHint('.not.toBeNone', 'received', '') +
  '\n\n' +
  'Expected Option not to be None. Received None.';

const failMessage = () => () =>
  matcherHint('.toBeNone', 'received', '') + '\n\n' + 'Expected Option to be None. Received Some.';

/**
 * Check that the supplied Option is a None
 */
export const toBeNone = (received: Option<unknown>): any => {
  const pass: boolean = isNone(received);
  return {
    pass,
    message: pass ? passMessage() : failMessage(),
  };
};
