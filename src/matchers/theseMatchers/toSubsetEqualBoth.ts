import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { subsetEquals, isThese } from '../../predicates';
import { applyPredicateBoth } from '../../These/applyPredicate';
import { diffReceivedBoth } from '../../These/print';

const passMessage = (expectedLeft: unknown, expectedRight: unknown) => () =>
  matcherHint('.not.toSubsetEqualBoth', 'received', 'expectedBoth') +
  '\n\n' +
  `Expected Both: not \n` +
  `  Left: ${printExpected(expectedLeft)}\n` +
  `  Right: ${printExpected(expectedRight)}`;

const failMessage = (received: unknown, expectedLeft: unknown, expectedRight: unknown) => () => {
  return isThese(received)
    ? matcherHint('.toSubsetEqualBoth', 'received', 'expectedLeft, expectedRight') +
        '\n\n' +
        diffReceivedBoth(received, expectedLeft, expectedRight, true)
    : matcherHint('.toSubsetEqualBoth', 'received', 'expectedLeft, expectedRight') +
        '\n\n' +
        'Received value is not a These.\n' +
        `Expected Both:\n` +
        `  Left: ${printExpected(expectedLeft)}\n` +
        `  Right: ${printExpected(expectedRight)}\n` +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used to check if a value is a Both whose left and right values equal or subset match the
       * `expectedLeft` and `expectedRight` values.
       *
       * A subset match passes when a received value is an object with a subset of properties that
       * match the expected object. The received value must contain all of the expected properties,
       * and may contain more than the expected properties.
       *
       * Note that an empty expected object will match against any received object.
       *
       * If an array is passed as an expected value, each element in the expected array is compared
       * to the corresponding element in the received array. Both arrays must be the same length,
       * and each comparison must succeed in order to pass.
       *
       * Note: `toSubsetEqualSome(value)` is similar to Jest's `toMatchObject(object)` except it
       * works with both objects and basic types.
       */
      readonly toSubsetEqualBoth: (expectedLeft: unknown, expectedRight: unknown) => R;
    }
    interface Expect {
      /**
       * Used to check if a value is a Both whose left and right values equal or subset match the
       * `expectedLeft` and `expectedRight` values.
       *
       * A subset match passes when a received value is an object with a subset of properties that
       * match the expected object. The received value must contain all of the expected properties,
       * and may contain more than the expected properties.
       *
       * Note that an empty expected object will match against any received object.
       *
       * If an array is passed as an expected value, each element in the expected array is compared
       * to the corresponding element in the received array. Both arrays must be the same length,
       * and each comparison must succeed in order to pass.
       *
       * Note: `toSubsetEqualSome(value)` is similar to Jest's `toMatchObject(object)` except it
       * works with both objects and basic types.
       */
      readonly toSubsetEqualBoth: (expectedLeft: unknown, expectedRight: unknown) => any;
    }
  }
}

/**
 * Check if a value is a Both whose left and right values equal or subset match the `expectedLeft`
 * `expectedRight` values.
 */
export const toSubsetEqualBoth = (
  received: unknown,
  expectedLeft: unknown,
  expectedRight: unknown,
): any => {
  const predicateLeft = subsetEquals(expectedLeft);
  const predicateRight = subsetEquals(expectedRight);
  const pass = isThese(received) && applyPredicateBoth(predicateLeft, predicateRight)(received);

  const message = pass
    ? passMessage(expectedLeft, expectedRight)
    : failMessage(received, expectedLeft, expectedRight);

  return {
    pass,
    message,
  };
};
