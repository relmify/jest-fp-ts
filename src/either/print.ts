import { Either, fold } from 'fp-ts/lib/Either';
import { printExpected, printReceived, diff } from 'jest-matcher-utils';
import { hasProperty } from '../predicates';

export const determinePropertyMessage = (
  value: any,
  property: PropertyKey,
  message = 'Not Accessible',
): string => {
  return hasProperty(property)(value) ? value[property] : message;
};

/**
 * Construct a string that either shows the received Left value or indicates that a Right was received
 */
export function printReceivedLeft(received: Either<unknown, unknown>): string {
  return fold(
    (left) => `Received Left:` + '\n' + `  ${printReceived(left)}`,
    () => `Received a Right`,
  )(received);
}

/**
 * Construct a string that either shows the received Right value or indicates that a Left was received
 */
export function printReceivedRight(received: Either<unknown, unknown>): string {
  return fold(
    () => `Received a Left`,
    (right) => `Received Right:` + '\n' + `  ${printReceived(right)}`,
  )(received);
}

/**
 * Construct a string that shows the difference between a received and expected Left value
 */
export function diffReceivedLeft(received: Either<unknown, unknown>, expected: unknown): string {
  return fold(
    (left) => {
      const diffString = diff(expected, left) || '';
      return diffString.includes('- Expect')
        ? `Difference from Left:\n\n${diffString}`
        : 'Expected Either to equal Left:\n' +
            `  ${printExpected(expected)}` +
            '\n\n' +
            printReceivedLeft(received);
    },
    () =>
      'Expected Either to equal Left:\n' +
      `  ${printExpected(expected)}` +
      '\n\n' +
      printReceivedLeft(received),
  )(received);
}

/**
 * Construct a string that shows the difference between a received and expected Right value
 */
export function diffReceivedRight(received: Either<unknown, unknown>, expected: unknown): string {
  return fold(
    () =>
      'Expected Either to equal Right:\n' +
      `  ${printExpected(expected)}` +
      '\n\n' +
      printReceivedRight(received),
    (right) => {
      const diffString = diff(expected, right) || '';
      return diffString.includes('- Expect')
        ? `Difference from Right:\n\n${diffString}`
        : 'Expected Either to equal Right:\n' +
            `  ${printExpected(expected)}` +
            '\n\n' +
            printReceivedRight(received);
    },
  )(received);
}
