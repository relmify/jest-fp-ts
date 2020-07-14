import { Option, fold } from 'fp-ts/lib/Option';
import { printExpected, printReceived, diff } from 'jest-matcher-utils';

/**
 * Construct a string that either indicates a None was received or prints the value of the Some was received
 */
export function printReceivedOption(received: Option<unknown>): string {
  return fold(
    () => `Received a None.`,
    (some) => `Received a Some:` + '\n' + `  ${printReceived(some)}`,
  )(received);
}

/**
 * Construct a string that shows the difference between a received and expected Some value
 */
export function diffReceivedSome(received: Option<unknown>, expected: unknown): string {
  return fold(
    () =>
      'Expected Option to equal Some:\n' +
      `  ${printExpected(expected)}` +
      '\n\n' +
      printReceivedOption(received),
    (some) => {
      const diffString = diff(expected, some) || '';
      return diffString.includes('- Expect')
        ? `Difference from Some:\n\n${diffString}`
        : 'Expected Option to equal Some:\n' +
            `  ${printExpected(expected)}` +
            '\n\n' +
            printReceivedOption(received);
    },
  )(received);
}
