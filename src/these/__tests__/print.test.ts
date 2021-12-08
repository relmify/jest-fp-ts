import { left, right, both } from 'fp-ts/lib/These';
import { diffReceivedBoth } from '../print';
import { stripAnsi } from '../../serializers';
import { constTrue } from 'fp-ts/lib/function';

expect.addSnapshotSerializer(stripAnsi);

// TODO: update other print functions to handle all of these cases properly too

describe('diffReceivedBoth includes the expected and received values when a Both is received', () => {
  test('if an unexpected left value is received', () => {
    expect(diffReceivedBoth(both('lime', 'raspberry'), 'lemon', 'raspberry'))
      .toMatchInlineSnapshot(`
      Expected Both:
        Left: "lemon"
        Right: "raspberry"

      Difference from Left:

      - Expected
      + Received

      - lemon
      + lime
    `);
  });
  test('if an unexpected right value is received', () => {
    expect(diffReceivedBoth(both('lemon', 'orange'), 'lemon', 'apple')).toMatchInlineSnapshot(`
      Expected Both:
        Left: "lemon"
        Right: "apple"

      Difference from Right:

      - Expected
      + Received

      - apple
      + orange
    `);
  });
  test('if unexpected left and unexpected right string values are received', () => {
    expect(diffReceivedBoth(both('lime', 'orange'), 'lemon', 'apple')).toMatchInlineSnapshot(`
      Expected Both:
        Left: "lemon"
        Right: "apple"

      Difference from Left:

      - Expected
      + Received

      - lemon
      + lime

      Difference from Right:

      - Expected
      + Received

      - apple
      + orange
    `);
  });
  test('if unexpected left and right object values are received', () => {
    expect(diffReceivedBoth(both({ a: 1, b: 1 }, { a: 2, b: 2 }), { a: 3, b: 4 }, { a: 3, b: 4 }))
      .toMatchInlineSnapshot(`
      Expected Both:
        Left: {"a": 3, "b": 4}
        Right: {"a": 3, "b": 4}

      Difference from Left:

      - Expected
      + Received

        Object {
      -   "a": 3,
      -   "b": 4,
      +   "a": 1,
      +   "b": 1,
        }

      Difference from Right:

      - Expected
      + Received

        Object {
      -   "a": 3,
      -   "b": 4,
      +   "a": 2,
      +   "b": 2,
        }
    `);
  });
  test('if unexpected left and right named function values are received ', () => {
    const alwaysFalse = () => false;
    const alwaysTrue = () => true;
    expect(diffReceivedBoth(both(alwaysFalse, alwaysTrue), alwaysFalse, alwaysFalse))
      .toMatchInlineSnapshot(`
      Expected Both:
        Left: [Function alwaysFalse]
        Right: [Function alwaysFalse]

      Difference from Right:

      - Expected
      + Received

      - [Function alwaysFalse]
      + [Function alwaysTrue]
    `);
  });
});

describe('diffReceivedBoth includes the expected and received values when a non-Both Option value is received', () => {
  test('if a Left is received instead of a Both', () => {
    expect(diffReceivedBoth(left(null), 'Expected left value', 'Expected right value'))
      .toMatchInlineSnapshot(`
      Expected Both:
        Left: "Expected left value"
        Right: "Expected right value"
      Received Left: null
    `);
  });
  test('if a Right is received instead of a Both', () => {
    expect(diffReceivedBoth(right(1), 0, 1)).toMatchInlineSnapshot(`
      Expected Both:
        Left: 0
        Right: 1
      Received Right: 1
    `);
  });
});

describe('diffReceivedBoth shows the correct difference when the diffString is null', () => {
  test('if a Both with an unexpected left number value is received', () => {
    expect(diffReceivedBoth(both(1, 1), 2, 1)).toMatchInlineSnapshot(`
      Expected Both:
        Left: 2
        Right: 1

      Difference from Left:

      Expected: 2
      Received: 1
    `);
  });
  test('if a Both with an unexpected left number value is received', () => {
    expect(diffReceivedBoth(both(1, 1), 1, 2)).toMatchInlineSnapshot(`
      Expected Both:
        Left: 1
        Right: 2

      Difference from Right:

      Expected: 2
      Received: 1
    `);
  });
  test('if a Both with an unexpected left and right number values is received', () => {
    expect(diffReceivedBoth(both(1, 2), 3, 4)).toMatchInlineSnapshot(`
      Expected Both:
        Left: 3
        Right: 4

      Difference from Left:

      Expected: 3
      Received: 1

      Difference from Right:

      Expected: 4
      Received: 2
    `);
  });
  test('if a Both with non-matching asymmetric matches is received', () => {
    expect(diffReceivedBoth(both(1, 2), expect.any(String), expect.any(String)))
      .toMatchInlineSnapshot(`
      Expected Both:
        Left: Any<String>
        Right: Any<String>

      Difference from Left:

      Expected: Any<String>
      Received: 1

      Difference from Right:

      Expected: Any<String>
      Received: 2
    `);
  });
});

// comparing values with no visible difference is another jest diff edge case
describe('diffReceivedBoth correctly shows the difference when values have no visible difference', () => {
  test('if unexpected left and right anonymous function values are received', () => {
    expect(
      // each anonymous function is a different function - even if the implementation is the same
      diffReceivedBoth(
        both(
          () => false,
          () => false,
        ),

        () => false,
        () => false,
      ),
    ).toMatchInlineSnapshot(`
      Expected Both:
        Left: [Function anonymous]
        Right: [Function anonymous]

      Difference from Left:

      Compared values have no visual difference.

      Difference from Right:

      Compared values have no visual difference.
    `);
  });
});

// comparing different types is another jest diff edge case
describe('diffReceivedBoth correctly shows the difference when values are of different types', () => {
  test('if a Both with left and right values of different types than the expected values is received', () => {
    expect(diffReceivedBoth(both(1, 'a'), 'a', 1)).toMatchInlineSnapshot(`
      Expected Both:
        Left: "a"
        Right: 1

      Difference from Left:

      Expected: "a"
      Received: 1

      Difference from Right:

      Expected: 1
      Received: "a"
    `);
  });
});

describe('diffReceivedBoth correctly shows a strict equals difference', () => {
  test('if isStrict is true and the received Both is equal but not strictly equal to the expected Both', () => {
    expect(
      // eslint-disable-next-line no-sparse-arrays
      diffReceivedBoth(both([1, , 3], [, 2]), [1, undefined, 3], [undefined, 2], true),
    ).toMatchInlineSnapshot(`
      Expected Both:
        Left: [1, undefined, 3]
        Right: [undefined, 2]

      Difference from Left:

      - Expected
      + Received

        Array [
          1,
      -   undefined,
      +   ,
          3,
        ]

      Difference from Right:

      - Expected
      + Received

        Array [
      -   undefined,
      +   ,
          2,
        ]
    `);
  });
});

describe('diffReceivedBoth indicates no difference found', () => {
  test('if there is not difference between the expected and received values', () => {
    expect(diffReceivedBoth(both(1, 2), 1, 2)).toMatchInlineSnapshot(`
      Expected Both:
        Left: 1
        Right: 2
      No difference found.
    `);
  });
  test('if a Both with matching asymmetric matches is received', () => {
    expect(diffReceivedBoth(both(1, 2), expect.any(Number), expect.any(Number)))
      .toMatchInlineSnapshot(`
      Expected Both:
        Left: Any<Number>
        Right: Any<Number>
      No difference found.
    `);
  });
  test('if isStrict is true and the received Both is strictly equal to the expected Both', () => {
    expect(diffReceivedBoth(both(1, 2), 1, 2, true)).toMatchInlineSnapshot(`
      Expected Both:
        Left: 1
        Right: 2
      No difference found.
    `);
  });
  test('if isStrict is false and the received Both is equal but not strictly equal to the expected Both', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(diffReceivedBoth(both(1, [, 2]), 1, [undefined, 2], false)).toMatchInlineSnapshot(`
      Expected Both:
        Left: 1
        Right: [undefined, 2]
      No difference found.
    `);
  });
  test('if isStrict is not specified and the received Both is equal but not strictly equal to the expected Both', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(diffReceivedBoth(both(1, [, 2]), 1, [undefined, 2])).toMatchInlineSnapshot(`
      Expected Both:
        Left: 1
        Right: [undefined, 2]
      No difference found.
    `);
  });
});
