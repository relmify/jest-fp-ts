# Jest Matchers for the fp-ts ecosystem

[![Build](https://github.com/relmify/jest-fp-ts/actions/workflows/main.yml/badge.svg)](https://github.com/relmify/jest-fp-ts/actions/workflows/main.yml)

Jest matchers for projects using `fp-ts` and `io-ts`.

## Problem

If your TypeScript project is written in a functional programming style using `fp-ts` and `io-ts`,
many of the values you'll want to check in your unit tests will come wrapped inside container types
like `Either`, `Option`, or `These`. Jest has no awareness of these container types and no built-in
matchers to help you to compare wrapped values against un-wrapped values. This leaves you with two
options:

1. Extract the received value from the container type before using a jest matcher.
2. Lift the expected value into a container of the expected type before using a jest matcher.

Both options work, but tend to make your tests somewhat verbose, adding unnecessary work when
writing your tests, and making it harder to read and maintain them.

## Solution

`@relmify/jest-fp-ts` adds additional matchers to Jest's default ones, making it easier to
test code that makes use of `fp-ts` functional containers.

## Installation

With npm:

```sh
npm install -D @relmify/jest-fp-ts
```

With yarn:

```sh
yarn add -D @relmify/jest-fp-ts
```

You also need both `fp-ts` and `io-ts` installed in your project. If you're here, presumably you're
already using `fp-ts`. Not every `fp-ts` project uses `io-ts` though. If you aren't using `io-ts` in
your project, simply install it as a development dependency.

With npm:

```sh
npm install -D io-ts
```

With yarn:

```sh
yarn add -D io-ts
```

## Setup

To make all `@relmify/jest-fp-ts` matchers globally available in your test files, add
`@relmify/jest-fp-ts` to your Jest `setupFilesAfterEnv` configuration.

See [jest documentation](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array) for
additional help.

### Setup with package.json

In your `package.json` file add:

```json
"jest": {
  "setupFilesAfterEnv": ["@relmify/jest-fp-ts"]
}
```

### Setup with jest.config.js

```js
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['@relmify/jest-fp-ts'],
};
```

### Typescript Editor Support

If your editor does not recognize the custom `@relmify/jest-fp-ts` matchers, add a `global.d.ts`
file to your project with:

```ts
import '@relmify/jest-fp-ts';
```

If you've added a `global.d.ts` file and your editor still has problems recognizing these matchers,
you may need to specifically include the `global.d.ts` file in your Typescript configuration using
the `"include"` or `"files"` property. For example, in `tsconfig.json`:

```ts
{
  "compilerOptions": {
    "module": "commonjs",
    "strict": true,
    ...
  },
  "include": ["**/*", "global.d.ts"],
  "exclude": ["node_modules", "**/__tests__/*"]
}
```

Alternatively, you can resolve this issue by adding `import '@relmify/jest-fp-ts';` to each test
file that makes use of `@relmify/jest-fp-ts` matchers.

---

- [Problem](#problem)
- [Solution](#solution)
- [Installation](#installation)
- [Setup](#setup)
- [Matchers](#matchers)
  - [Either Matchers](#either-matchers)
    - [.toBeEither()](#tobeeither)
  - [Either or These Matchers](#either-or-these-matchers)
    - [.toBeLeft()](#tobeleft)
    - [.toBeLeftErrorMatching(string | RegExp)](#tobelefterrormatchingstring--regexp)
    - [.toBeRight()](#toberight)
    - [.toEqualLeft(value)](#toequalleftvalue)
    - [.toEqualRight(value)](#toequalrightvalue)
    - [.toStrictEqualLeft(value)](#tostrictequalleftvalue)
    - [.toStrictEqualRight(value)](#tostrictequalrightvalue)
    - [.toSubsetEqualLeft(value)](#tosubsetequalleftvalue)
    - [.toSubsetEqualRight(value)](#tosubsetequalrightvalue)
  - [These Matchers](#these-matchers)
    - [.toBeBoth()](#tobeboth)
    - [.toBeThese()](#tobethese)
    - [.toEqualBoth(leftValue, rightValue)](#toequalbothleftvalue-rightvalue)
    - [.toStrictEqualBoth(leftValue, rightValue)](#tostrictequalbothleftvalue-rightvalue)
    - [.toSubsetEqualBoth(leftValue, rightvalue)](#tosubsetequalbothleftvalue-rightvalue)
  - [Option Matchers](#option-matchers)
    - [.toBeNone()](#tobenone)
    - [.toBeOption()](#tobeoption)
    - [.toBeSome()](#tobesome)
    - [.toEqualSome(value)](#toequalsomevalue)
    - [.toStrictEqualSome(value)](#tostrictequalsomevalue)
    - [.toSubsetEqualSome(value)](#tosubsetequalsomevalue)
  - [Decode Matchers](#decode-matchers)
    - [.toBeLeftWithErrorsMatching(Array&lt;string | RegExp>)](#tobeleftwitherrorsmatchingarraystring--regexp)
- [Asymmetric matchers](#asymmetric-matchers)
- [LICENSE](#license)
- [Contributing](#contributing)

## Matchers

### Either Matchers

#### .toBeEither()

Use `.toBeEither()` to check if a value is consistent with an `Either`. In other words, this matcher
confirms that the value is a `Left` or a `Right`.

Note that a `Left` or a `Right` value is also consistent with a `These` and would also pass a
`.toBeThese()` test.

### Either or These Matchers

The matchers below can be used for `Left` and `Right` values from an `Either` or a `These`.

#### .toBeLeft()

Use `.toBeLeft()` to check if a value is a `Left`.

#### .toBeLeftErrorMatching(string | RegExp)

Use `.toBeLeftErrorMatching(string | RegExp)` to check if a value is a `Left` whose value is an
instance of `Error` with a `message` property that contains the supplied string or matches the
supplied `RegExp`.

#### .toBeRight()

Use `.toBeRight()` to check if a value is a `Right`.

#### .toEqualLeft(value)

Use `.toEqualLeft(value)` to check if a value is a `Left` whose value equals an expected value. See
Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue) documentation for information
about how the `.toEqual()` comparison works.

#### .toEqualRight(value)

Use `.toEqualRight(value)` to check if a value is a `Right` whose value equals an expected value. See
Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue) documentation for information
about how the `.toEqual()` comparison works.

#### .toStrictEqualLeft(value)

Use `.toStrictEqualLeft(value)` to check if a value is a `Left` that contains a value that strictly
equals an expected value. See Jest's
[toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation for
information about how `.toStrictEqual()` differs from `toEqual()`.

#### .toStrictEqualRight(value)

Use `.toStrictEqualRight(value)` to check if a value is a `Right` that contains a value that strictly
equals an expected value. See Jest's
[toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation for
information about how `.toStrictEqual()` differs from `toEqual()`.

#### .toSubsetEqualLeft(value)

Use `.toSubsetEqualLeft(value)` to check if a value is a `Left` whose value equals or subset matches
the expected value. A subset match passes when the received value is a `Left` whose value is an object
with a subset of properties that match the expected object. The received value must contain all of
the expected properties, and may contain more than the expected properties.

You can also pass an array of values to match against a received `Left` value that is an array of
values. In this case, each value in the expected array is compared against the corresponding value
in the array contained in the received `Left`. Both arrays must be the same length or the match will
fail.

Note that an empty expected object will match against any received `Left` whose value is an object.

#### .toSubsetEqualRight(value)

Use `.toSubsetEqualRight(value)` to check if a value is a `Right` whose value equals or subset matches
the expected value. A subset match passes when the received value is a `Right` whose value is an
object with a subset of properties that match the expected object. The received value must contain
all of the expected properties, and may contain more than the expected properties.

You can also pass an array of values to match against a received `Right` value that is an array of
values. In this case, each value in the expected array is compared against the corresponding value
in the array contained in the received `Right`. Both arrays must be the same length or the match will
fail.

Note that an empty expected object will match against any received `Right` whose value is an object.

### These Matchers

#### .toBeBoth()

Use `.toBeBoth()` to check if a value is a `Both`.

#### .toBeThese()

Use `.toBeThese()` to check if a value is consistent with a `These`. In other words, this matcher
confirms that the value is a `Left`, a `Right`, or a `Both`.

Note that a `Left` or a `Right` value is also consistent with an `Either` and would also pass a
`.toBeEither()` test.

#### .toEqualBoth(leftValue, rightValue)

Use `.toEqualBoth(leftValue, rightValue)` to check if a value is a `Both` that contains a left value
that equals an expected value, and a right value that equals an expected value. See Jest's
[toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue) documentationfor information about
how the `.toEqual()` comparison works.

#### .toStrictEqualBoth(leftValue, rightValue)

Use `.toStrictEqualBoth(leftValue, rightValue)` to check if a value is a `Both` that contains a left
value that strictly equals an expected value, and a right value that strictly equals an expected
value. See Jest's [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue)
documentation for information about how `.toStrictEqual()` differs from `toEqual()`.

#### .toSubsetEqualBoth(leftValue, rightValue)

Use `.toSubsetEqualBoth(leftValue, rightValue)` to check if a value is a `Both` whose left and right
values equal or subset match the expected `leftValue` and `rightValue`. A subset match passes when a
received value is an object with a subset of properties that match the expected object. The received
value must contain all of the expected properties, and may contain more than the expected
properties.

You can also pass arrays of values to match against received values that contain arrays of values.
In this case, each value in the expected array is compared against the corresponding value in the
array contained in the received. Both arrays must be the same length or the match will fail.

Note that an empty expected object will match against any received object.

### Option Matchers

#### .toBeNone()

Use `.toBeNone()` to check if a value is a `None`.

#### .toBeOption()

Use `.toBeOption()` to check if a value is an `Option` (either a `Some` or a `None`).

#### .toBeSome()

Use `.toBeSome()` to check if a value is a `Some`.

#### .toEqualSome(value)

Use `.toEqualSome(value)` to check if a value is a `Some` that contains a value that equals an
expected value. See Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue)
documentationfor information about how the `.toEqual()` comparison works.

#### .toStrictEqualSome(value)

Use `.toStrictEqualSome(value)` to check if a value is a `Some` that contains a value that strictly
equals an expected value. See Jest's
[toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation for
information about how `.toStrictEqual()` differs from `toEqual()`.

#### .toSubsetEqualSome(value)

Use `.toSubsetEqualSome(value)` to check if a value is a `Some` that contains an object with a subset
of properties that match the expected object properties. The received value must contain all of the
expected properties, and may contain more than the expected properties.

### Decode Matchers

#### .toBeLeftWithErrorsMatching(Array&lt;string | RegExp>)

Use `.toBeLeftWithErrorsMatching(Array<string | RegExp>)` when testing validation errors returned by
`io-ts` `decode()` operations.

Note that a `ValidationError` is NOT a standard javascript `Error` object. See
[.toBeLeftErrorMatching(string | RegExp)](#tobelefterrormatchingstring--regexp) for a matcher that
works with standard `Error` objects.

An `io-ts` `decode()` method will return a Left with an array of `ValidationError` objects if the
supplied value can not be successfully validated and decoded to the specified `io-ts` type. For codecs
that are composed from multiple codecs, multiple errors may be returned as each sub-codec is applied
to the values it is charged with validating.

This matcher provides an easy way to check if expected validation errors are present. To do this, it
makes use of the `io-ts` `PathReporter` module.

To use this matcher, supply an array of strings that you expect to be present in the array of
strings returned by `PathReporter.report()`. You can supply either regular expressions or
substrings. The matcher will try to match each array entry against the array of
`Pathreporter.report()` strings.

If the supplied object is not a `Left` that contains an array of `ValidationError` objects, or if
any of the strings you supply cannot be matched to one of the `ValidationError` objects, the matcher
will return `false`. If all of the strings you supply are matched, it will return `true`.

Example:

```ts
const Name = t.type({
  first: t.string,
  last: t.string,
});
type Name = t.TypeOf<typeof Name>;
const numberName = { first: 404, last: 401 };
test('if the received is a Left that contains errors matching the expected values', () => {
  expect(Name.decode(numberName)).toBeLeftWithErrorsMatching([/404/, '401']);
});
```

**Note:**

This matcher supports the current (stable) `io-ts` interface. There is a new experimental `io-ts`
decoder interface that returns `Either<DecodeError, A>` results instead. This matcher does not
support that interface.

## Asymmetric Matchers

All of the provided matchers are asymmetric matchers, which means that they can be called from any
other matcher that accepts asymmetric matchers like so:

```ts
test('works if called as an asymmetric matcher', () => {
  expect(left('Any sufficiently advanced technology is equivalent to magic.')).toEqual(
    expect.toEqualLeft('Any sufficiently advanced technology is equivalent to magic.'),
  );
});
```

The provided `toEqual*(value)`, `toStrictEqual*(value)` and `toSubsetEqual*(value)`matchers also
accept asymmetric matchers which means you can pass in any of the standard Jest asymmetric matchers,
or any of the jest-extended matchers. This can be especially handy when you don't want to check
against a literal value.

```ts
test('works if called with an asymmetric matcher', () => {
  expect(both(['error 1', 'error 2'], { first: 'Albert', last: 'Einstein' })).toEqualBoth(
    expect.anything(),
    { first: expect.any(String), last: expect.any(String) },
  );
});
```

The `.toBeLeftWithErrorsMatching(Array<string | RegExp>)` matcher does not accept asymmetric
matchers. You can use standard jest matchers to achieve similar results like so:

```ts
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { toBeLeftWithErrorsMatching } from '@relmify/jest-fp-ts';

expect.extend({ toBeLeftWithErrorsMatching });

const Name = t.type({
  first: t.string,
  last: t.string,
});
type Name = t.TypeOf<typeof Name>;

const receivedName = { first: 1, last: undefined };
const validation = Name.decode(receivedName);
const errorStrings = PathReporter.report(validation);

// Snapshots below use `@relmify/jest-serializer-strip-ansi` and `jest-snapshot-serializer-raw` to produce
// more readable snapshot output.
describe('Alternative ways to test validation errors', () => {
  test('Standard asymmetric matchers can be used to test for strings within pathReporter output', () => {
    expect(errorStrings).toEqual(
      expect.arrayContaining([expect.stringMatching('1'), expect.stringMatching(/undefined/)]),
    );
  });
  test('Standard snapshot tests can be used to test full pathReporter output', () => {
    expect(errorStrings).toMatchInlineSnapshot(`
      [
        Invalid value 1 supplied to : { first: string, last: string }/first: string,
        Invalid value undefined supplied to : { first: string, last: string }/last: string,
      ]
    `);
  });
  test('Standard snapshot tests can be used to test the raw array of validation errors (verbose!)', () => {
    expect(validation).toMatchInlineSnapshot(`
      {
        _tag: Left,
        left: [
          {
            context: [
              {
                actual: {
                  first: 1,
                  last: undefined,
                },
                key: ,
                type: InterfaceType {
                  _tag: InterfaceType,
                  decode: [Function],
                  encode: [Function],
                  is: [Function],
                  name: { first: string, last: string },
                  props: {
                    first: StringType {
                      _tag: StringType,
                      decode: [Function],
                      encode: [Function],
                      is: [Function],
                      name: string,
                      validate: [Function],
                    },
                    last: StringType {
                      _tag: StringType,
                      decode: [Function],
                      encode: [Function],
                      is: [Function],
                      name: string,
                      validate: [Function],
                    },
                  },
                  validate: [Function],
                },
              },
              {
                actual: 1,
                key: first,
                type: StringType {
                  _tag: StringType,
                  decode: [Function],
                  encode: [Function],
                  is: [Function],
                  name: string,
                  validate: [Function],
                },
              },
            ],
            message: undefined,
            value: 1,
          },
          {
            context: [
              {
                actual: {
                  first: 1,
                  last: undefined,
                },
                key: ,
                type: InterfaceType {
                  _tag: InterfaceType,
                  decode: [Function],
                  encode: [Function],
                  is: [Function],
                  name: { first: string, last: string },
                  props: {
                    first: StringType {
                      _tag: StringType,
                      decode: [Function],
                      encode: [Function],
                      is: [Function],
                      name: string,
                      validate: [Function],
                    },
                    last: StringType {
                      _tag: StringType,
                      decode: [Function],
                      encode: [Function],
                      is: [Function],
                      name: string,
                      validate: [Function],
                    },
                  },
                  validate: [Function],
                },
              },
              {
                actual: undefined,
                key: last,
                type: StringType {
                  _tag: StringType,
                  decode: [Function],
                  encode: [Function],
                  is: [Function],
                  name: string,
                  validate: [Function],
                },
              },
            ],
            message: undefined,
            value: undefined,
          },
        ],
      }
    `);
  });
});
```

## LICENSE

[MIT](/LICENSE)

## Contributing

If you've come here to help contribute - Thanks! Take a look at [CONTRIBUTING](/CONTRIBUTING.md) to
see how to get started.
