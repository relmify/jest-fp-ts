import * as t from 'io-ts';
import { validation } from '../validation/validation';

/**
 * Type Guard that returns true if the received value is an io-ts Validation,
 * false otherwise.
 *
 * A Validiation is the type returned by classic (stable) io-ts decoders
 */
export const isValidation = (received: unknown): received is t.Validation<unknown> =>
  validation(t.unknown).is(received);
