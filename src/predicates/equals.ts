import {
  equals as jestEquals,
  iterableEquality,
  typeEquality,
  sparseArrayEquality,
  arrayBufferEquality,
  subsetEquality,
} from '../util';

/**
 * Returns `true` if the shape and value of the received object or primitive is equal
 * to the shape and value of expected object or primitive.
 *
 * When called to compare two objects, `equals` performs a deep object comparison.
 * All keys must be present in both objects and no extra keys can be present in
 * either object. However, the check will still succeed when extra keys with
 * undefined values are present.
 */
export const equals =
  (expected: unknown) =>
  (received: unknown): boolean =>
    jestEquals(received, expected, [iterableEquality]);

/**
 * Returns `true` if the shape and value of the received object or primitive is equal
 * to the shape and value of expected object or primitive.
 *
 * When called to compare two objects, `equals` performs a deep object comparison.
 * All keys must be present in both objects and no extra keys can be present in
 * either object. Unlike `equals` a strict equals check will also fail when:
 *
 * - extra keys with undefined values are present
 * - a sparse array is compared to an array with undefined values instead of missing values
 * - a class instance is compared to a literal object instance with the same properties
 */
export const strictEquals =
  (expected: unknown) =>
  (received: unknown): boolean =>
    jestEquals(
      received,
      expected,
      [iterableEquality, typeEquality, sparseArrayEquality, arrayBufferEquality],
      true,
    );

/**
 * Returns `true` if a subset of the received object matches the expected object.
 *
 * If an array is passed, it treats it as an array of objects to match, matching
 * each object in the received array against the corresponding object in the
 * expected array. If the two arrays are not equal in length it will return `false`.
 */
export const subsetEquals =
  (expected: unknown) =>
  (received: unknown): boolean =>
    jestEquals(received, expected, [iterableEquality, subsetEquality]);
