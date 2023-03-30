/**
 * Returns true if the received string matches the expected value meaning
 * the received string contains the expected string as a substring or matches
 * the supplied regular expression.
 */
export const matches = (received: string, expected: string | RegExp): boolean => {
  return typeof expected === 'string'
    ? received.includes(expected)
    : new RegExp(expected).test(received);
};
