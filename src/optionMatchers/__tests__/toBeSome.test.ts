import { some, none } from 'fp-ts/lib/Option';
import { toBeSome } from '../../index';

expect.extend({ toBeSome });

describe('.toBeSome', () => {
  test('should pass if the received object is a Some', () => {
    expect(some('Some')).toBeSome();
  });
  test('if called as an asymmetric matcher', () => {
    expect(some('Some')).toEqual(expect.toBeSome());
  });
});

describe('.toBeSome should fail', () => {
  test('if received is a None', () => {
    expect(() => expect(none).toBeSome()).toThrowError();
  });
});

describe('not.toBeSome should pass', () => {
  test('if the received object is a None', () => {
    expect(none).not.toBeSome();
  });
});

describe('.not.toBeSome should fail', () => {
  test('if received is a Some', () => {
    expect(() => expect(some('Some')).not.toBeSome()).toThrowError();
  });
});
