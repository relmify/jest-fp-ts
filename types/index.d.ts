/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    readonly toBeEither: () => R;
    readonly toBeLeft: () => R;
    readonly toBeLeftWithErrorsMatching: (expected: unknown) => R;
    readonly toBeRight: () => R;
    readonly toEqualLeft: (expected: unknown) => R;
    readonly toEqualRight: (expected: unknown) => R;
    readonly toStrictEqualLeft: (expected: unknown) => R;
    readonly toStrictEqualRight: (expected: unknown) => R;
    readonly toSubsetEqualLeft: (expected: unknown) => R;
    readonly toSubsetEqualRight: (expected: unknown) => R;
    readonly toBeOption: () => R;
    readonly toBeNone: () => R;
    readonly toBeSome: () => R;
    readonly toEqualSome: (expected: unknown) => R;
    readonly toStrictEqualSome: (expected: unknown) => R;
    readonly toSubsetEqualSome: (expected: unknown) => R;
  }

  interface Expect {
    readonly toBeEither: () => any;
    readonly toBeLeft: () => any;
    readonly toBeRight: () => any;
    readonly toEqualLeft: (expected: unknown) => any;
    readonly toBeLeftWithErrorsMatching: (expected: unknown) => any;
    readonly toEqualRight: (expected: unknown) => any;
    readonly toStrictEqualLeft: (expected: unknown) => any;
    readonly toStrictEqualRight: (expected: unknown) => any;
    readonly toSubsetEqualLeft: (expected: unknown) => any;
    readonly toSubsetEqualRight: (expected: unknown) => any;
    readonly toBeOption: () => any;
    readonly toBeNone: () => any;
    readonly toBeSome: () => any;
    readonly toEqualSome: (expected: unknown) => any;
    readonly toStrictEqualSome: (expected: unknown) => any;
    readonly toSubsetEqualSome: (expected: unknown) => any;
  }
}
