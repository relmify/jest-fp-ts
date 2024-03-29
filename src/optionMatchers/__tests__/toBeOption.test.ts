import { some, none } from 'fp-ts/lib/Option';
import { toBeOption } from '../../index';

expect.extend({ toBeOption });

describe('.toBeOption should pass', () => {
  test('if received is a None', () => {
    expect(none).toBeOption();
  });
  test('if received is a Some', () => {
    expect(some('Some')).toBeOption();
  });
  test('if called as an asymmetric matcher', () => {
    expect(some('Some')).toEqual(expect.toBeOption());
  });
});

describe('.toBeOption should fail', () => {
  test('if received is neither a Some nor a None', () => {
    expect(() => expect(undefined).toBeOption()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeOption()

      Received: undefined
    `);
  });
});

describe('.not.toBeOption should pass', () => {
  test('if received is null', () => {
    expect(null).not.toBeOption();
  });
  test('if received is undefined', () => {
    expect(undefined).not.toBeOption();
  });
  test('if received is not an Option', () => {
    expect('not an Option').not.toBeOption();
  });
});

describe('.not.toBeOption should fail', () => {
  test('if received is a none', () => {
    expect(() => expect(none).not.toBeOption()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeOption()

      Received None
    `);
  });
  test('if received is a some', () => {
    expect(() => expect(some('some')).not.toBeOption()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeOption()

      Received Some: "some"
    `);
  });
});
