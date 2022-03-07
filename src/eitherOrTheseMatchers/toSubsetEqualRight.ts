import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { applyPredicateRight } from '../eitherOrThese/applyPredicate';
import { equals, subsetEquals, isEitherOrThese } from '../predicates';
import { diffReceivedRight, printReceivedRight } from '../eitherOrThese/print';
import { EitherOrThese } from '../eitherOrThese/eitherOrThese';
import { right } from 'fp-ts/lib/Either';

const passMessage = (received: EitherOrThese<unknown, unknown>, expected: unknown) => () => {
  const hint = matcherHint('.not.toSubsetEqualRight', 'received', 'expectedRight') + '\n\n';
  const expectedValue = `Expected Right: not ${printExpected(expected)}`;
  const receivedValue = equals(right(expected))(received)
    ? ''
    : `\n${printReceivedRight(received, true)}`;
  return hint + expectedValue + receivedValue;
};

const failMessage = (received: unknown, expected: unknown) => () => {
  return isEitherOrThese(received)
    ? matcherHint('.toSubsetEqualRight', 'received', 'expectedRight') +
        '\n\n' +
        diffReceivedRight(received, expected)
    : matcherHint('.toSubsetEqualRight', 'received', 'expectedRight') +
        '\n\n' +
        'Received value is not an Either or These.\n' +
        `Expected Right: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if he received value is a Right whose value equals the expected value, or
       * whose value is an object with a subset of properties that match the expected object.
       *
       * Objects match if the received object contains all of the properties in the expected object.
       * The received object may contain extra properties that are not in the expected object and
       * still match.
       *
       * Note that an empty expected object will match against any received Right whose value is an
       * object.
       *
       * If an array is passed, each element in the expected array is compared to the corresponding
       * element in the received array. Both arrays must be the same length, and each comparison
       * must succeed in order to pass.
       *
       * Note: `.toSubsetEqualRight(value)` is similar to Jest's `.toMatchObject(object)` except it
       * works with both objects and basic types.
       */
      readonly toSubsetEqualRight: (expected: unknown) => R;
    }
    interface Expect {
      /**
       * Used to check if he received value is a Right whose value equals the expected value, or
       * whose value is an object with a subset of properties that match the expected object.
       *
       * Objects match if the received object contains all of the properties in the expected object.
       * The received object may contain extra properties that are not in the expected object and
       * still match.
       *
       * Note that an empty expected object will match against any received Right whose value is an
       * object.
       *
       * If an array is passed, each element in the expected array is compared to the corresponding
       * element in the received array. Both arrays must be the same length, and each comparison
       * must succeed in order to pass.
       *
       * Note: `.toSubsetEqualRight(value)` is similar to Jest's `.toMatchObject(object)` except it
       * works with both objects and basic types.
       */
      readonly toSubsetEqualRight: (expected: unknown) => any;
    }
  }
}

/**
 * Check that the received value is a Right whose value equals the expected value, or whose value is
 * an object with a subset of properties that match the expected object.
 */
export const toSubsetEqualRight = (received: unknown, expected: unknown): any => {
  const predicate = subsetEquals(expected);
  const pass = isEitherOrThese(received) && applyPredicateRight(predicate)(received);

  return {
    pass: pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
