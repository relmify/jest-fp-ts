import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { applyPredicateLeft } from '../../eitherOrThese/applyPredicate';
import { subsetEquals, equals, isEitherOrThese } from '../../predicates';
import { diffReceivedLeft, printReceivedValue } from '../../eitherOrThese/print';
import { EitherOrThese } from '../../eitherOrThese/eitherOrThese';
import { left } from 'fp-ts/lib/These';

const passMessage = (received: EitherOrThese<unknown, unknown>, expected: unknown) => () => {
  const hint = matcherHint('.not.toSubsetEqualLeft', 'received', 'expectedLeft') + '\n\n';
  const expectedValue = `Expected Left: not ${printExpected(expected)}`;
  const receivedValue = equals(left(expected))(received)
    ? ''
    : `\n${printReceivedValue(received, true)}`;
  return hint + expectedValue + receivedValue;
};

const failMessage = (received: unknown, expected: unknown) => () => {
  return isEitherOrThese(received)
    ? matcherHint('.toSubsetEqualLeft', 'received', 'expectedLeft') +
        '\n\n' +
        diffReceivedLeft(received, expected)
    : matcherHint('.toSubsetEqualLeft', 'received', 'expectedLeft') +
        '\n\n' +
        'Received value is not an Either or These.\n' +
        `Expected Left: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

/**
 * @summary
 * Check that the received value is a Left whose value equals the expected value, or whose value is
 * an object with a subset of properties that match the expected object.
 *
 * @description
 * Objects match if the received object contains all of the properties in the expected object. The
 * received object may contain extra properties that are not in the expected object and still match.
 *
 * If an array is passed, each element in the expected array is compared to the corresponding
 * element in the received array. Both arrays must be the same length, and each comparison must
 * succeed in order to pass.
 *
 * Note: `toSubsetEqualLeft(value)` is similar to Jest's `toMatchObject(object)` except it works
 * with both objects and basic types.
 */
export const toSubsetEqualLeft = (received: unknown, expected: unknown): any => {
  const predicate = subsetEquals(expected);
  const pass = isEitherOrThese(received) && applyPredicateLeft(predicate)(received);

  return {
    pass: pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
