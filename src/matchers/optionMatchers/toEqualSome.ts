import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { applyPredicate } from '../../option/applyPredicate';
import { isOption, equals } from '../../predicates';
import { diffReceivedSome } from '../../option/print';

const passMessage = (expected: unknown) => () =>
  matcherHint('.not.toEqualSome', 'received', 'expectedSome') +
  '\n\n' +
  `Expected Some: not ${printExpected(expected)}`;

const failMessage = (received: unknown, expected: unknown) => () => {
  return isOption(received)
    ? matcherHint('.toEqualSome', 'received', 'expectedSome') +
        '\n\n' +
        diffReceivedSome(received, expected)
    : matcherHint('.toEqualSome', 'received', 'expectedSome') +
        '\n\n' +
        'Received value is not an Option.\n' +
        `Expected Some: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

/**
 * Check that the supplied value is a Some that matches the expected value
 */
export const toEqualSome = (received: unknown, expected: unknown): any => {
  const predicate = equals(expected);
  const pass =
    isOption(received) && applyPredicate(predicate as (value: unknown) => boolean)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
