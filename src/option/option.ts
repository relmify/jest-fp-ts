/** Code in this file was copied from io-ts-types/src/option.ts */
import * as t from 'io-ts';
import { Option } from 'fp-ts/lib/Option';

const None = t.strict({
  _tag: t.literal('None'),
});

const someLiteral = t.literal('Some');

/**
 * Given a codec representing a type `A`, returns a codec representing `Option<A>` that is able to deserialize
 * the JSON representation of an `Option`.
 */
export type OptionC<C extends t.Mixed> = t.Type<
  Option<t.TypeOf<C>>,
  Option<t.OutputOf<C>>,
  unknown
>;

export function option<C extends t.Mixed>(codec: C, name = `Option<${codec.name}>`): OptionC<C> {
  return t.union(
    [
      None,
      t.strict(
        {
          _tag: someLiteral,
          value: codec,
        },
        `Some<${codec.name}>`,
      ),
    ],
    name,
  );
}
