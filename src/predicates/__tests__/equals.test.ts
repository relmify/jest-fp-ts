import { equals } from '../index';

/* eslint-disable @typescript-eslint/no-unused-vars */

class Message {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

const trueData: Array<Array<any>> = [
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

const falseData: Array<Array<any>> = [
  ['non equal strings', 'hello!', 'hi'],
  ['non equal strings where the expected string is empty', 'hello!', ''],
  ['non equal strings where the expected string is undefined', 'hello!', undefined],
  ['non equal strings where the expected string is null', 'hello!', null],
  ['non equal numbers', 1, 2],
  ['non equal arrays with the same number of elements', ['a', 'b'], ['a', 'z']],
  ['non equal arrays with a different number of elements', ['a', 'b'], ['a', 'b', 'c']],
  ['non equal boolean values', true, false],
  ['null versus undefined', null, undefined],
  ['objects with the same keys but different values', { orderId: '123' }, { orderId: '456' }],
  ['objects with different keys but the same values', { orderId: '123' }, { orderNumber: '123' }],
  [
    'objects where one of the objects contains an additional property',
    { orderId: '123' },
    { orderId: '123', orderNumber: 100 },
  ],
  [
    'non equal deep objects',
    { orderId: '123', orderItem: { item: 'soup' } },
    { orderId: '123', orderItem: { item: 'crackers' } },
  ],
];

describe('equals()', () => {
  test.each(trueData)('is true for %s', (_description, received, expected) => {
    expect(equals(expected)(received)).toBe(true);
  });
  test.each(falseData)('is false for %s', (_description, received, expected) => {
    expect(equals(expected)(received)).toBe(false);
  });
});
