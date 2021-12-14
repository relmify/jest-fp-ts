import { EitherOrThese, fold } from './eitherOrThese';
import { constFalse } from 'fp-ts/lib/function';

/**
 * Apply the supplied predicate function to a Right, returning false if the received
 * value is not a Right or if the received value is a Right and the predicate
 * function returns false.
 */
export const applyPredicateRight =
  (predicate: (rightValue: unknown) => boolean) =>
  (received: EitherOrThese<unknown, unknown>): boolean =>
    fold(constFalse, predicate, constFalse)(received);

/**
 * Apply the supplied predicate function to a Left, returning false if the received
 * value is not a Left or if the received value is a Left and the predicate
 * function returns false.
 */
export const applyPredicateLeft =
  (predicate: (leftValue: unknown) => boolean) =>
  (received: EitherOrThese<unknown, unknown>): boolean =>
    fold(predicate, constFalse, constFalse)(received);
