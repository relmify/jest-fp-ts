import { matcherHint, printReceived } from 'jest-matcher-utils';
import { Either } from 'fp-ts/lib/Either';
import { matches, applyPredicate } from '../../predicates';
import { printReceivedRight } from '../../either/print';

declare global {
  namespace jest {
    interface Matchers<R> {
      readonly toMatchRight: (expected: unknown) => CustomMatcherResult;
    }
    interface Expect {
      readonly toMatchRight: (expected: unknown) => CustomMatcherResult;
    }
  }
}

const passMessage = <R>(
  received: Either<unknown, string | R>,
  expected: RegExp | Partial<R>,
) => () =>
  matcherHint('.not.toMatchRight', 'received', 'rightMatch') +
  '\n\n' +
  'Expected Either not to match right:\n' +
  `  ${printReceived(expected)}` +
  '\n\n' +
  printReceivedRight(received);

const failMessage = <R>(
  received: Either<unknown, string | R>,
  expected: RegExp | Partial<R>,
) => () =>
  matcherHint('.toMatchRight', 'received', 'rightMatch') +
  '\n\n' +
  'Expected Either to match right:\n' +
  `  ${printReceived(expected)}` +
  '\n\n' +
  printReceivedRight(received);

/**
 * Used to check that a value is a Right with a string value that either
 * contains the expected string or that matches the supplied regular expression.
 */
export const toMatchRight = (
  received: Either<unknown, string>,
  expected: string | RegExp,
): jest.CustomMatcherResult => {
  const predicate = matches(expected);
  const pass = applyPredicate(predicate as (value: unknown) => boolean)(received);

  return {
    pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
