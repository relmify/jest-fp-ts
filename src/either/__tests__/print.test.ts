import { left, right } from 'fp-ts/lib/Either';
import {
  printReceivedLeft,
  printReceivedRight,
  diffReceivedLeft,
  diffReceivedRight,
  determinePropertyMessage,
} from '../print';

const aLeft = left('A Left with a string value');
const aRight = right('A Right with a string value');
const errorLeft = left(new Error('A Left with an Error value'));
const errorRight = right(new Error('A Right with an Error value'));
const objectLeft = left({ id: 1 });
const objectRight = right({ id: 1 });
const undefinedLeft = left(undefined);
const undefinedRight = right(undefined);
const nullLeft = left(null);
const nullRight = right(null);
const numberLeft = left(42);
const numberRight = right(42);

describe('printReceivedLeft', () => {
  test('includes the received value if a Left with a string value is received', () => {
    expect(printReceivedLeft(aLeft)).toMatch('A Left with a string value');
  });
  test('includes the received value if a Left with an Error value is received', () => {
    expect(printReceivedLeft(errorLeft)).toMatch('A Left with an Error value');
  });
  test('includes the received value if a Left with an object value is received', () => {
    expect(printReceivedLeft(objectLeft)).toMatch(`{"id": 1}`);
  });
  test('returns "Received  a Right" if the received value is a Right', () => {
    expect(printReceivedLeft(aRight)).toEqual('Received a Right');
  });
  test('includes "undefined" if a Left with an undefined value is received', () => {
    expect(printReceivedLeft(undefinedLeft)).toMatch('undefined');
  });
  test('includes "null" if a Left with a null value is received', () => {
    expect(printReceivedLeft(nullLeft)).toMatch('null');
  });
});

describe('printReceivedRight', () => {
  test('includes the received value if a Right with a string value is received', () => {
    expect(printReceivedRight(aRight)).toMatch('A Right with a string value');
  });
  test('includes the received value if a Right with an Error value is received', () => {
    expect(printReceivedRight(errorRight)).toMatch('A Right with an Error value');
  });
  test('includes the received value if a Right with an object value is received', () => {
    expect(printReceivedRight(objectRight)).toMatch(`{"id": 1}`);
  });
  test('returns "Received  a Left" if the received value is a Left', () => {
    expect(printReceivedRight(aLeft)).toEqual('Received a Left');
  });
  test('includes "undefined" if a Right with an undefined value is received', () => {
    expect(printReceivedRight(undefinedRight)).toMatch('undefined');
  });
  test('includes "null" if a Right with a null value is received', () => {
    expect(printReceivedRight(nullRight)).toMatch('null');
  });
});

describe('diffReceivedLeft', () => {
  test('returns a string containing the expected value when a Left is received', () => {
    expect(diffReceivedLeft(aLeft, 'A Left with a different value')).toMatch('different value');
  });
  test('indicates if a Right was recieved', () => {
    expect(diffReceivedLeft(aRight, 'A Left with some value')).toMatch('Received a Right');
  });
  test('handles null values', () => {
    expect(diffReceivedLeft(nullLeft, 'A Left with some value')).toMatch('null');
  });
  test('handles number values', () => {
    expect(diffReceivedLeft(numberLeft, 42)).toMatch('42');
  });
});

describe('diffReceivedRight', () => {
  test('returns a string that contains the expected value', () => {
    expect(diffReceivedRight(aRight, 'A Right with a different value')).toMatch('different value');
  });
  test('indicates if a Left was recieved', () => {
    expect(diffReceivedRight(aLeft, 'A Right with some value')).toMatch('Received a Left');
  });
  test('handles null values', () => {
    expect(diffReceivedRight(nullRight, 'A Right with some value')).toMatch('null');
  });
  test('handles number values', () => {
    expect(diffReceivedRight(numberRight, 42)).toMatch('42');
  });
});

describe('determinePropertyMessage', () => {
  test('should return "Not Accessible" if received is null', () => {
    expect(determinePropertyMessage(null, 'prop')).toEqual('Not Accessible');
  });
  test('should return "Not Accessible" if received is undefined', () => {
    expect(determinePropertyMessage(undefined, 'prop')).toEqual('Not Accessible');
  });
  test('should return the specified message if the property is not accessible', () => {
    expect(determinePropertyMessage(null, 'prop', 'Custom message')).toEqual('Custom message');
  });
  test('should return the property value if the property exists', () => {
    const obj = { prop: 'prop' };
    expect(determinePropertyMessage(obj, 'prop')).toEqual('prop');
  });
  test('should handle undefined property values', () => {
    const obj = { prop: undefined };
    expect(determinePropertyMessage(obj, 'prop')).toEqual(undefined);
  });
  test('should handle null property values', () => {
    const obj = { prop: null };
    expect(determinePropertyMessage(obj, 'prop')).toEqual(null);
  });
  test('should handle string received values', () => {
    const str = 'a string';
    expect(determinePropertyMessage(str, 'length')).toEqual(8);
  });
  test('should handle array received values with an index number string as the property', () => {
    const arr = ['an', 'array'];
    expect(determinePropertyMessage(arr, '1')).toEqual('array');
  });
  test('should handle inherited property values', () => {
    class StringWithPrefix extends String {
      constructor(str: string, prefix = 'why ') {
        super(prefix + str);
      }
    }
    const str = new StringWithPrefix('hello');
    expect(determinePropertyMessage(str, 'length')).toEqual(9);
  });
});
