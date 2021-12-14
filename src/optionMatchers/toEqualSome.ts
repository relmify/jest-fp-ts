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

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Some that contains a value that equals an expected value. See
       * Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue) documentationfor
       * information about how the `.toEqual()` comparison works.
       */
      readonly toEqualSome: (expected: unknown) => R;
    }
    interface Expect {
      /**
       * Used to check if a value is a Some that contains a value that equals an expected value. See
       * Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue) documentationfor
       * information about how the `.toEqual()` comparison works.
       */
      readonly toEqualSome: (expected: unknown) => any;
    }
  }
}

/**
 * Check that the received value is a Some that equals the expected value
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
