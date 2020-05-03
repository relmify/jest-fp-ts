import { matcherHint, printExpected } from 'jest-matcher-utils';
import { Either } from 'fp-ts/lib/Either';
import { matches, applyPredicateLeft } from '../../predicates';
import { printReceivedLeft } from '../../either/print';

declare global {
  namespace jest {
    interface Matchers<R> {
      readonly toMatchLeft: (expected: unknown) => CustomMatcherResult;
    }
    interface Expect {
      readonly toMatchLeft: (expected: unknown) => CustomMatcherResult;
    }
  }
}

const passMessage = <L>(recieved: Either<L, unknown>, expected: RegExp | Partial<L>) => () =>
  matcherHint('.not.toMatchLeft', 'received', 'expectedLeft') +
  '\n\n' +
  'Expected Either not to match left:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  printReceivedLeft(recieved);

const failMessage = <L>(actual: Either<L, unknown>, expected: RegExp | Partial<L>) => () =>
  matcherHint('.toMatchLeft', 'received', 'expectedLeft') +
  '\n\n' +
  'Expected Either to match left:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  printReceivedLeft(actual);

/**
 * Used to check that a value is a Left with a string value that either
 * contains the expected string or that matches the supplied regular expression.
 */
export const toMatchLeft = (
  received: Either<string, unknown>,
  expected: string | RegExp,
): jest.CustomMatcherResult => {
  const predicate = matches(expected);
  const pass = applyPredicateLeft(predicate as (value: unknown) => boolean)(received);

  return {
    pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
