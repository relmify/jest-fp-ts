import * as t from 'io-ts';
import { these } from '../these/these';
import { These } from 'fp-ts/lib/These';

/**
 * Type Guard that returns true if the received value is a These, false otherwise.
 *
 * Note: These is a superset of Either, so this function will also return
 * True if the received value is an Either.
 */
export const isThese = (received: unknown): received is These<unknown, unknown> =>
  these(t.unknown, t.unknown).is(received);
