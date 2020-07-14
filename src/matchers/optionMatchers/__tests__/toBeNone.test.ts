import { some, none } from 'fp-ts/lib/Option';
import { matchers } from '../index';
import { NONAME } from 'dns';

expect.extend(matchers);

describe('.toBeNone should pass', () => {
  test('if received is a None', () => {
    expect(none).toBeNone();
  });
  test('if called as an asymmetric matcher', () => {
    expect(none).toEqual(expect.toBeNone());
  });
});

describe('.toBeNone should fail', () => {
  test('if received is a Some', () => {
    expect(() => expect(some('Some')).toBeNone()).toThrowError();
  });
});

describe('.not.toBeNone should pass', () => {
  test('if received is a Some', () => {
    expect(some('Some')).not.toBeNone();
  });
});

describe('.not.toBeNone should fail', () => {
  test('if received is a None', () => {
    expect(() => expect(none).not.toBeNone()).toThrowError();
  });
});
