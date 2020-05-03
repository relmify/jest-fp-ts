import { containsMatches } from '../index';

const anOuncOfPrevention = ['an', 'ounce', 'of', 'prevention'];
const ouncePrevention = ['ounce', 'prevention'];
const isWorthAPoundOfCure = ['is', 'worth', 'a', 'pound', 'of', 'cure'];
const preventionIsWorth = ['prevention', 'is', 'worth'];

describe('containsMatches()', () => {
  it('returns true if the received array contains matches for all of the expected values', () => {
    expect(containsMatches(ouncePrevention)(anOuncOfPrevention)).toBe(true);
  });
  it('returns false if the received array does not contain matches for any of the expected values', () => {
    expect(containsMatches(ouncePrevention)(isWorthAPoundOfCure)).toBe(false);
  });
  it('returns false if the received array does not contain matches for all of the expected values', () => {
    expect(containsMatches(preventionIsWorth)(isWorthAPoundOfCure)).toBe(false);
  });
  it('returns false if the received array is empty', () => {
    expect(containsMatches(anOuncOfPrevention)([])).toBe(false);
  });
});
