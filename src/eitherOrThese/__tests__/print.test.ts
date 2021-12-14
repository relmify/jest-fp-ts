import { left, right, both } from 'fp-ts/lib/These';
import { printReceivedValue, diffReceivedLeft, diffReceivedRight } from '../print';
import { stripAnsi } from '../../serializers';

expect.addSnapshotSerializer(stripAnsi);

describe('printReceivedValue includes the received value', () => {
  test('if a Left with a string value is received', () => {
    expect(printReceivedValue(left('Left value'))).toMatchInlineSnapshot(
      `Received Left: "Left value"`,
    );
  });
  test('if a Left with an Error value is received', () => {
    const errorLeft = left(new Error('A Left with an Error value'));
    expect(printReceivedValue(errorLeft)).toMatchInlineSnapshot(
      `Received Left: [Error: A Left with an Error value]`,
    );
  });
  test('if a Left with an undefined value is received', () => {
    expect(printReceivedValue(left(undefined))).toMatchInlineSnapshot(`Received Left: undefined`);
  });
  test('if a Right with an object value is received', () => {
    const objectRight = right({ id: 1 });
    expect(printReceivedValue(objectRight)).toMatchInlineSnapshot(`Received Right: {"id": 1}`);
  });
  test('if a Right with a null value is received', () => {
    expect(printReceivedValue(right(null))).toMatchInlineSnapshot(`Received Right: null`);
  });
  test('if a Right with a number value is received', () => {
    expect(printReceivedValue(right(42))).toMatchInlineSnapshot(`Received Right: 42`);
  });
  test('if a Both is received', () => {
    const aBoth = both('Both Left value', 'Both Right value');
    expect(printReceivedValue(aBoth)).toMatchInlineSnapshot(`
      Received Both:
      Left: "Both Left value"
      Right: "Both Right value"
    `);
  });
});

describe('printRecievedValue adds padding', () => {
  test('if a Left is received and addPadding is true ', () => {
    expect(printReceivedValue(left('Left value'), true)).toMatchInlineSnapshot(
      `Received Left:     "Left value"`,
    );
  });
  test('if a Right is received and addPadding is true ', () => {
    expect(printReceivedValue(right('Right value'), true)).toMatchInlineSnapshot(
      `Received Right:     "Right value"`,
    );
  });
});

describe('printRecievedValue does not add padding', () => {
  test('if a Left is received and addPadding is false ', () => {
    expect(printReceivedValue(left('Left value'), false)).toEqual(
      printReceivedValue(left('Left value')),
    );
  });
  test('if a Right is received and addPadding is false ', () => {
    expect(printReceivedValue(right('Right value'), false)).toEqual(
      printReceivedValue(right('Right value')),
    );
  });
  test('if a Both is received and addPadding is true ', () => {
    expect(printReceivedValue(both(1, 2), true)).toEqual(printReceivedValue(both(1, 2)));
  });
  test('if a Both is received and addPadding is false ', () => {
    expect(printReceivedValue(both(1, 2), false)).toEqual(printReceivedValue(both(1, 2)));
  });
});

describe('diffReceivedLeft includes the expected and received values', () => {
  test('if a Left with an unexpected value was recieved', () => {
    expect(diffReceivedLeft(left('Left value'), 'Expected value')).toMatchInlineSnapshot(`
      Expected Left: "Expected value"
      Received Left: "Left value"
    `);
  });
  test('if a Left with a number value is received', () => {
    expect(diffReceivedLeft(left(42), 404)).toMatchInlineSnapshot(`
      Expected Left: 404
      Received Left: 42
    `);
  });
  test('if a Right is recieved', () => {
    expect(diffReceivedLeft(right('Right value'), 'Expected value')).toMatchInlineSnapshot(`
      Expected Left: "Expected value"
      Received Right: "Right value"
    `);
  });
  test('if a Both is received', () => {
    const aBoth = both('Both Left value', 'Both Right value');
    expect(diffReceivedLeft(aBoth, 'Expected value')).toMatchInlineSnapshot(`
      Expected Left: "Expected value"
      Received Both:
      Left: "Both Left value"
      Right: "Both Right value"
    `);
  });
});

describe('diffReceivedLeft shows the expected and received values when comparing values of different types', () => {
  test('if a Left with a null value is compared to a string', () => {
    expect(diffReceivedLeft(left(null), 'Expected value')).toMatchInlineSnapshot(`
      Expected Left: "Expected value"
      Received Left: null
    `);
  });
  test('if a Left with an undefined value is compared to a string', () => {
    expect(diffReceivedLeft(left(undefined), 'Expected value')).toMatchInlineSnapshot(`
      Expected Left: "Expected value"
      Received Left: undefined
    `);
  });
  test('if a Left with a number value is compared to a string', () => {
    expect(diffReceivedLeft(left(42), 'Expected value')).toMatchInlineSnapshot(`
      Expected Left: "Expected value"
      Received Left: 42
    `);
  });
  test('if a Left with an object value is compared to a number', () => {
    const objectLeft = left({ id: 1 });
    expect(diffReceivedLeft(objectLeft, 1)).toMatchInlineSnapshot(`
      Expected Left: 1
      Received Left: {"id": 1}
    `);
  });
});

describe('diffReceivedRight includes the expected and received values', () => {
  test('if a Right with an unexpected value was recieved', () => {
    expect(diffReceivedRight(right('Right value'), 'Expected value')).toMatchInlineSnapshot(`
      Expected Right: "Expected value"
      Received Right: "Right value"
    `);
  });
  test('if a Right with a number value is received', () => {
    expect(diffReceivedRight(right(42), 404)).toMatchInlineSnapshot(`
      Expected Right: 404
      Received Right: 42
    `);
  });
  test('if a Left is recieved', () => {
    expect(diffReceivedRight(left(1), 2)).toMatchInlineSnapshot(`
      Expected Right: 2
      Received Left: 1
    `);
  });
  test('if a Both is received', () => {
    const aBoth = both('Both Left value', 'Both Right value');
    expect(diffReceivedRight(aBoth, 'Expected value')).toMatchInlineSnapshot(`
      Expected Right: "Expected value"
      Received Both:
      Left: "Both Left value"
      Right: "Both Right value"
    `);
  });
});

describe('diffReceivedRight shows the expected and received values when comparing values of different types', () => {
  test('if a Right with a null value is compared to a string', () => {
    expect(diffReceivedRight(right(null), 'Expected value')).toMatchInlineSnapshot(`
      Expected Right: "Expected value"
      Received Right: null
    `);
  });
  test('if a Right with an undefined value is compared to a string', () => {
    expect(diffReceivedRight(right(undefined), 'Expected value')).toMatchInlineSnapshot(`
      Expected Right: "Expected value"
      Received Right: undefined
    `);
  });
  test('if a Right with a number value is compared to a string', () => {
    expect(diffReceivedRight(right(1), 'Expected value')).toMatchInlineSnapshot(`
      Expected Right: "Expected value"
      Received Right: 1
    `);
  });
  test('if a Right with an object value is compared to a string', () => {
    const objectRight = right({ id: 1 });
    expect(diffReceivedRight(objectRight, 1)).toMatchInlineSnapshot(`
      Expected Right: 1
      Received Right: {"id": 1}
    `);
  });
});
