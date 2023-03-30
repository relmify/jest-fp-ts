import { equals, strictEquals, subsetEquals } from '../index';

/* eslint-disable @typescript-eslint/no-unused-vars */

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
class CustomError extends Error {
  reason: string | undefined;
  constructor(message: string, reason?: string) {
    super(message);
    Object.defineProperty(this, 'name', { value: 'CustomError' });
    Object.defineProperty(this, 'reason', { value: reason });
  }
}

const trueForAllData: Array<Array<any>> = [
  // [message, received, expected]
  ['equal strings', 'hello!', 'hello!'],
  ['equal numbers', 1, 1],
  ['equal arrays', ['a', 'b'], ['a', 'b']],
  ['equal objects', { orderId: '123' }, { orderId: '123' }],
  [
    'equal deep objects',
    { orderId: '123', orderLines: { item: 'soup' } },
    { orderId: '123', orderLines: { item: 'soup' } },
  ],
  ['equivalent objects', new Message('Does not compute!'), new Message('Does not compute!')],
  ['undefined values', undefined, undefined],
  ['null values', null, null],
];

const falseForAllData: Array<Array<any>> = [
  // [message, received, expected]
  ['non equal strings', 'hello!', 'hi'],
  ['non equal strings where the expected string is empty', 'hello!', ''],
  ['non equal strings where the expected string is undefined', 'hello!', undefined],
  ['non equal strings where the expected string is null', 'hello!', null],
  ['non equal numbers', 1, 2],
  ['non equal arrays with the same number of elements', ['a', 'b'], ['a', 'z']],
  ['non equal boolean values', true, false],
  ['null versus undefined', null, undefined],
  ['objects with the same keys but different values', { orderId: '123' }, { orderId: '456' }],
  ['objects with different keys but the same values', { orderId: '123' }, { orderNumber: '123' }],
  [
    'non equal deep objects',
    { orderId: '123', orderItem: { item: 'soup' } },
    { orderId: '123', orderItem: { item: 'crackers' } },
  ],
  [
    'arrays of objects where the expected array contains extra objects',
    [{ a: 'a' }, { b: 'b' }],
    [{ a: 'a' }, { b: 'b' }, { c: 'c' }],
  ],
  [
    'arrays of objects where the received array contains extra objects',
    [{ a: 'a' }, { b: 'b' }, { c: 'c' }],
    [{ a: 'a' }, { b: 'b' }],
  ],
  [
    'objects where the expected object contains an additional property',
    { orderId: '123' },
    { orderId: '123', orderNumber: 100 },
  ],
];

const falseForStrictEqualsTrueForOthersData: Array<Array<any>> = [
  // [message, received, expected]
  ['errors with equal messages but different names', new Error('oops'), new CustomError('oops')],
  [
    'errors with equal messages but different names and number of properties',
    new Error('oops'),
    new CustomError('oops', 'because'),
  ],
  // eslint-disable-next-line no-sparse-arrays
  ['sparse arrays compared to similar arrays with undefined members', [1, , 3], [1, undefined, 3]],
  [
    'objects where one of the objects contains an extra undefined value',
    { orderId: '123', item: 'soup', flavor: undefined },
    { orderId: '123', item: 'soup' },
  ],
  [
    'class instances with the same fields as literal objects',
    new Message('Does not compute!'),
    { message: 'Does not compute!' },
  ],
];

const trueForSubsetEqualsFalseForOthersData: Array<Array<any>> = [
  // [message, received, expected]
  [
    'objects where the received object contains an additional property',
    { orderId: '123', orderNumber: 100 },
    { orderId: '123' },
  ],
];

describe('equals()', () => {
  test.each(trueForAllData)('is true for %s', (description, received, expected) => {
    expect(equals(expected)(received)).toBe(true);
  });
  test.each(falseForAllData)('is false for %s', (description, received, expected) => {
    expect(equals(expected)(received)).toBe(false);
  });
  test.each(falseForStrictEqualsTrueForOthersData)(
    'is true for %s',
    (_description, received, expected) => {
      expect(equals(expected)(received)).toBe(true);
    },
  );
  test.each(trueForSubsetEqualsFalseForOthersData)(
    'is false for %s',
    (_description, received, expected) => {
      expect(equals(expected)(received)).toBe(false);
    },
  );
});

describe('strictEquals()', () => {
  test.each(trueForAllData)('is true for %s', (_description, received, expected) => {
    expect(strictEquals(expected)(received)).toBe(true);
  });
  test.each(falseForAllData)('is false for %s', (_description, received, expected) => {
    expect(strictEquals(expected)(received)).toBe(false);
  });
  test.each(falseForStrictEqualsTrueForOthersData)(
    'is false for %s',
    (_description, received, expected) => {
      expect(strictEquals(expected)(received)).toBe(false);
    },
  );
  test.each(trueForSubsetEqualsFalseForOthersData)(
    'is false for %s',
    (_description, received, expected) => {
      expect(strictEquals(expected)(received)).toBe(false);
    },
  );
});

describe('subsetEquals()', () => {
  test.each(trueForAllData)('is true for %s', (_description, received, expected) => {
    expect(subsetEquals(expected)(received)).toBe(true);
  });
  test.each(falseForAllData)('is false for %s', (_description, received, expected) => {
    expect(subsetEquals(expected)(received)).toBe(false);
  });
  test.each(falseForStrictEqualsTrueForOthersData)(
    'is true for %s',
    (_description, received, expected) => {
      expect(subsetEquals(expected)(received)).toBe(true);
    },
  );
  test.each(trueForSubsetEqualsFalseForOthersData)(
    'is true for %s',
    (_description, received, expected) => {
      expect(subsetEquals(expected)(received)).toBe(true);
    },
  );
});
