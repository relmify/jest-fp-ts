import { Option, fold } from 'fp-ts/lib/Option';
import { printExpected, printReceived, printDiffOrStringify } from 'jest-matcher-utils';

/**
 * Construct a string that either indicates a None was received or prints the value of the Some was received
 */
export function printReceivedOption(received: Option<unknown>, addPadding = false): string {
  const padding = addPadding ? '    ' : '';
  return fold(
    () => `Received None`,
    (some) => `Received Some: ` + padding + `${printReceived(some)}`,
  )(received);
}

/**
 * Construct a string that shows the difference between a received and expected Some value
 */
export function diffReceivedSome(received: Option<unknown>, expected: unknown): string {
  return fold(
    () => `Expected Some: ${printExpected(expected)}\n` + printReceivedOption(received),
    (some) => printDiffOrStringify(expected, some, 'Expected Some', 'Received Some', true),
  )(received);
}
