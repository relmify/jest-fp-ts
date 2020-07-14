import { left, right } from 'fp-ts/lib/Either';
import { matchers } from '../../index';

expect.extend(matchers);

describe('.toBeEither should pass', () => {
  test('if received is a Left', () => {
    expect(left('Left')).toBeEither();
  });
  test('if received is a Right', () => {
    expect(right('Right')).toBeEither();
  });
  test('if called as an asymmetric matcher', () => {
    expect(left('Left')).toEqual(expect.toBeEither());
  });
});

describe('.toBeEither should fail', () => {
  test('if received is neither a left nor a right', () => {
    expect(() => expect('left').toBeEither()).toThrowError();
  });
});

describe('.not.toBeEither should pass', () => {
  test('if received is null', () => {
    expect(null).not.toBeEither();
  });
  test('if received is undefined', () => {
    expect(undefined).not.toBeEither();
  });
  test('if received is not an Either', () => {
    expect('not an Either').not.toBeEither();
  });
});

describe('.not.toBeEither should fail', () => {
  test('if received is a left', () => {
    expect(() => expect(left('left')).not.toBeEither()).toThrowError();
  });
  test('if received is a right', () => {
    expect(() => expect(right('right')).not.toBeEither()).toThrowError();
  });
});
