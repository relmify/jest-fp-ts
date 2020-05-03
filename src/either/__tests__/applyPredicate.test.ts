import { left, right } from 'fp-ts/lib/Either';
import { applyPredicate, applyPredicateLeft, isTruthy } from '../../predicates/index';

describe('applyPredicate', () => {
  test('returns true if the received value is a right and the predicate evaluates to true when applied to the value', () => {
    expect(applyPredicate(isTruthy)(right('a string'))).toBe(true);
  });
  test('returns false if the received value is a right and the predicate evaluates to false when applied to the value', () => {
    expect(applyPredicate(isTruthy)(right(undefined))).toBe(false);
  });
  test('returns false if the received value is a left', () => {
    expect(applyPredicate(isTruthy)(left(true))).toBe(false);
  });
});

describe('applyPredicateLeft', () => {
  test('returns true if the received value is a left and the predicate evaluates to true when applied to the value', () => {
    expect(applyPredicateLeft(isTruthy)(left('a string'))).toBe(true);
  });
  test('returns false if the received value is a left and the predicate evaluates to false when applied to the value', () => {
    expect(applyPredicateLeft(isTruthy)(left(undefined))).toBe(false);
  });
  test('returns false if the received value is a right', () => {
    expect(applyPredicateLeft(isTruthy)(right(true))).toBe(false);
  });
});
