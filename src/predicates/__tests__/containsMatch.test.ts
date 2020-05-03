import { containsMatch } from '../index';

const anOunceOfPrevention = ['an ounce of prevention', 'is worth a pound of cure'];

describe('containsMatch()', () => {
  it('returns true if the received array contains a match for the expected value', () => {
    expect(containsMatch(anOunceOfPrevention, 'pound')).toBe(true);
  });
  it('returns false if the received array does not contain a match for the expected value', () => {
    expect(containsMatch(anOunceOfPrevention, 'kilogram')).toBe(false);
  });
  it('returns true if the received array contains a match for the expected regular expression', () => {
    expect(containsMatch(anOunceOfPrevention, /pound/)).toBe(true);
  });
});
