import { matcherHint, printExpected } from 'jest-matcher-utils';
import { Either } from 'fp-ts/lib/Either';
import { applyPredicate } from '../../either/applyPredicate';
import { subsetEquals } from '../../predicates';
import { diffReceivedRight } from '../../either/print';

const passMessage = <R>(expected: R) => () =>
  matcherHint('.not.toSubsetEqualRight', 'received', 'expectedRight') +
  '\n\n' +
  'Expected Either not to equal right:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  "But it's the same.";

const failMessage = <R>(received: Either<unknown, R>, expected: R) => () =>
  matcherHint('.toSubsetEqualRight', 'received', 'expectedRight') +
  '\n\n' +
  diffReceivedRight(received, expected);

/**
 * Check that the received Either is a Right that contains an object that has a subset
 * of properties equal to the properties in the expected object.
 *
 * If an array of objects is expected, checks that the received object is a Right
 * whose value is an array of objects the same length as the expected array,
 * and that each object in the received array has a subset of properties equal to
 * to the properties in the corresponding expected object.
 */
export const toSubsetEqualRight = <R>(received: Either<unknown, R>, expected: R): any => {
  const predicate = subsetEquals(expected);
  const pass = applyPredicate(predicate as (value: unknown) => boolean)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
