import { left, right, both } from 'fp-ts/lib/These';
import { toBeThese } from '../../index';

expect.extend({ toBeThese });

describe('.toBeThese should pass', () => {
  test('if received is a Left', () => {
    expect(left('Left')).toBeThese();
  });
  test('if received is a Right', () => {
    expect(right('Right')).toBeThese();
  });
  test('if received is a Both', () => {
    expect(both('Left', 'Right')).toBeThese();
  });
  test('if called as an asymmetric matcher', () => {
    expect(both('Left', 'Right')).toEqual(expect.toBeThese());
  });
});

describe('.toBeThese should fail', () => {
  test('if received is not a left, a right, or a both', () => {
    expect(() => expect(undefined).toBeThese()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeThese()

      Received: undefined
    `);
  });
});

describe('.not.toBeThese should pass', () => {
  test('if received is null', () => {
    expect(null).not.toBeThese();
  });
  test('if received is undefined', () => {
    expect(undefined).not.toBeThese();
  });
  test('if received is not a These', () => {
    expect(1).not.toBeThese();
  });
});

describe('.not.toBeThese should fail', () => {
  test('if received is a left', () => {
    expect(() => expect(left('left')).not.toBeThese()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeThese()

      Received Left: "left"
    `);
  });
  test('if received is a right', () => {
    expect(() => expect(right('right')).not.toBeThese()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeThese()

      Received Right: "right"
    `);
  });
  test('if received is a both', () => {
    expect(() => expect(both('left', 'right')).not.toBeThese()).toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeThese()

      Received Both:
      Left: "left"
      Right: "right"
    `);
  });
});
