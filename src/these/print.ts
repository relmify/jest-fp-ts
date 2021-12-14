import { These, fold } from 'fp-ts/lib/These';
import { printExpected, printDiffOrStringify } from 'jest-matcher-utils';
import { printReceivedValue } from '../eitherOrThese/print';
import { equals, strictEquals } from '../predicates/equals';

/**
 * Construct a string that shows the difference between a received and expected Both value
 */
export function diffReceivedBoth(
  received: These<unknown, unknown>,
  expectedLeft: unknown,
  expectedRight: unknown,
  isStrict = false,
): string {
  const predicate = isStrict ? strictEquals : equals;
  return fold(
    () =>
      `Expected Both:\n` +
      `Left: ${printExpected(expectedLeft)}\n` +
      `Right: ${printExpected(expectedRight)}\n` +
      '\n' +
      printReceivedValue(received),
    () =>
      `Expected Both:\n` +
      `Left: ${printExpected(expectedLeft)}\n` +
      `Right: ${printExpected(expectedRight)}\n` +
      '\n' +
      printReceivedValue(received),
    (left, right) => {
      const diffStringLeft = printDiffOrStringify(expectedLeft, left, 'Expected', 'Received', true);
      const diffStringRight = printDiffOrStringify(
        expectedRight,
        right,
        'Expected',
        'Received',
        true,
      );
      const leftDiff = !predicate(expectedLeft)(left)
        ? '\nDifference from Left:\n' + `${diffStringLeft}`
        : '';
      const rightDiff = !predicate(expectedRight)(right)
        ? '\nDifference from Right:\n' + `${diffStringRight}`
        : '';
      const separator = leftDiff && rightDiff ? '\n' : '';
      const difference =
        leftDiff || rightDiff ? leftDiff + separator + rightDiff : '\nNo difference found.';
      return (
        `Expected Both:\n` +
        `Left: ${printExpected(expectedLeft)}\n` +
        `Right: ${printExpected(expectedRight)}\n` +
        difference
      );
    },
  )(received);
}
