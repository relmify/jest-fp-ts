/**
 * Returns true if the received array contains a match for the expected value
 */
export const containsMatch = (
  receivedArray: Array<string> | ReadonlyArray<string>,
  expectedValue: string | RegExp,
): boolean => {
  const matchesItem =
    (expected: string | RegExp) =>
    (received: string): boolean => {
      return typeof expected === 'string'
        ? received.includes(expected)
        : new RegExp(expected).test(received);
    };
  return receivedArray.findIndex((item) => matchesItem(expectedValue)(item)) > -1;
};
