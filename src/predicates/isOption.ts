import * as t from 'io-ts';
import { option } from '../option/option';
import { Option } from 'fp-ts/lib/Option';

/**
 * Returns true if the received value is an Option, false otherwise.
 */
export const isOption = (received: unknown): received is Option<unknown> =>
  option(t.unknown).is(received);
