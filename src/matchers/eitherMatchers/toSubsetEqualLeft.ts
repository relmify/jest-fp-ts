import { matcherHint, printExpected } from 'jest-matcher-utils';
import { Either } from 'fp-ts/lib/Either';
import { applyPredicateLeft, subsetEquals } from '../../predicates';
import { diffReceivedLeft } from '../../either/print';

// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       readonly toSubsetEqualLeft: (expected: unknown) => CustomMatcherResult;
//     }
//     interface Expect {
//       readonly toSubsetEqualLeft: (expected: unknown) => CustomMatcherResult;
//     }
//   }
// }

const passMessage = <L>(expected: L) => () =>
  matcherHint('.not.toSubsetEqualLeft', 'received', 'expectedLeft') +
  '\n\n' +
  'Expected Either not to equal left:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  "But it's the same.";

const failMessage = <L>(received: Either<L, unknown>, expected: L) => () => {
  return (
    matcherHint('.toSubsetEqualLeft', 'received', 'expectedLeft') +
    '\n\n' +
    diffReceivedLeft(received, expected)
  );
};

/**
 * Check that the received Either is a Left that contains an object that has a subset
 * of properties equal to the properties in the expected object.
 *
 * If an array of objects is expected, checks that the received object is a Left
 * whose value is an array of objects the same length as the expected array,
 * and that each object in the received array has a subset of properties equal to
 * to the properties in the corresponding expected object.
 */
export const toSubsetEqualLeft = <L>(received: Either<L, unknown>, expected: L): any => {
  const predicate = subsetEquals(expected);
  const pass = applyPredicateLeft(predicate as (value: unknown) => boolean)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
