import { some, none } from 'fp-ts/lib/Option';
import { applyPredicate } from '../applyPredicate';
import { isTruthy } from '../../predicates';

describe('applyPredicate', () => {
  test('returns true if the received value is a Some and the predicate evaluates to true when applied to the value', () => {
    expect(applyPredicate(isTruthy)(some('a string'))).toBe(true);
  });
  test('returns false if the received value is a Some and the predicate evaluates to false when applied to the value', () => {
    expect(applyPredicate(isTruthy)(some(undefined))).toBe(false);
  });
  test('returns false if the received value is a None', () => {
    expect(applyPredicate(isTruthy)(none)).toBe(false);
  });
});
