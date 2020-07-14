import { matcherHint, printExpected } from 'jest-matcher-utils';
import { Option } from 'fp-ts/lib/Option';
import { applyPredicate } from '../../option/applyPredicate';
import { subsetEquals } from '../../predicates';
import { diffReceivedSome } from '../../option/print';

const passMessage = <R>(expected: R) => () =>
  matcherHint('.not.toSubsetEqualSome', 'received', 'expectedSome') +
  '\n\n' +
  'Expected Option not to equal Some:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  "But it's the same.";

const failMessage = <R>(received: Option<unknown>, expected: R) => () =>
  matcherHint('.toSubsetEqualSome', 'received', 'expectedSome') +
  '\n\n' +
  diffReceivedSome(received, expected);

/**
 * Check that the received Option is a Some that contains an object that has a subset
 * of properties equal to the properties in the expected object.
 *
 * If an array of objects is expected, checks that the received object is a Some
 * whose value is an array of objects the same length as the expected array,
 * and that each object in the received array has a subset of properties equal to
 * to the properties in the corresponding expected object.
 */
export const toSubsetEqualSome = <R>(received: Option<unknown>, expected: R): any => {
  const predicate = subsetEquals(expected);
  const pass = applyPredicate(predicate as (value: unknown) => boolean)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
