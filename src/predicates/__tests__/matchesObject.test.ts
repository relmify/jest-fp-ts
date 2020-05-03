import { matchesObject } from '../index';

describe('matchesObject returns true with', () => {
  describe.each([
    [{ id: 1 }, { id: 1 }, 'objects that have the same properties'],
    [
      { id: 1, name: 'one' },
      { id: 1 },
      'objects where the received object is a superset of the expected object',
    ],
    [
      { id: 1, address: { city: 'Vancouver', street: 'Robson' } },
      { id: 1, address: { city: 'Vancouver' } },
      'objects where the received object is a deep superset of the expected object',
    ],
  ])('(%s)(%S)', (received, expected, description) => {
    test(`matchesObject returns true for ${description}`, () => {
      expect(matchesObject(expected)(received)).toBe(true);
    });
  });
});

describe('matchesObject returns false with', () => {
  describe.each([
    [
      { id: 1 },
      { id: 1, name: 'one' },
      'objects where the received object is a subset of the expected object',
    ],
    [
      { id: 1, address: { city: 'Vancouver' } },
      { id: 1, address: { city: 'Vancouver', street: 'Robson' } },
      'objects where the received object is a deep subset of the expected object',
    ],
    [
      [1, 2],
      [1, 2, 3],
      'non-matching arrays where the received array is a subset of the expected array',
    ],
    [
      [1, 2, 3],
      [1, 2],
      'non-matching arrays where the received array is a superset of the expected array',
    ],
  ])('(%s)(%s)', (received, expected, description) => {
    test(`matchesObject returns fals for ${description}`, () => {
      expect(matchesObject(expected)(received)).toBe(false);
    });
  });
});
