import { matcherHint, printExpected } from 'jest-matcher-utils';
import { Option } from 'fp-ts/lib/Option';
import { applyPredicate } from '../../option/applyPredicate';
import { equals } from '../../predicates';
import { diffReceivedSome } from '../../option/print';

const passMessage = <R>(expected: R) => () =>
  matcherHint('.not.toEqualSome', 'received', 'expectedSome') +
  '\n\n' +
  'Expected Option not to equal Some:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  "But it's the same.";

const failMessage = <R>(received: Option<unknown>, expected: R) => () =>
  matcherHint('.toEqualSome', 'received', 'expectedSome') +
  '\n\n' +
  diffReceivedSome(received, expected);

/**
 * Check that the supplied Option is a Some that matches the expected value
 */
export const toEqualSome = <R>(received: Option<unknown>, expected: R): any => {
  const predicate = equals(expected);
  const pass = applyPredicate(predicate as (value: unknown) => boolean)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
