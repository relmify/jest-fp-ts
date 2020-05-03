import { matcherHint, printExpected } from 'jest-matcher-utils';
import { Either } from 'fp-ts/lib/Either';
import { applyPredicate, equals } from '../../predicates';
import { diffReceivedRight } from '../../either/print';

declare global {
  namespace jest {
    interface Matchers<R> {
      readonly toEqualRight: (expected: unknown) => CustomMatcherResult;
    }
    interface Expect {
      readonly toEqualRight: (expected: unknown) => CustomMatcherResult;
    }
  }
}

const passMessage = <R>(expected: R) => () =>
  matcherHint('.not.toEqualRight', 'received', 'expectedRight') +
  '\n\n' +
  'Expected Either not to equal right:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  "But it's the same.";

const failMessage = <R>(received: Either<unknown, R>, expected: R) => () =>
  matcherHint('.toEqualRight', 'received', 'expectedRight') +
  '\n\n' +
  diffReceivedRight(received, expected);

/**
 * Check that the supplied Either is a Right that matches the expected value
 */
export const toEqualRight = <R>(
  received: Either<unknown, R>,
  expected: R,
): jest.CustomMatcherResult => {
  const predicate = equals(expected);
  const pass = applyPredicate(predicate as (value: unknown) => boolean)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
