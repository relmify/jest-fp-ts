import { Either, fold } from 'fp-ts/Either';
import { printReceived } from 'jest-matcher-utils';

/**
 * Construct a string that shows the received Either value.
 */
export function printReceivedValue(received: Either<unknown, unknown>): string {
  return fold(
    (left) => `Received Left:  ${printReceived(left)}`,
    (right) => `Received Right: ${printReceived(right)}`,
  )(received);
}
