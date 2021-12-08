import { EitherOrThese, fold } from './eitherOrThese';
import { printExpected, printReceived, diff } from 'jest-matcher-utils';

/**
 * Construct a string that shows the received Either or These value.
 *
 * Optionally add padding to align with a previous `Expected Left: not `
 * or `Expected Right: not`
 */
export function printReceivedValue(
  received: EitherOrThese<unknown, unknown>,
  addPadding = false,
): string {
  const padding = addPadding ? '    ' : '';
  return fold(
    (left) => `Received Left: ` + padding + `${printReceived(left)}`,
    (right) => `Received Right: ` + padding + `${printReceived(right)}`,
    (left, right) => `Received Both:
  Left: ${printReceived(left)}
  Right: ${printReceived(right)}`,
  )(received);
}

/**
 * Construct a string that either shows the received Left value or indicates that a Right or Both
 * was received.
 */
export function printReceivedLeft(
  received: EitherOrThese<unknown, unknown>,
  addPadding = false,
): string {
  const padding = addPadding ? '    ' : '';
  return fold(
    (left) => `Received Left: ` + padding + `${printReceived(left)}`,
    () => `Received a Right.`,
    () => `Received a Both.`,
  )(received);
}

/**
 * Construct a string that either shows the received Right value or indicates that a Left or Both
 * was received.
 */
export function printReceivedRight(
  received: EitherOrThese<unknown, unknown>,
  addPadding = false,
): string {
  const padding = addPadding ? '    ' : '';
  return fold(
    () => `Received a Left.`,
    (right) => `Received Right: ` + padding + `${printReceived(right)}`,
    () => `Received a Both.`,
  )(received);
}

/**
 * Construct a string that shows the difference between a received and expected Left value
 */
export function diffReceivedLeft(
  received: EitherOrThese<unknown, unknown>,
  expected: unknown,
): string {
  return fold(
    (left) => {
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
      const diffString = diff(expected, left) || '';
      return diffString.includes('- Expected') || diffString.includes('no visual difference')
        ? 'Difference from Left:\n' + '\n' + `${diffString}`
        : `Expected Left: ${printExpected(expected)}\n` + printReceivedValue(received);
    },
    () => `Expected Left: ${printExpected(expected)}\n` + printReceivedValue(received),
    () => `Expected Left: ${printExpected(expected)}\n` + printReceivedValue(received),
  )(received);
}

/**
 * Construct a string that shows the difference between a received and expected Right value
 */
export function diffReceivedRight(
  received: EitherOrThese<unknown, unknown>,
  expected: unknown,
): string {
  return fold(
    () => `Expected Right: ${printExpected(expected)}\n` + printReceivedValue(received),
    (right) => {
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
      const diffString = diff(expected, right) || '';
      return diffString.includes('- Expected') || diffString.includes('no visual difference')
        ? 'Difference from Right:\n' + '\n' + `${diffString}`
        : `Expected Right: ${printExpected(expected)}\n` + printReceivedValue(received);
    },
    () => `Expected Right: ${printExpected(expected)}\n` + printReceivedValue(received),
  )(received);
}
