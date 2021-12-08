import { left, right, both } from 'fp-ts/lib/These';
import { applyPredicateBoth } from '../applyPredicate';
import { isTruthy } from '../../predicates';

describe('applyPredicateBoth', () => {
  test('returns true if the received value is a both and predicates evaluate to true when applied to both values', () => {
    expect(applyPredicateBoth(isTruthy, isTruthy)(both(402, 'a string'))).toBe(true);
  });
  test('returns false if the received value is a both and predicates evaluate to false when applied both values', () => {
    expect(applyPredicateBoth(isTruthy, isTruthy)(both(undefined, undefined))).toBe(false);
  });
  test('returns false if the received value is a both but predicate evaluate to true for only the left value', () => {
    expect(applyPredicateBoth(isTruthy, isTruthy)(both(true, false))).toBe(false);
  });
  test('returns false if the received value is a both but predicates evaluate to true for only the right value', () => {
    expect(applyPredicateBoth(isTruthy, isTruthy)(both(false, true))).toBe(false);
  });
  test('returns false if the received value is a left', () => {
    expect(applyPredicateBoth(isTruthy, isTruthy)(left(true))).toBe(false);
  });
  test('returns false if the received value is a right', () => {
    expect(applyPredicateBoth(isTruthy, isTruthy)(right(true))).toBe(false);
  });
});
