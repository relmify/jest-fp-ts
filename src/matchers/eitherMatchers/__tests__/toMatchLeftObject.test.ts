import { left, right } from 'fp-ts/lib/Either';
import matchers from '../index';

expect.extend(matchers);

describe('.toMatchLeftObject should pass', () => {
  test('if received is a Left and expected matches the left value', () => {
    expect(left({ name: 'Left' })).toMatchLeftObject({ name: 'Left' });
  });
  test('if received is a Left and expected is a subset of the left object', () => {
    expect(left({ name: 'Left', motto: 'Left is the best' })).toMatchLeftObject({
      motto: 'Left is the best',
    });
  });
  test('if received is a Left with an undefined expected value', () => {
    expect(left(undefined)).toMatchLeftObject(undefined);
  });
  test('if received is a Left with a null expected value', () => {
    expect(left(null)).toMatchLeftObject(null);
  });
  test('if called as an asymmetric matcher', () => {
    const received = left({ first: 'Katherine', last: 'Johnson' });
    expect(received).toMatchLeftObject({ first: 'Katherine' });
  });
});

describe('.toMatchLeftObject should fail', () => {
  test('if received is a Right', () => {
    expect(() =>
      expect(right({ first: 'Albert', last: 'Einstein' })).toMatchLeftObject({ last: 'Einstein' }),
    ).toThrowError();
  });
  test('if received is a Left that does not match the expected value', () => {
    expect(() =>
      expect(left({ first: 'Nikola', last: 'Tesla' })).toMatchLeftObject({ last: 'Einstein' }),
    ).toThrowError();
  });
});

describe('.not.toMatchLeftObject should pass', () => {
  test('if received is a Left and expected does not match the left value', () => {
    expect(left({ name: 'Left' })).not.toMatchLeftObject({ name: 'Not Left' });
  });
  test('if received is a Left and expected not a subset of the left value', () => {
    expect(left({ name: 'Left', motto: 'Left is the best' })).not.toMatchLeftObject({
      name: 'Left',
      banner: 'Join team Left',
    });
  });
  test('if received is a Left and expected is a superset of the left value', () => {
    expect(left({ name: 'Left', motto: 'Left is the best' })).not.toMatchLeftObject({
      name: 'Left',
      motto: 'Left is the best',
      banner: 'Join team Left',
    });
  });
  test('if received is a Right and expected matches the right value', () => {
    expect(right({ name: 'Right' })).not.toMatchLeftObject({ name: 'Right' });
  });
});

describe('.not.toMatchLeftObject should fail', () => {
  test('if received is a Left that matches the expected value', () => {
    expect(() =>
      expect(left({ first: 'Albert', last: 'Einstein' })).not.toMatchLeftObject({
        last: 'Einstein',
      }),
    ).toThrowError();
  });
});
