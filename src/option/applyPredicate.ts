import { Option, fold } from 'fp-ts/lib/Option';
import { constFalse } from 'fp-ts/lib/function';

/**
 * Apply the supplied predicate function, returning false if the received
 * value is not a Some or if the receiced value is a Some and the predicate
 * function returns false.
 */
export const applyPredicate =
  (predicate: (someValue: unknown) => boolean) =>
  (received: Option<unknown>): boolean =>
    fold(constFalse, predicate)(received);
