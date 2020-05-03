import { matcherHint, printReceived } from 'jest-matcher-utils';
import { Either } from 'fp-ts/lib/Either';
import { matchesObject, applyPredicate } from '../../predicates';
import { printReceivedRight } from '../../either/print';

declare global {
  namespace jest {
    interface Matchers<R> {
      readonly toMatchRightObject: (expected: unknown) => CustomMatcherResult;
    }
    interface Expect {
      readonly toMatchRightObject: (expected: unknown) => CustomMatcherResult;
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
 * Used to check that a received value is a Right with an object value that is the same as,
 * or a superset of the expected object.
 */
export const toMatchRightObject = <R>(
  received: Either<unknown, R>,
  expected: Partial<R>,
): jest.CustomMatcherResult => {
  const predicate = matchesObject(expected);
  const pass = applyPredicate(predicate as (value: unknown) => boolean)(received);

  return {
    pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
