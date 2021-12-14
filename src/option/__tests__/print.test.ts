import { some, none } from 'fp-ts/lib/Option';
import { printReceivedOption, diffReceivedSome } from '../print';
import { stripAnsi } from '../../serializers';

expect.addSnapshotSerializer(stripAnsi);

describe('printReceivedOption', () => {
  test('includes the received value if a Some with a string value is received', () => {
    const aSome = some('A Some with a string value');
    expect(printReceivedOption(aSome)).toMatchInlineSnapshot(
      `Received Some: "A Some with a string value"`,
    );
  });
  test('includes the received value if a Some with an Error value is received', () => {
    const errorSome = some(new Error('A Some with an Error value'));
    expect(printReceivedOption(errorSome)).toMatchInlineSnapshot(
      `Received Some: [Error: A Some with an Error value]`,
    );
  });
  test('includes the received value if a Some with an object value is received', () => {
    expect(printReceivedOption(some({ id: 1 }))).toMatchInlineSnapshot(`Received Some: {"id": 1}`);
  });
  test('indicates if the received value is a None', () => {
    expect(printReceivedOption(none)).toMatchInlineSnapshot(`Received None`);
  });
  test('handles a Some with an undefined value', () => {
    expect(printReceivedOption(some(undefined))).toMatchInlineSnapshot(`Received Some: undefined`);
  });
  test('handles a Some with a null value', () => {
    expect(printReceivedOption(some(null))).toMatchInlineSnapshot(`Received Some: null`);
  });
});

describe('printReceivedOption adds padding', () => {
  test('if a Some is received and addPadding is true', () => {
    expect(printReceivedOption(some(1), true)).toMatchInlineSnapshot(`Received Some:     1`);
  });
});

describe('printReceivedOption does not add padding', () => {
  test('if a Some is received and addPadding is true', () => {
    expect(printReceivedOption(some(1), false)).toMatchInlineSnapshot(`Received Some: 1`);
  });
  test('if a None is received and addPadding is true', () => {
    expect(printReceivedOption(none, true)).toEqual(printReceivedOption(none));
  });
});

describe('diffReceivedSome', () => {
  test('returns a string that contains the expected and received values', () => {
    expect(diffReceivedSome(some('A Some'), 'A Some with a different value'))
      .toMatchInlineSnapshot(`
      Expected Some: "A Some with a different value"
      Received Some: "A Some"
    `);
  });
  test('indicates if a None was recieved', () => {
    expect(diffReceivedSome(none, 'A Some with some value')).toMatchInlineSnapshot(`
      Expected Some: "A Some with some value"
      Received None
    `);
  });
  test('handles null values', () => {
    expect(diffReceivedSome(some(null), 'A Some with some value')).toMatchInlineSnapshot(`
      Expected Some: "A Some with some value"
      Received Some: null
    `);
  });
  test('handles number values', () => {
    expect(diffReceivedSome(some(42), 21)).toMatchInlineSnapshot(`
      Expected Some: 21
      Received Some: 42
    `);
  });
  test('handles asymetric matcher values', () => {
    expect(diffReceivedSome(some(42), expect.any(String))).toMatchInlineSnapshot(`
      Expected Some: Any<String>
      Received Some: 42
    `);
  });
});
