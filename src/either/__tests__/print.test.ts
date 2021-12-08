import { left, right } from 'fp-ts/lib/Either';
import { printReceivedValue } from '../print';
import { stripAnsi } from '../../serializers';

expect.addSnapshotSerializer(stripAnsi);

describe('printReceivedValue includes the received value', () => {
  test('if a Left with a string value is received', () => {
    expect(printReceivedValue(left('Left value'))).toMatchInlineSnapshot(`Received Left:  "Left value"`);
  });
  test('if a Left with an object value is received', () => {
    expect(printReceivedValue(left({ id: 1 }))).toMatchInlineSnapshot(`Received Left:  {"id": 1}`);
  });
  test('if a Left with an undefined value is received', () => {
    expect(printReceivedValue(left(undefined))).toMatchInlineSnapshot(`Received Left:  undefined`);
  });
  test('if a Right with an Error value is received', () => {
    const errorRight = right(new Error('A Right with an Error value'));
    expect(printReceivedValue(errorRight)).toMatchInlineSnapshot(
      `Received Right: [Error: A Right with an Error value]`,
    );
  });
  test('if a Right with an object value is received', () => {
    expect(printReceivedValue(right({ id: 1 }))).toMatchInlineSnapshot(`Received Right: {"id": 1}`);
  });
  test('if a Right with an undefined value is received', () => {
    expect(printReceivedValue(right(undefined))).toMatchInlineSnapshot(`Received Right: undefined`);
  });
  test('if a Right with a number value is received', () => {
    expect(printReceivedValue(right(42))).toMatchInlineSnapshot(`Received Right: 42`);
  });
});
