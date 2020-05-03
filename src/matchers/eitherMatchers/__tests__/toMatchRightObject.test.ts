import { left, right } from 'fp-ts/lib/Either';
import matchers from '../index';

expect.extend(matchers);

describe('.toMatchRightObject should pass', () => {
  test('if received is a Right and expected matches the right value', () => {
    expect(right({ name: 'Right' })).toMatchRightObject({ name: 'Right' });
  });
  test('if received is a Right and expected is a subset of the right object', () => {
    expect(right({ name: 'Right', motto: 'Right is the best' })).toMatchRightObject({
      motto: 'Right is the best',
    });
  });
  test('if received is a Right with an undefined expected value', () => {
    expect(right(undefined)).toMatchRightObject(undefined);
  });
  test('if received is a Right with a null expected value', () => {
    expect(right(null)).toMatchRightObject(null);
  });
  test('if called as an asymmetric matcher', () => {
    const received = right({ first: 'Katherine', last: 'Johnson' });
    expect(received).toMatchRightObject({ first: 'Katherine' });
  });
});

describe('.toMatchRightObject should fail', () => {
  test('if received is a Left', () => {
    expect(() =>
      expect(left({ first: 'Albert', last: 'Einstein' })).toMatchRightObject({ last: 'Einstein' }),
    ).toThrowError();
  });
  test('if received is a Right that does not match the expected value', () => {
    expect(() =>
      expect(right({ first: 'Nikola', last: 'Tesla' })).toMatchRightObject({ last: 'Einstein' }),
    ).toThrowError();
  });
});

describe('.not.toMatchRightObject should pass', () => {
  test('if received is a Right and expected does not match the right value', () => {
    expect(right({ name: 'Right' })).not.toMatchRightObject({ name: 'Not Right' });
  });
  test('if received is a Right and expected not a subset of the right value', () => {
    expect(right({ name: 'Right', motto: 'Right is the best' })).not.toMatchRightObject({
      name: 'Right',
      banner: 'Join team Right',
    });
  });
  test('if received is a Right and expected is a superset of the right value', () => {
    expect(right({ name: 'Right', motto: 'Right is the best' })).not.toMatchRightObject({
      name: 'Right',
      motto: 'Right is the best',
      banner: 'Join team Right',
    });
  });
  test('if received is a Left and expected matches the left value', () => {
    expect(left({ name: 'Left' })).not.toMatchRightObject({ name: 'Left' });
  });
});

describe('.not.toMatchRighttObject should fail', () => {
  test('if received is a Right that matches the expected value', () => {
    expect(() =>
      expect(right({ first: 'Albert', last: 'Einstein' })).not.toMatchRightObject({
        last: 'Einstein',
      }),
    ).toThrowError();
  });
});
