import * as t from 'io-ts';
import { Either } from 'fp-ts/lib/Either';
const leftLiteral = t.literal('Left');
const rightLiteral = t.literal('Right');

type EitherT<L extends t.Mixed, R extends t.Mixed> = t.Type<
  Either<t.TypeOf<L>, t.TypeOf<R>>,
  Either<t.OutputOf<L>, t.OutputOf<R>>,
  unknown
>;

/**
 * Given a codec representing a type `L` and a codec representing a type `A`, returns a codec representing `Either<L, A>` that is able to deserialize
 * the JSON representation of an `Either`.
 */
export const either = <L extends t.Mixed, R extends t.Mixed>(
  leftCodec: L,
  rightCodec: R,
  name = `Either<${leftCodec.name}, ${rightCodec.name}>`,
): EitherT<L, R> => {
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
        `Right<${leftCodec.name}>`,
      ),
    ],
    name,
  );
};
