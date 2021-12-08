import { These, fold } from 'fp-ts/lib/These';
import { constFalse } from 'fp-ts/lib/function';

/**
 * Apply the supplied predicate functions to the Left and Right values of a Both, returning false if
 * the received value is not a Both or if the received value is a Both and the predicate functions
 * do not return True for both values.
 */
export const applyPredicateBoth =
  (predicateLeft: (value: unknown) => boolean, predicateRight: (value: unknown) => boolean) =>
  (received: These<unknown, unknown>): boolean =>
    fold(
      constFalse,
      constFalse,
      (leftValue, rightValue) => predicateLeft(leftValue) && predicateRight(rightValue),
    )(received);
