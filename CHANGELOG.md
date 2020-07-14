# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

---

[1.1.0]: https://github.com/relmify/jest-fp-ts/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/relmify/jest-fp-ts/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/relmify/jest-fp-ts/releases/tag/v1.0.0
