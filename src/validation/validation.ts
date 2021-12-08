import * as t from 'io-ts';
import { Either } from 'fp-ts/lib/Either';

const leftLiteral = t.literal('Left');
const rightLiteral = t.literal('Right');

const decoder = t.type({
  name: t.string,
  // validate: function
  // decode: function
});

const contextEntry = t.intersection([
  t.type({
    key: t.string,
    type: decoder,
  }),
  t.partial({
    actual: t.unknown,
  }),
]);

const validationError = t.intersection([
  t.type({
    value: t.unknown,
    context: t.readonlyArray(contextEntry),
  }),
  t.partial({
    message: t.string,
  }),
]);

const errors = t.array(validationError);

type ValidationT<A extends t.Mixed> = t.Type<
  Either<t.TypeOf<typeof errors>, t.TypeOf<A>>,
  Either<t.OutputOf<typeof errors>, t.OutputOf<A>>,
  unknown
>;

/**
 * Given a codec representing a type `A`, returns a codec representing a
 * `Validation<A>` that is able to deserialize the JSON representation of a
 * `Validation`.
 *
 * A `Validation<A>` is the type returned by `io-ts decode()` functions in
 * classic (stable) io-ts codecs. It is an alias for `Either<Errors, A>`.
 *
 * Note: There is also a new experimental io-ts interface that is independent
 * and backward-incompatible with the stable interface.
 */
export const validation = <A extends t.Mixed>(
  rightCodec: A,
  name = `Validation<${rightCodec.name}>`,
): ValidationT<A> => {
  return t.union(
    [
      t.strict(
        {
          _tag: leftLiteral,
          left: t.array(validationError),
        },
        'Left<Errors>',
      ),
      t.strict(
        {
          _tag: rightLiteral,
          right: rightCodec,
        },
        `Right<${rightCodec.name}>`,
      ),
    ],
    name,
  );
};
