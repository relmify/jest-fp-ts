import { Either, fold } from 'fp-ts/lib/Either';
import { constFalse } from 'fp-ts/lib/function';

/**
 * Apply the supplied predicate function, returning false if the received
 * value is not a Right or if the receiced value is a Right and the predicate
 * function returns false.
 */
export const applyPredicate = (predicate: (rightValue: unknown) => boolean) => (
  received: Either<unknown, unknown>,
): boolean => fold(constFalse, predicate)(received);

/**
 * Apply the supplied predicate function to a Left, returning false if the received
 * value is not a Left or if the received value is a Left and the predicate
 * function returns false.
 */
export const applyPredicateLeft = (predicate: (leftValue: unknown) => boolean) => (
  received: Either<unknown, unknown>,
): boolean => fold(predicate, constFalse)(received);
