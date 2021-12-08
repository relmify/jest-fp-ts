import * as t from 'io-ts';
import { these } from '../these/these';
import { either } from '../either/either';
import { EitherOrThese } from '../eitherOrThese/eitherOrThese';

/**
 * Type guard that returns true if the received value is an Either or a These, false otherwise
 */
export const isEitherOrThese = (received: unknown): received is EitherOrThese<unknown, unknown> =>
  either(t.unknown, t.unknown).is(received) || these(t.unknown, t.unknown).is(received);
