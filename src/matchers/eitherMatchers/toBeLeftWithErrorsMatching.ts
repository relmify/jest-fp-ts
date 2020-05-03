import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { Either } from 'fp-ts/lib/Either';
import { containsMatches } from '../../predicates';
import { pipe } from 'fp-ts/lib/pipeable';

declare global {
  namespace jest {
    interface Matchers<R> {
      readonly toBeLeftWithErrorsMatching: (expected: unknown) => CustomMatcherResult;
    }
    interface Expect {
      readonly toBeLeftWithErrorsMatching: (expected: unknown) => CustomMatcherResult;
    }
  }
}

const passMessage = (received: Either<t.Errors, unknown>, expected: Array<string | RegExp>) => () =>
  matcherHint('.not.toBeLeftWithErrorsMatching', 'received', 'expectedLeftErrorsMatching') +
  '\n\n' +
  'Expected Either not to be left with errors matching:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  printReceived(PathReporter.report(received));

const failMessage = (received: Either<t.Errors, unknown>, expected: Array<string | RegExp>) => () =>
  matcherHint('.toBeLeftWithErrorsMatching', 'received', 'expectedLeftErrorsMatching') +
  '\n\n' +
  'Expected Either to be left with errors matching:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  printReceived(PathReporter.report(received));

/**
 * Used to check that the value is a `Left` that contains an array of ValidationErrors
 * that match an array of supplied strings or regular expressions.
 *
 * @remarks
 * An io-ts type codec `decode` method will return a `left` with an array of ValidationError
 * objects if the supplied value does can not be successfully validated and decoded to the
 * specified io-ts type.
 *
 * For codecs that are composed from multiple codecs, multiple errors may be returned as
 * each sub-codec is applied to the values it is charged with validating.
 *
 * This matcher provides an easy way to check if expected validation errors are
 * present. To do this, it makes use of the io-ts PathReporter module.
 *
 * To use this matcher, supply an array of strings that you expect to be present
 * in the array of strings returned by `PathReporter.report()`. You can supply either
 * regular expressions or substrings. The matcher will try to match each array
 * entry against the array of ValidationErrors.
 *
 * If the supplied object is not a left that contains an array of ValidationErrors,
 * or if any of the strings you supply cannot be matched to one of the ValidationErrors,
 * the matcher will return `false`. If all of the strings you supply are matched, it
 * will return `true`.
 *
 * @example
 * ```typescript
 *  import * as t from 'io-ts';
 *
 *  const Name = t.type({first: t.string, last: t.string});
 *  type Name = t.TypeOf<typeof Name>;
 *
 *  // The number 1 and the value undefined are invalid values for the t.string codec
 *  expect(Name.decode({first: 1, last: undefined})).toBeLeftWithErrorsMatching(['1', /undefined/]);
 *
 *  // You can just check for a subset of errors if you like
 *  expect(Name.decode({first: 1, last: undefined})).toBeLeftWithErrorsMatching(['undefined']);
 * ```
 */
export const toBeLeftWithErrorsMatching = (
  received: Either<t.Errors, any>,
  expected: Array<string | RegExp>,
): jest.CustomMatcherResult => {
  const pass = pipe(received, PathReporter.report, containsMatches(expected));

  return {
    pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
