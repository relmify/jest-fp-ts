import { EitherOrThese, fold } from './eitherOrThese';
import { printExpected, printReceived, printDiffOrStringify } from 'jest-matcher-utils';

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
    (left, right) =>
      `Received Both:\n` + `Left: ${printReceived(left)}\n` + `Right: ${printReceived(right)}`,
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
    (left) => printDiffOrStringify(expected, left, 'Expected Left', 'Received Left', true),
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
    (right) => printDiffOrStringify(expected, right, 'Expected Right', 'Received Right', true),
    () => `Expected Right: ${printExpected(expected)}\n` + printReceivedValue(received),
  )(received);
}
