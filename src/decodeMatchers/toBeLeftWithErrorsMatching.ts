import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { equals, isValidation, containsMatches } from '../predicates';
import { pipe } from 'fp-ts/lib/function';
import { isLeft, left } from 'fp-ts/lib/Either';
import { printReceivedValue } from '../either/print';

const passMessage = (received: t.Validation<unknown>, expected: Array<string | RegExp>) => () => {
  const hint =
    matcherHint('.not.toBeLeftWithErrorsMatching', 'received', 'expectedErrorsMatching') + '\n\n';
  const expectedValue = `Expected Errors: not ${printExpected(expected)}`;
  const receivedValue = equals(left(expected))(received)
    ? ''
    : `\nReceived Errors:     ${printReceived(PathReporter.report(received))}`;
  return hint + expectedValue + receivedValue;
};

const failMessage = (received: unknown, expected: Array<string | RegExp>) => () => {
  return isValidation(received)
    ? isLeft(received)
      ? matcherHint('.toBeLeftWithErrorsMatching', 'received', 'expectedErrorsMatching') +
        '\n\n' +
        `Expected Errors: ${printExpected(expected)}\n` +
        `Received Errors: ${printReceived(PathReporter.report(received))}`
      : matcherHint('.toBeLeftWithErrorsMatching', 'received', 'expectedErrorsMatching') +
        '\n\n' +
        `Expected Errors: ${printExpected(expected)}\n` +
        `${printReceivedValue(received)}`
    : matcherHint('.toBeLeftWithErrorsMatching', 'received', 'expectedErrorsMatching') +
        '\n\n' +
        'Received value is not a Validation.\n' +
        `Expected Errors: ${printExpected(expected)}\n` +
        `Received: ${printReceived(received)}`;
};

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * @summary
       * Used to check that the value is a Left Validation which contains an array of
       * ValidationErrors that, when processed by `PathReporter.report()`,  match an array of
       * supplied strings or regular expressions.
       *
       * @description
       * An io-ts type codec `decode()` method will return a Left with an array of ValidationError
       * objects if the supplied value can not be successfully validated and decoded to the
       * specified io-ts type.
       *
       * For codecs that are composed from multiple codecs, multiple errors may be returned as each
       * sub-codec is applied to the values it is charged with validating.
       *
       * This matcher provides an easy way to check if expected validation errors are present. To do
       * this, it makes use of the io-ts PathReporter module.
       *
       * To use this matcher, supply an array of strings that you expect to be present in the array
       * of strings returned by `PathReporter.report()`. You can supply either regular expressions
       * or substrings. The matcher will try to match each array entry against each entry in the
       * array of `PathReporter.report()` strings.
       *
       * If the supplied object is not a Left that contains an array of ValidationErrors, or if any
       * of the strings you supply cannot be matched to one of the ValidationErrors, the matcher
       * will return `false`. If all of the strings you supply are matched, it will return `true`.
       *
       * Note: This matcher supports the current (stable) io-ts interface. There is a new
       * experimental io-ts decoder interface that returns `Either<DecodeError, A>` results instead.
       * This matcher does not support that interface.
       *
       * @examples
       * ```typescript
       *  import * as t from 'io-ts';
       *  import { PathReporter } from 'io-ts/lib/PathReporter';
       *
       *  const Name = t.type({first: t.string, last: t.string});
       *  type Name = t.TypeOf<typeof Name>;
       *
       *  const receivedName = {first: 1, last: undefined};
       *  const validation = Name.decode(receivedName);
       *
       *  test('The number 1 and the value undefined are invalid values for the t.string codec', () => {
       *    expect(validation).toBeLeftWithErrorsMatching(['1', /undefined/]);
       *  });
       *
       *  const errorStrings = PathReporter.report(validation);
       *
       *  test('PathReporter and standard jest matchers can be used instead if you prefer', () => {
       *    expect(errorStrings).toEqual(
       *      expect.arrayContaining([expect.stringMatching('1'), expect.stringMatching(/undefined/)]),
       *    );
       *  });
       *
       *  test('Snapshot tests can be used to test full pathReporter output if you prefer', () => {
       *    // Custom snapshot serializers are used to removed escape characters in snapshot text
       *    expect(errorStrings).toMatchInlineSnapshot(`
       *      Array [
       *        Invalid value 1 supplied to : { first: string, last: string }/first: string,
       *        Invalid value undefined supplied to : { first: string, last: string }/last: string,
       *      ]
       *    `);
       *  });
       * ```
       */
      readonly toBeLeftWithErrorsMatching: (expected: unknown) => R;
    }
    interface Expect {
      /**
       * @summary
       * Used to check that the value is a Left Validation which contains an array of
       * ValidationErrors that, when processed by `PathReporter.report()`,  match an array of
       * supplied strings or regular expressions.
       *
       * @description
       * An io-ts type codec `decode()` method will return a Left with an array of ValidationError
       * objects if the supplied value can not be successfully validated and decoded to the
       * specified io-ts type.
       *
       * For codecs that are composed from multiple codecs, multiple errors may be returned as each
       * sub-codec is applied to the values it is charged with validating.
       *
       * This matcher provides an easy way to check if expected validation errors are present. To do
       * this, it makes use of the io-ts PathReporter module.
       *
       * To use this matcher, supply an array of strings that you expect to be present in the array
       * of strings returned by `PathReporter.report()`. You can supply either regular expressions
       * or substrings. The matcher will try to match each array entry against each entry in the
       * array of `PathReporter.report()` strings.
       *
       * If the supplied object is not a Left that contains an array of ValidationErrors, or if any
       * of the strings you supply cannot be matched to one of the ValidationErrors, the matcher
       * will return `false`. If all of the strings you supply are matched, it will return `true`.
       *
       * Note: This matcher supports the current (stable) io-ts interface. There is a new
       * experimental io-ts decoder interface that returns `Either<DecodeError, A>` results instead.
       * This matcher does not support that interface.
       *
       * @examples
       * ```typescript
       *  import * as t from 'io-ts';
       *  import { PathReporter } from 'io-ts/lib/PathReporter';
       *
       *  const Name = t.type({first: t.string, last: t.string});
       *  type Name = t.TypeOf<typeof Name>;
       *
       *  const receivedName = {first: 1, last: undefined};
       *  const validation = Name.decode(receivedName);
       *
       *  test('The number 1 and the value undefined are invalid values for the t.string codec', () => {
       *    expect(validation).toBeLeftWithErrorsMatching(['1', /undefined/]);
       *  });
       *
       *  const errorStrings = PathReporter.report(validation);
       *
       *  test('PathReporter and standard jest matchers can be used instead if you prefer', () => {
       *    expect(errorStrings).toEqual(
       *      expect.arrayContaining([expect.stringMatching('1'), expect.stringMatching(/undefined/)]),
       *    );
       *  });
       *
       *  test('Snapshot tests can be used to test full pathReporter output if you prefer', () => {
       *    // Custom snapshot serializers are used to removed escape characters in snapshot text
       *    expect(errorStrings).toMatchInlineSnapshot(`
       *      Array [
       *        Invalid value 1 supplied to : { first: string, last: string }/first: string,
       *        Invalid value undefined supplied to : { first: string, last: string }/last: string,
       *      ]
       *    `);
       *  });
       * ```
       */
      readonly toBeLeftWithErrorsMatching: (expected: unknown) => any;
    }
  }
}

/**
 * Check that the received value is a Left Validation which contains an array of ValidationErrors
 * that, when processed by PathReporter.report(), match an array of supplied strings or regular
 * expressions.
 */
export const toBeLeftWithErrorsMatching = (
  received: unknown,
  expected: Array<string | RegExp>,
): any => {
  const pass =
    isValidation(received) &&
    isLeft(received) &&
    pipe(received, PathReporter.report, containsMatches(expected));

  return {
    pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
