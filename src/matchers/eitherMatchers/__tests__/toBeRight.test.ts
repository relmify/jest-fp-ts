import { left, right } from 'fp-ts/lib/Either';
import { matchers } from '../index';

expect.extend(matchers);

describe('.toBeRight', () => {
  test('should pass if the received object is a Right', () => {
    expect(right('Right')).toBeRight();
  });
  test('if called as an asymmetric matcher', () => {
    expect(right('Right')).toEqual(expect.toBeRight());
  });
});

describe('.toBeRight should fail', () => {
  test('if received is a Left', () => {
    expect(() => expect(left('left')).toBeRight()).toThrowError();
  });
});

describe('not.toBeRight should pass', () => {
  test('if the received object is a Left', () => {
    expect(left('Left')).not.toBeRight();
  });
});

describe('.not.toBeRight should fail', () => {
  test('if received is a Right', () => {
    expect(() => expect(right('right')).not.toBeRight()).toThrowError();
  });
});
