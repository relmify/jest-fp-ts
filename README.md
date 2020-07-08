# Jest Matchers for the fp-ts ecosystem

Jest matchers for projects using `fp-ts` and `io-ts`.

## Problem

If your TypeScript project is written in a functional programming style using `fp-ts` and `io-ts`, many
of the values you'll want to check in your unit tests will come wrapped inside container types like
Either, Option, or These. Jest has no awareness of these container types and no built-in matchers to
help you to compare wrapped values against un-wrapped values. This leaves you with two options:

1. Extract the received value from the container type before using a jest matcher.
2. Lift the expected value into a container of the expected type before using a jest matcher.

Both options work, but tend to make your tests somewhat verbose, adding unnecessary work when
writing your tests, and making it harder to read and maintain them.

## Solution

`@relmify/jest-fp-ts` aims to add additional matchers to Jest's default ones, making it easier to test code
that makes use of `fp-ts` functional containers.

## Installation

With npm:

```sh
npm install -D @relmify/jest-fp-ts
```

With yarn:

```sh
yarn add -D @relmify/jest-fp-ts
```

## Setup

Add `@relmify/jest-fp-ts` to your Jest `setupFilesAfterEnv` configuration.

See [jest documentation](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array) for additional help.

### Setup with package.json

In your `package.json` file add:

```json
"jest": {
  "setupFilesAfterEnv": ["@relmify/jest-fp-ts"]
}
```

### Setup with jest.config.js

Instead of configuring jest using `package.json`, you can use a `jest.config.js` file to specify the `setupFilesAfterEnv` configuration. There you can specify a setup file such as `./jest.setup.js` that will require `@relmify/jest-fp-ts`:

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

If you are using other jest custom matcher packages too, you can `require` them in the same `jest.setup.js` file.

### Typescript Editor Support

If your editor does not recognise the custom `@relmify/jest-fp-ts` matchers, add a `global.d.ts` file to your project with:

```ts
import '@relmify/jest-fp-ts';
```

---

- [Problem](#problem)
- [Solution](#solution)
- [Installation](#installation)
- [Setup](#setup)
- [Matchers](#matchers)
  - [.toBeEither()](#toBeEither)
  - [.toBeLeft()](#toBeLeft)
  - [.toBeLeftWithErrorsMatching(value)](#toBeLeftWithErrorsMatchingValue)
  - [.toBeRight()](#toBeRight)
  - [.toEqualLeft(value)](#toEqualLeftValue)
  - [.toEqualRight(value)](#toEqualRightValue)
  - [.toStrictEqualLeft(value)](#toStrictEqualLeftValue)
  - [.toStrictEqualRight(value)](#toStrictEqualRightValue)
  - [.toSubsetEqualLeft(value)](#toSubsetEqualLeftValue)
  - [.toSubsetEqualRight(value)](#toSubsetEqualRightValue)
- [Asymmetric matchers](#asymmetric-matchers)
- [LICENSE](#license)
- [Contributing](#contributing)

## Matchers

### .toBeEither()

Use `.toBeEither()` to check if a value is an Either (either a Left or a Right).

### .toBeLeft()

Use `.toBeLeft()` to check if a value is a Left.

### .toBeLeftWithErrorsMatching(value)

Use `.toBeLeftWithErrorsMatching(value)` when testing errors returned from io-ts codec `decode()`
operations.

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

### .toBeRight()

Use `.toBeRight()` to check if a value is a Right.

### .toEqualLeft(value)

Use `.toEqualLeft(value)` to check if a value is a Left that contains a value that equals an
expected value. See Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue)
documentationfor information about how the `.toEqual()` comparison works.

### toEqualRight(value)

Use `.toEqualRight(value)` to check if a value is a Right that contains a value that equals an
expected value. See Jest's [toEqual(value)](https://jestjs.io/docs/en/expect#toequalvalue)
documentationfor information about how the `.toEqual()` comparison works.

### toStrictEqualLeft(value)

Use `.toStrictEqualLeft(value)` to check if a value is a Left that contains a value that strictly
equals an expected value. See Jest's
[toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation for
information about how `.toStrictEqual()` differs from `toEqual()`.

### toStrictEqualRight(value)

Use `.toStrictEqualRight(value)` to check if a value is a Right that contains a value that
strictly equals an expected value. See Jest's
[toStrictEqual(value)](https://jestjs.io/docs/en/expect#tostrictequalvalue) documentation for
information about how `.toStrictEqual()` differs from `toEqual()`.

### toSubsetEqualLeft(value)

Use `.toSubsetEqualLeft(value)` to check if a value is a Left that contains an object with a
subset of properties that match the expected object properties. The received value must contain all
of the expected properties, and may contain more than the expected properties.

### toSubsetEqualRight(value)

Use `.toSubsetEqualRight(value)` to check if a value is a Right that contains an object with a
subset of properties that match the expected object properties. The received value must contain all
of the expected properties, and may contain more than the expected properties.

## Asymmetric Matchers

All of the provided matchers are asymmetric matchers, which means that they can be called from
within a standard jest `.toEqual(value)` like so:

```ts
test('passes if called as an asymmetric matcher', () => {
  expect(left('People who are truly strong lift others up.')).toEqual(
    expect.toEqualLeft('People who are truly strong lift others up.'),
  );
});
```

The provided `toEqual*(value)` matchers also accept asymmetric matchers - just like Jest's
`toEqual(value)` does - which means you can pass in any of the standard Jest asymmetric matchers, or any
of the jest-extended matchers.

```ts
test('if called with an asymmetric matcher', () => {
  expect(left('People who are truly powerful bring others together.')).toEqualLeft(
    expect.stringContaining('powerful'),
  );
});
```

## LICENSE

[MIT](/LICENSE)

## Contributing

If you've come here to help contribute - Thanks! Take a look at [contributing](/CONTRIBUTING.md) to
see how to get started.
