import { subsetEquals } from './equals';

/**
 * Returns `true` if the received object is a superset of the expected object
 *
 * If an array is passed, it treats it as an array of objects, and matches
 * each object in the received array against the corresponding object in the
 * expected array. If the two arrays are not equal in length it will return `false`.
 */
export const matchesObject = (expected: unknown) => (received: unknown): boolean =>
  subsetEquals(expected)(received);
