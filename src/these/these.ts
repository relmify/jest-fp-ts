import * as t from 'io-ts';
import { These } from 'fp-ts/lib/These';

const leftLiteral = t.literal('Left');
const rightLiteral = t.literal('Right');
const bothLiteral = t.literal('Both');

type TheseT<L extends t.Mixed, R extends t.Mixed> = t.Type<
  These<t.TypeOf<L>, t.TypeOf<R>>,
  These<t.OutputOf<L>, t.OutputOf<R>>,
  unknown
>;

/**
 * Given a codec representing a type `L` and a codec representing a type `R`,
 * returns a codec representing `These<L, R>` that is able to deserialize
 * the JSON representation of an `These`.
 */
export const these = <L extends t.Mixed, R extends t.Mixed>(
  leftCodec: L,
  rightCodec: R,
  name = `These<${leftCodec.name}, ${rightCodec.name}>`,
): TheseT<L, R> => {
  return t.union(
    [
      t.strict(
        {
          _tag: leftLiteral,
          left: leftCodec,
        },
        `Left<${leftCodec.name}>`,
      ),
      t.strict(
        {
          _tag: rightLiteral,
          right: rightCodec,
        },
        `Right<${rightCodec.name}>`,
      ),
      t.strict(
        {
          _tag: bothLiteral,
          left: leftCodec,
          right: rightCodec,
        },
        `Both<${leftCodec.name}, ${rightCodec.name}>`,
      ),
    ],
    name,
  );
};
