import { matcherHint, printReceived } from 'jest-matcher-utils';
import { isEither } from '../../predicates';

// declare global {
//   export namespace jest {
//     export interface Matchers<R> {
//       readonly toBeEither: () => R;
//     }
//     export interface Expect {
//       readonly toBeEither: () => any;
//     }
//   }
// }

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
export const toBeEither = (received: unknown): any => {
  const pass = isEither(received);
  return {
    pass,
    message: pass ? passMessage(received) : failMessage(received),
  };
};
