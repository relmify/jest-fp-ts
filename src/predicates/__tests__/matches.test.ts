import { matches } from '../index';

describe('matches returns true with', () => {
  describe.each([
    ['The quick brown fox', 'The quick brown fox', 'strings that are the same'],
    ['The quick brown fox', 'quick', 'a received string that contains the expected substring'],
    [
      'The quick brown fox',
      /quick/,
      'a received string that matches the provided regular expression',
    ],
    [
      'The quick brown fox',
      new RegExp('quick'),
      'a received string that matches a regular expression created with new',
    ],
  ])('(%s)(%s)', (received, expected, description) => {
    test(`matches returns true for ${description}`, () => {
      expect(matches(expected)(received)).toBe(true);
    });
  });
});

describe('matches returns false with', () => {
  describe.each([
    ['The quick brown fox', 'jumped over the lazy dog', 'strings that do not partially match'],
    [
      'The quick brown fox',
      'The quick brown fox jumped over the lazy dog',
      'an expected string that is a super-string of the received string',
    ],
    [
      'The quick brown fox',
      /jumped/,
      'a received string that does not match the provided regular expression',
    ],
    [
      'The quick brown fox',
      new RegExp('over'),
      'a received string that does not match a regular expression created with new',
    ],
  ])('(%s)(%s)', (received, expected, description) => {
    test(`matches returns true for ${description}`, () => {
      expect(matches(expected)(received)).toBe(false);
    });
  });
});
