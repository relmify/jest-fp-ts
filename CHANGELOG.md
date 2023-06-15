# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2023/06/15

### Added

- README setup instructions for vitest

## [2.1.0] - 2023/06/14

### Added

- `.toBeLeftErrorMatching(string | RegExp)` custom matcher.

### Fixed

- `.toBeLeftWithErrorsMatching(Array<string | RegExp>)` type declaration now correctly specifies
  `Array<string | RegExp>` instead of `unknown` .

### Changed

- [dev] Updated dependencies to their latest versions.

## [2.0.2] - 2022/05/05

### Fixed

- Jest 28 support.

## [2.0.1] - 2022/04/06

### Changed

- [dev] Updated dependencies to their latest versions.

## [2.0.0] - 2022/02/09

### Added

- Custom matchers for values that are wrapped inside an `fp-ts` `These`:
  - `.toBeThese()`
  - `.toBeBoth()`
  - `.toEqualBoth(leftValue, rightValue)`
  - `.toStrictEqualBoth(leftValue, rightValue)`
  - `.toSubsetEqualBoth(leftValue, rightValue)`
- Intellisense descriptions for all matchers.

### Changed

- **BREAKING** All `Left` and `Right` matchers now officially support both `Either` and `These`
  types. Documentation and failure messages have been updated accordingly. This change will
  break tests that are expecting specific failure messages.
- **BREAKING** Matcher failure messages have been adjusted to align more closely with the messages
  returned by similar matchers in jest. This change will break tests that are expecting specific
  failure messages.
- **BREAKING** The types for received values in all matchers are now correctly represented as
  `unknown` and type guards are used to confirm that received values match expected types. Matchers
  that previously threw errors when bad types were received (values not wrapped in the expected
  `fp-ts` container type) now pass when using the `.not` modifier, and fail with better messages
  without the `.not` modifier. This change will break tests that are expecting specific failure
  messages, and tests using the `.not` modifier that were previously expected to fail due to a type
  error (wrong fp-ts container type, or no fp-ts container).
- README updated to show how asymmetric matchers can be used to specify wildcard expected values.
- [dev] Internal matcher unit tests now check matcher failure messages against recorded snapshots to
  guard against unintentional breaking interface changes.
- [dev] Updated jest config to use `@relmify/jest-serializer-strip-ansi/always` and
  `jest-snapshot-serializer-raw/always` for improved snapshot readability in internal unit tests.
- [dev] Updated dependencies to their latest versions.

### Fixed

- [dev] VS Code Intellisense now works in internal matcher unit tests.

## [1.1.1] - 2020/07/21

### Changed

- Updated dependencies to their latest versions.
- README installation instructions now mention that both `fp-ts` and `io-ts` are peer dependencies.

## [1.1.0] - 2020/07/13

### Added

- Custom matchers for values that are wrapped inside an `fp-ts` `Option`

## [1.0.1] - 2020/07/08

### Changed

- Fix typos in README.

## [1.0.0] - 2020/06/10

### Added

- Custom matchers for values that are wrapped inside an `fp-ts` `Either`.
- Custom matcher for the `Left<Errors>` type returned by `io-ts` when a `decode()` fails.
- A README.md file to describe the purpose of this package and how to use it.
- A CONTRIBUTING.md file to describe how to contribute.
- This CHANGELOG.md file to describe notable changes between releases.

[2.1.1]: https://github.com/relmify/jest-fp-ts/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/relmify/jest-fp-ts/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/relmify/jest-fp-ts/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/relmify/jest-fp-ts/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/relmify/jest-fp-ts/compare/v1.1.1...v2.0.0
[1.1.1]: https://github.com/relmify/jest-fp-ts/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/relmify/jest-fp-ts/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/relmify/jest-fp-ts/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/relmify/jest-fp-ts/releases/tag/v1.0.0
