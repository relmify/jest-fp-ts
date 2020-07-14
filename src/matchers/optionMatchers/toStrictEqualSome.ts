import { matcherHint, printExpected } from 'jest-matcher-utils';
import { Option } from 'fp-ts/lib/Option';
import { applyPredicate } from '../../option/applyPredicate';
import { strictEquals } from '../../predicates';
import { diffReceivedSome } from '../../option/print';

const passMessage = <R>(expected: R) => () =>
  matcherHint('.not.toStrictEqualSome', 'received', 'expectedSome') +
  '\n\n' +
  'Expected Option not to equal Some:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  "But it's the same.";

const failMessage = <R>(received: Option<unknown>, expected: R) => () =>
  matcherHint('.toStrictEqualSome', 'received', 'expectedSome') +
  '\n\n' +
  diffReceivedSome(received, expected);

/**
 * Check that the supplied Option is a Some that matches the expected value
 */
export const toStrictEqualSome = <R>(received: Option<unknown>, expected: R): any => {
  const predicate = strictEquals(expected);
  const pass = applyPredicate(predicate as (value: unknown) => boolean)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
