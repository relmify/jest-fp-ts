import { These, fold } from 'fp-ts/lib/These';
import { printExpected, printReceived, diff } from 'jest-matcher-utils';
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
      `  Left: ${printExpected(expectedLeft)}\n` +
      `  Right: ${printExpected(expectedRight)}\n` +
      printReceivedValue(received),
    () =>
      `Expected Both:\n` +
      `  Left: ${printExpected(expectedLeft)}\n` +
      `  Right: ${printExpected(expectedRight)}\n` +
      printReceivedValue(received),
    (left, right) => {
      // There are several `diff()` output cases:
      // - A string that includes '- Expected' is returned showing the difference between the
      //   expected and received values
      // - A string that includes 'Compared values have no visual difference.' is returned and the
      //   received value is not displayed since it would not be meaningful.
      // - A string that includes 'Comparing two different types of values. Expected <expectedType>
      //   but received <receivedType>' is returned and the received value is not included
      // - `null` is returned when comparing two numbers - the note says diff() doesn't add value when you try to compare two
      //   numbers so it leaves it to you to print expected and received values
      // - 'null` is returned when one of the values is an asymmetric matcher
      // The diffstring can be used for the first two cases. The expected and received values should
      // be printed for the second two cases.
      const diffStringLeft = diff(expectedLeft, left) || '';
      const diffStringRight = diff(expectedRight, right) || '';
      const leftDiff = !predicate(expectedLeft)(left)
        ? diffStringLeft.includes('- Expected') || diffStringLeft.includes('no visual difference')
          ? '\nDifference from Left:\n' + '\n' + `${diffStringLeft}`
          : '\nDifference from Left:\n' +
            `\nExpected: ${printExpected(expectedLeft)}` +
            `\nReceived: ${printReceived(left)}`
        : '';
      const rightDiff = !predicate(expectedRight)(right)
        ? diffStringRight.includes('- Expected') || diffStringRight.includes('no visual difference')
          ? '\nDifference from Right:\n' + `\n${diffStringRight}`
          : '\nDifference from Right:\n' +
            `\nExpected: ${printExpected(expectedRight)}` +
            `\nReceived: ${printReceived(right)}`
        : '';
      const separator = leftDiff && rightDiff ? '\n' : '';
      const difference =
        leftDiff || rightDiff ? leftDiff + separator + rightDiff : 'No difference found.';
      return (
        `Expected Both:\n` +
        `  Left: ${printExpected(expectedLeft)}\n` +
        `  Right: ${printExpected(expectedRight)}\n` +
        difference
      );
    },
  )(received);
}
