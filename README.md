# Jest Matchers for the fp-ts ecosystem

Jest matchers for projects using `fp-ts` and `io-ts`.

## Problem

If your TypeScript project is written in a functional programming style using `fp-ts` and `io-ts`,
many of the values you'll want to check in your unit tests will come wrapped inside container types
like Either, Option, or These. Jest has no awareness of these container types and no built-in
matchers to help you to compare wrapped values against un-wrapped values. This leaves you with two
options:

1. Extract the received value from the container type before using a jest matcher.
2. Lift the expected value into a container of the expected type before using a jest matcher.

Both options work, but tend to make your tests somewhat verbose, adding unnecessary work when
writing your tests, and making it harder to read and maintain them.

## Solution

`@relmify/jest-fp-ts` aims to add additional matchers to Jest's default ones, making it easier to
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

Add `@relmify/jest-fp-ts` to your Jest `setupFilesAfterEnv` configuration.

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

Instead of configuring jest using `package.json`, you can use a `jest.config.js` file to specify the
`setupFilesAfterEnv` configuration. There you can specify a setup file such as `./jest.setup.js`
that will require `@relmify/jest-fp-ts`:

```js
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
};
```

```js
// jest.setup.js
require('@relmify/jest-fp-ts');
```

If you are using other jest custom matcher packages too, you can `require` them in the same
`jest.setup.js` file.

### Typescript Editor Support

If your editor does not recognize the custom `@relmify/jest-fp-ts` matchers, add a `global.d.ts`
file to your project with:

```ts
import '@relmify/jest-fp-ts';
```

If your editor still has problems recognizing these matchers, you may need to specifically include
the `global.d.ts` file in your Typescript configuration using the `"include"` or `"files"` property.
For example, in `tsconfig.json`:

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

---

- [Problem](#problem)
- [Solution](#solution)
- [Installation](#installation)
- [Setup](#setup)
- [Matchers](#matchers)
  - [Either Matchers](#either-matchers)
    - [.toBeEither()](#toBeEither)
  - [Either or These Matchers](#either-or-these-matchers)
    - [.toBeLeft()](#toBeLeft)
    - [.toBeRight()](#toBeRight)
    - [.toEqualLeft(value)](#toEqualLeftValue)
    - [.toEqualRight(value)](#toEqualRightValue)
    - [.toStrictEqualLeft(value)](#toStrictEqualLeftValue)
    - [.toStrictEqualRight(value)](#toStrictEqualRightValue)
    - [.toSubsetEqualLeft(value)](#toSubsetEqualLeftValue)
    - [.toSubsetEqualRight(value)](#toSubsetEqualRightValue)
  - [These Matchers](#these-Matchers)
    - [.toBeBoth()](#toBeBoth)
    - [.toBeThese()](#toBeThese)
    - [.toEqualBoth(leftValue, rightValue)](#toEqualBothLeftValue-RightValue)
    - [.toStrictEqualBoth(leftValue, rightValue)](#toStrictEqualBothLeftValue-RightValue)
    - [.toSubsetEqualBoth(leftValue, rightvalue)](#toSubsetEqualBothLeftValue-RightValue)
  - [Option Matchers](#optionMatchers)
    - [.toBeNone()](#toBeNone)
    - [.toBeOption()](#toBeOption)
    - [.toBeSome()](#toBeSome)
    - [.toEqualSome(value)](#toEqualSomeValue)
    - [.toStrictEqualSome(value)](#toStrictEqualSomeValue)
    - [.toSubsetEqualSome(value)](#toSubsetEqualSomeValue)
  - [Decode Matchers](#decodeMatchers)
    - [.toBeLeftWithErrorsMatching(value)](#toBeLeftWithErrorsMatchingValue)
- [Asymmetric matchers](#asymmetric-matchers)
- [LICENSE](#license)
- [Contributing](#contributing)

## Matchers

### Either Matchers

#### .toBeEither()

Use `.toBeEither()` to check if a value is consistent with an Either. In other words, this matcher
confirms that the value is a Left or a Right.

Note that a Left or a Right value is also consistent with a These and would also pass a
`.toBeThese()` test.

### Either or These Matchers

The matchers below can be used for Left and Right Either or These values.

#### .toBeLeft()

Use `.toBeLeft()` to check if a value is a Left.

#### .toBeRight()

Use `.toBeRight()` to check if a value is a Right.

#### .toEqualLeft(value)

Use `.toEqualLeft(value)` to check if a value is a Left whose value equals an expected value. See
Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue) documentationfor information
about how the `.toEqual()` comparison works.

#### .toEqualRight(value)

Use `.toEqualRight(value)` to check if a value is a Right whose value equals an expected value. See
Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue) documentationfor information
about how the `.toEqual()` comparison works.

#### .toStrictEqualLeft(value)

Use `.toStrictEqualLeft(value)` to check if a value is a Left that contains a value that strictly
equals an expected value. See Jest's
[toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation for
information about how `.toStrictEqual()` differs from `toEqual()`.

#### .toStrictEqualRight(value)

Use `.toStrictEqualRight(value)` to check if a value is a Right that contains a value that strictly
equals an expected value. See Jest's
[toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation for
information about how `.toStrictEqual()` differs from `toEqual()`.

#### .toSubsetEqualLeft(value)

Use `.toSubsetEqualLeft(value)` to check if a value is a Left whose value equals or subset matches
the expected value. A subset match passes when the received value is a Left whose value is an object
with a subset of properties that match the expected object. The received value must contain all of
the expected properties, and may contain more than the expected properties.

You can also pass an array of values to match against a received Left value that is an array of
values. In this case, each value in the expected array is compared against the corresponding value
in the array contained in the received Left. Both arrays must be the same length or the match will
fail.

Note that an empty expected object will match against any received Left whose value is an object.

#### .toSubsetEqualRight(value)

Use `.toSubsetEqualRight(value)` to check if a value is a Right whose value equals or subset matches
the expected value. A subset match passes when the received value is a Right whose value is an
object with a subset of properties that match the expected object. The received value must contain
all of the expected properties, and may contain more than the expected properties.

You can also pass an array of values to match against a received Right value that is an array of
values. In this case, each value in the expected array is compared against the corresponding value
in the array contained in the received Right. Both arrays must be the same length or the match will
fail.

Note that an empty expected object will match against any received Right whose value is an object.

### These Matchers

#### .toBeBoth()

Use `.toBeBoth()` to check if a value is a Both.

#### .toBeThese()

Use `.toBeThese()` to check if a value is consistent with a These. In other words, this matcher
confirms that the value is a Left, a Right, or a Both.

Note that a Left or a Right value is also consistent with an Either and would also pass a
`.toBeEither()` test.

#### .toEqualBoth(leftValue, rightValue)

Use `.toEqualBoth(leftValue, rightValue)` to check if a value is a Both that contains a left value
that equals an expected value, and a right value that equals an expected value. See Jest's
[toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue) documentationfor information about
how the `.toEqual()` comparison works.

#### .toStrictEqualBoth(leftValue, rightValue)

Use `.toStrictEqualBoth(leftValue, rightValue)` to check if a value is a Both that contains a Left
value that strictly equals an expected value, and a Right value that strictly equals an expected
value. See Jest's [toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue)
documentation for information about how `.toStrictEqual()` differs from `toEqual()`.

#### .toSubsetEqualBoth(leftValue, rightValue)

Use `.toSubsetEqualBoth(leftValue, rightValue)` to check if a value is a Both whose left and right
values equal or subset match the expected `leftValue` and `rightValue`. A subset match passes when a
received value is an object with a subset of properties that match the expected object. The received
value must contain all of the expected properties, and may contain more than the expected
properties.

If you pass an array as the expected You can also pass arrays of values to match against received
values that contain arrays of values. In this case, each value in the expected array is compared
against the corresponding value in the array contained in the received. Both arrays must be the same
length or the match will fail.

Note that an empty expected object will match against any received object.

### Option Matchers

#### .toBeNone()

Use `.toBeNone()` to check if a value is a None.

#### .toBeOption()

Use `.toBeOption()` to check if a value is a Option (either a Some or a None).

#### .toBeSome()

Use `.toBeSome()` to check if a value is a Some.

#### .toEqualSome(value)

Use `.toEqualSome(value)` to check if a value is a Some that contains a value that equals an
expected value. See Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue)
documentationfor information about how the `.toEqual()` comparison works.

#### .toStrictEqualSome(value)

Use `.toStrictEqualSome(value)` to check if a value is a Some that contains a value that strictly
equals an expected value. See Jest's
[toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation for
information about how `.toStrictEqual()` differs from `toEqual()`.

#### .toSubsetEqualSome(value)

Use `.toSubsetEqualSome(value)` to check if a value is a Some that contains an object with a subset
of properties that match the expected object properties. The received value must contain all of the
expected properties, and may contain more than the expected properties.

### Decode Matchers

#### .toBeLeftWithErrorsMatching(Array&lt;string | regex>)

Use `.toBeLeftWithErrorsMatching(Array<string | regex>)` when testing validation errors returned by
io-ts codec `decode()` operations.

An io-ts type codec `decode` method will return a `left` with an array of ValidationError objects if
the supplied value does can not be successfully validated and decoded to the specified io-ts type.

For codecs that are composed from multiple codecs, multiple errors may be returned as each sub-codec
is applied to the values it is charged with validating.

This matcher provides an easy way to check if expected validation errors are present. To do this, it
makes use of the io-ts PathReporter module.

To use this matcher, supply an array of strings that you expect to be present in the array of
strings returned by `PathReporter.report()`. You can supply either regular expressions or
substrings. The matcher will try to match each array entry against the array of ValidationErrors.

If the supplied object is not a Left that contains an array of ValidationErrors, or if any of the
strings you supply cannot be matched to one of the ValidationErrors, the matcher will return
`false`. If all of the strings you supply are matched, it will return `true`.

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

Note: There is a new experimental io-ts interface that returns decode errors in a different,
backwards-incompatible format. This matcher cannot be used for those types of errors.

## Asymmetric Matchers

All of the provided matchers are asymmetric matchers, which means that they can be called from
any other matcher that accepts asymmetric matchers like so:

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

## LICENSE

[MIT](/LICENSE)

## Contributing

If you've come here to help contribute - Thanks! Take a look at [contributing](/CONTRIBUTING.md) to
see how to get started.
