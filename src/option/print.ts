import { Option, fold } from 'fp-ts/lib/Option';
import { printExpected, printReceived, diff } from 'jest-matcher-utils';

/**
 * Construct a string that either indicates a None was received or prints the value of the Some was received
 */
export function printReceivedOption(received: Option<unknown>, addPadding = false): string {
  const padding = addPadding ? '    ' : '';
  return fold(
    () => `Received a None`,
    (some) => `Received Some: ` + padding + `${printReceived(some)}`,
  )(received);
}

/**
 * Construct a string that shows the difference between a received and expected Some value
 */
export function diffReceivedSome(received: Option<unknown>, expected: unknown): string {
  return fold(
    () => `Expected Some: ${printExpected(expected)}\n` + printReceivedOption(received),
    (some) => {
      // `diff()` output can be:
      // - A string that includes '- Expected' that shows the difference between the expected and
      //   received values
      // - A string that includes 'Compared values have no visual difference.' that does not include
      //   the received value since it looks the same as the expected value.
      // - A string that includes 'Comparing two different types of values. Expected <expectedType>
      //   but received <receivedType>' that does not include the received value.
      // - `null` when comparing two numbers since diff() wouldn't add value compared to simply
      //   printing the expected and received values
      // - 'null` when one of the values is an asymmetric matcher
      const diffString = diff(expected, some) || '';
      return diffString.includes('- Expected') || diffString.includes('no visual difference')
        ? 'Difference from Some:\n' + '\n' + `${diffString}`
        : `Expected Some: ${printExpected(expected)}\n` + printReceivedOption(received);
    },
  )(received);
}
