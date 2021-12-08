import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { Option } from 'fp-ts/lib/Option';
import { applyPredicate } from '../../option/applyPredicate';
import { isOption, strictEquals } from '../../predicates';
import { diffReceivedSome } from '../../option/print';

const passMessage = (expected: unknown) => () =>
  matcherHint('.not.toStrictEqualSome', 'received', 'expectedSome') +
  '\n\n' +
  `Expected Some: not ${printExpected(expected)}`;

const failMessage = (received: unknown, expected: unknown) => () => {
  return isOption(received)
    ? matcherHint('.toStrictEqualSome', 'received', 'expectedSome') +
        '\n\n' +
        diffReceivedSome(received, expected)
    : matcherHint('.toStrictEqualSome', 'received', 'expectedSome') +
        '\n\n' +
        'Received value is not an Option.\n' +
        `Expected Some: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

/**
 * Check that the supplied value is a Some that matches the expected value
 */
export const toStrictEqualSome = (received: unknown, expected: unknown): any => {
  const predicate = strictEquals(expected);
  const pass = isOption(received) && applyPredicate(predicate)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
