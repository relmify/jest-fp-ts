import { left, right } from 'fp-ts/lib/Either';
import matchers from '../index';

expect.extend(matchers);

describe('.toMatchLeft should pass', () => {
  test('if received is a Left and expected matches the left value', () => {
    expect(left('Left')).toMatchLeft('Left');
  });
  test('if received is a Left and expected is a substring of the left value', () => {
    expect(left('Left is the best')).toMatchLeft('Left');
  });
  test('if received is a Left and  expected is a regex that matches the left value', () => {
    expect(left('Left is the best')).toMatchLeft(/Left/);
  });
  test('if received is a Left and expected is a regex created with new that matches the left value', () => {
    expect(left('Left is the best')).toMatchLeft(new RegExp('is the best'));
  });
  test('if received is a Left with an undefined expected value', () => {
    expect(left(undefined)).toMatchLeft(undefined);
  });
  test('if received is a Left with a null expected value', () => {
    expect(left(null)).toMatchLeft(null);
  });
  test('if called as an asymmetric matcher', () => {
    expect(left('People who are truly strong lift others up.')).toEqual(
      expect.toMatchLeft('strong'),
    );
  });
});

describe('.toMatchLeft should fail', () => {
  test('if received is a Right', () => {
    expect(() => expect(right('one potato')).toMatchLeft('one')).toThrowError();
  });
  test('if received is a Left that does not match the expected value', () => {
    expect(() => expect(left('two potato')).toMatchLeft('one')).toThrowError();
  });
});

describe('.not.toMatchLeft should pass', () => {
  test('if received is a Left and expected does not match the left value', () => {
    expect(left('Left')).not.toMatchLeft('a different value');
  });
  test('if received is a Left and expected is not a substring of the left value', () => {
    expect(left('Left is the best')).not.toMatchLeft('Right');
  });
  test('if received is a Left and expected is a super-string of the left value', () => {
    expect(left('Left is the best')).not.toMatchLeft('Left is the best I think');
  });
  test('if received is a Left and  expected is a regex that does not matches the left value', () => {
    expect(left('Left is the best')).not.toMatchLeft(/Right/);
  });
  test('if received is a Left and expected is a regex that does not match the left value', () => {
    expect(left('Left is the best')).not.toMatchLeft(new RegExp('is not the best'));
  });
  test('if received is a Right and expected matches the right value', () => {
    expect(right('Right')).not.toMatchLeft('Right');
  });
});

describe('.not.toMatchLeft should fail', () => {
  test('if received is a Left that matches the expected value', () => {
    expect(() => expect(left('three potato')).not.toMatchLeft('three')).toThrowError();
  });
});
