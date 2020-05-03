/**
 * Returns true if the received string contains the expected string, or if the received string
 * matches the supplied regular expression
 */
export const matches = (expected: string | RegExp) => (received: string): boolean =>
  typeof expected === 'string' ? received.includes(expected) : new RegExp(expected).test(received);
