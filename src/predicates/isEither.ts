import * as t from 'io-ts';
import { either } from '../either/either';
import { Either } from 'fp-ts/lib/Either';

/**
 * Type Guard that returns true if the received value is an Either, false otherwise.
 */
export const isEither = (received: unknown): received is Either<unknown, unknown> =>
  either(t.unknown, t.unknown).is(received);
