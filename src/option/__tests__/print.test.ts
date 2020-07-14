import { some, none } from 'fp-ts/lib/Option';
import { printReceivedOption, diffReceivedSome } from '../print';

const aNone = none;
const aSome = some('A Some with a string value');
const errorSome = some(new Error('A Some with an Error value'));
const objectSome = some({ id: 1 });
const undefinedSome = some(undefined);
const nullSome = some(null);
const numberSome = some(42);

describe('printReceivedOption', () => {
  test('includes the received value if a Some with a string value is received', () => {
    expect(printReceivedOption(aSome)).toMatch('A Some with a string value');
  });
  test('includes the received value if a Some with an Error value is received', () => {
    expect(printReceivedOption(errorSome)).toMatch('A Some with an Error value');
  });
  test('includes the received value if a Some with an object value is received', () => {
    expect(printReceivedOption(objectSome)).toMatch(`{"id": 1}`);
  });
  test('returns "Received a None." if the received value is a None', () => {
    expect(printReceivedOption(aNone)).toEqual('Received a None.');
  });
  test('includes "undefined" if a Some with an undefined value is received', () => {
    expect(printReceivedOption(undefinedSome)).toMatch('undefined');
  });
  test('includes "null" if a Some with a null value is received', () => {
    expect(printReceivedOption(nullSome)).toMatch('null');
  });
});

describe('diffReceivedSome', () => {
  test('returns a string that contains the expected value', () => {
    expect(diffReceivedSome(aSome, 'A Some with a different value')).toMatch('different value');
  });
  test('indicates if a None was recieved', () => {
    expect(diffReceivedSome(aNone, 'A Some with some value')).toMatch('Received a None.');
  });
  test('handles null values', () => {
    expect(diffReceivedSome(nullSome, 'A Some with some value')).toMatch('null');
  });
  test('handles number values', () => {
    expect(diffReceivedSome(numberSome, 42)).toMatch('42');
  });
});
