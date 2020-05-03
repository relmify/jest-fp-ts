import { left, right } from 'fp-ts/lib/Either';
import matchers from '../index';

expect.extend(matchers);

describe('.toMatchRight should pass', () => {
  test('if received is a Right and expected matches the right value', () => {
    expect(right('Right')).toMatchRight('Right');
  });
  test('if received is a Right and expected is a substring of the right value', () => {
    expect(right('Right is the best')).toMatchRight('Right');
  });
  test('if received is a Right and  expected is a regex that matches the right value', () => {
    expect(right('Right is the best')).toMatchRight(/Right/);
  });
  test('if received is a Right and expected is a regex created with new that matches the right value', () => {
    expect(right('Right is the best')).toMatchRight(new RegExp('is the best'));
  });
  test('if received is a Right with an undefined expected value', () => {
    expect(right(undefined)).toMatchRight(undefined);
  });
  test('if received is a Right with a null expected value', () => {
    expect(right(null)).toMatchRight(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(right('People who are truly strong lift others up.')).toEqual(
      expect.toMatchRight('strong'),
    );
  });
});

describe('.toMatchRight should fail', () => {
  test('if received is a Left', () => {
    expect(() => expect(left('one potato')).toMatchRight('one')).toThrowError();
  });
  test('if received is a Right that does not match the expected value', () => {
    expect(() => expect(right('two potato')).toMatchRight('one')).toThrowError();
  });
});

describe('.not.toMatchRight should pass', () => {
  test('if received is a Right and expected does not match the Right value', () => {
    expect(right('Right')).not.toMatchRight('a different value');
  });
  test('if received is a Right and expected is not a substring of the right value', () => {
    expect(right('Right is the best')).not.toMatchRight('Left');
  });
  test('if received is a Right and expected is a super-string of the right value', () => {
    expect(right('Right is the best')).not.toMatchRight('Right is the best I think');
  });
  test('if received is a Right and  expected is a regex that does not match the right value', () => {
    expect(right('Right is the best')).not.toMatchRight(/Left/);
  });
  test('if received is a Right and expected is a regex that does not match the right value', () => {
    expect(right('Right is the best')).not.toMatchRight(new RegExp('is not the best'));
  });
  test('if received is a Left and expected matches the left value', () => {
    expect(left('Left')).not.toMatchRight('Left');
  });
});

describe('.not.toMatchRight should fail', () => {
  test('if received is a Right that matches the expected value', () => {
    expect(() => expect(right('three potato')).not.toMatchRight('three')).toThrowError();
  });
});
