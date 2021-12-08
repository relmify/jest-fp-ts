import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { Option, some } from 'fp-ts/lib/Option';
import { applyPredicate } from '../../option/applyPredicate';
import { isOption, subsetEquals, equals } from '../../predicates';
import { diffReceivedSome, printReceivedOption } from '../../option/print';

const passMessage = (received: Option<unknown>, expected: unknown) => () => {
  const hint = matcherHint('.not.toSubsetEqualSome', 'received', 'expectedSome') + '\n\n';
  const expectedValue = `Expected Some: not ${printExpected(expected)}`;
  const receivedValue = equals(some(expected))(received)
    ? ''
    : `\n${printReceivedOption(received)}`;
  return hint + expectedValue + receivedValue;
};

const failMessage = (received: unknown, expected: unknown) => () => {
  return isOption(received)
    ? matcherHint('.toSubsetEqualSome', 'received', 'expectedSome') +
        '\n\n' +
        diffReceivedSome(received, expected)
    : matcherHint('.toSubsetEqualSome', 'received', 'expectedSome') +
        '\n\n' +
        'Received value is not an Option.\n' +
        `Expected Some: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

/**
 * @summary
 * Check that the received value is a Some whose value equals the expected value, or whose value is
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
 * Note: `toSubsetEqualSome(value)` is similar to Jest's `toMatchObject(object)` except it works
 * with both objects and basic types.
 */
export const toSubsetEqualSome = (received: unknown, expected: unknown): any => {
  const predicate = subsetEquals(expected);
  const pass = isOption(received) && applyPredicate(predicate)(received);

  return {
    pass: pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
