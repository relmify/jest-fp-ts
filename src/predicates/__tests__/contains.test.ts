import { contains } from '../index';

describe('contains() returns true with', () => {
  test.each([
    [[1, 2, 3], 3, 'an array of numbers that contains the expected number'],
    [[3, 3, 3], 3, 'an array of numbers that contains multiple copies of the expected number'],
    [['jest', 'is', 'fun'], 'jest', 'an array of strings that contains the expected string'],
    [[{ id: 1 }, { id: 2 }], { id: 2 }, 'an array of objects contains the expected object'],
    [
      [
        [1, 2],
        [3, 4],
      ],
      [3, 4],
      'an array of arrays that contains the expected array',
    ],
  ])('received: %p, expected: %p -- %s', (received, expected, description) => {
    expect(contains(expected)(received)).toBe(true);
  });
});

describe('contains() returns false with', () => {
  test.each([
    [[1, 2, 3], 5, 'an array of numbers that does not contain the expected number'],
    [
      ['jest', 'is', 'fun'],
      'for testing',
      'an array of strings that does not contain the expected string',
    ],
    [
      [{ id: 1 }, { id: 2 }],
      { id: 22 },
      'an array of objects does not contain the expected object',
    ],
    [
      [
        [1, 2],
        [3, 4],
      ],
      [5, 6],
      'an array of arrays that does not contain the expected array',
    ],
  ])('received: %p, expected: %p -- %s', (received, expected, description) => {
    expect(contains(expected)(received)).toBe(false);
  });
});
