import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { isEitherOrThese, isError, matches, equals } from '../predicates';
import { isLeft } from '../eitherOrThese/eitherOrThese';
import { EitherOrThese } from '../eitherOrThese/eitherOrThese';
import { printReceivedValue, printReceivedLeftErrorValue } from '../eitherOrThese/print';
import { left } from 'fp-ts/lib/Either';

const passMessage =
  (received: EitherOrThese<unknown, unknown>, expected: string | RegExp) => () => {
    const hint =
      matcherHint('.not.toBeLeftErrorMatching', 'received', 'expectedErrorMessage') + '\n\n';
    const expectedString = typeof expected === 'string' ? expected : undefined;
    const expectedValue = `Expected Left Error: not ${printExpected(expected)}`;
    const receivedValue = equals(left(new Error(expectedString)))(received)
      ? ''
      : `\n${printReceivedLeftErrorValue(received)}`;
    return hint + expectedValue + receivedValue;
  };

const failMessage = (received: unknown, expected: string | RegExp) => () => {
  const hint = matcherHint('.toBeLeftErrorMatching', 'received', 'expectedErrorMessage');
  const expectedValue = `Expected Left Error: ${printExpected(expected)}\n`;
  return isEitherOrThese(received)
    ? isLeft(received)
      ? isError(received.left)
        ? hint +
          '\n\n' +
          expectedValue +
          `Received Left Error: ${printReceived(received.left.message)}`
        : hint +
          '\n\n' +
          `Received Left value is not an Error.\n` +
          expectedValue +
          `${printReceivedValue(received)}`
      : hint +
        '\n\n' +
        `Received value is not a Left.\n` +
        expectedValue +
        `${printReceivedValue(received)}`
    : hint +
        '\n\n' +
        'Received value is not an Either or These.\n' +
        expectedValue +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Left Error whose `message` property contains the supplied
       * string or matches the supplied regular expression.
       */
      readonly toBeLeftErrorMatching: (expected: string | RegExp) => R;
    }
    interface Expect {
      /**
       * Used to check if a value is a Left Error whose `message` property contains the supplied
       * string or matches the supplied regular expression.
       */
      readonly toBeLeftErrorMatching: (expected: string | RegExp) => any;
    }
  }
}

/**
 * Check that the received value is a Left Error whose `message` property contains the supplied
 * string or matches the supplied regular expression.
 */
export const toBeLeftErrorMatching = (received: unknown, expected: string | RegExp): any => {
  const pass =
    isEitherOrThese(received) &&
    isLeft(received) &&
    isError(received.left) &&
    matches(received.left.message, expected);
  return {
    pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
