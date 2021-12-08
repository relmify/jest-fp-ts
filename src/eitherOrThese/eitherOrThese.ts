import { Either, Left, Right } from 'fp-ts/lib/Either';
import { These, Both } from 'fp-ts/lib/These';

export type EitherOrThese<E, A> = Either<E, A> | These<E, A>;

export const isLeft = <E>(fa: EitherOrThese<E, unknown>): fa is Left<E> => fa._tag === 'Left';
export const isRight = <A>(fa: EitherOrThese<unknown, A>): fa is Right<A> => fa._tag === 'Right';
export const isBoth = <E, A>(fa: EitherOrThese<E, A>): fa is Both<E, A> => fa._tag === 'Both';

export const fold =
  <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B, onBoth: (e: E, a: A) => B) =>
  (fa: EitherOrThese<E, A>): B => {
    switch (fa._tag) {
      case 'Left':
        return onLeft(fa.left);
      case 'Right':
        return onRight(fa.right);
      case 'Both':
        return onBoth(fa.left, fa.right);
    }
  };
