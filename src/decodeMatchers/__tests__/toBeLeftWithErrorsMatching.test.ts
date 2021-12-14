import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { toBeLeftWithErrorsMatching } from '../../../index';
import { left } from 'fp-ts/lib/Either';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend({ toBeLeftWithErrorsMatching });

const Name = t.type({
  first: t.string,
  last: t.string,
});
type Name = t.TypeOf<typeof Name>;

describe('.toBeLeftWithErrorsMatching should pass', () => {
  test('if the received is a Left that contains errors matching the expected values', () => {
    const numberName = { first: 404, last: 401 };
    expect(Name.decode(numberName)).toBeLeftWithErrorsMatching([/404/, '401']);
  });
  test('if the received is a Left with the expected values in a different order', () => {
    const numberName = { first: 1, last: 2 };
    expect(Name.decode(numberName)).toBeLeftWithErrorsMatching(['2', '1']);
  });
  test('if called as an asymmetric matcher', () => {
    const numberName = { first: 1, last: 2 };
    expect(Name.decode(numberName)).toEqual(expect.toBeLeftWithErrorsMatching(['1', '2']));
  });
  // TODO: Check if this kind of test works with similar Jest matchers
  test.skip('if called with asymmetric matchers', () => {
    const numberName = { first: 1, last: 2 };
    expect(Name.decode(numberName)).toBeLeftWithErrorsMatching([
      expect.stringContaining('1'),
      expect.stringContaining('2'),
    ]);
  });
  test('if a decode fails due to a null value', () => {
    expect(Name.decode(null)).toBeLeftWithErrorsMatching(['null']);
  });
  test('if a decode fails due to an undefined value', () => {
    expect(Name.decode(undefined)).toBeLeftWithErrorsMatching(['undefined']);
  });
  test('if a decode fails due to undefined property values', () => {
    const undefinedName = { first: undefined, last: undefined };
    expect(Name.decode(undefinedName)).toBeLeftWithErrorsMatching(['undefined']);
  });
  test('if a decode fails due to a missing first name', () => {
    const lastName = { last: 'Einstein' };
    expect(Name.decode(lastName)).toBeLeftWithErrorsMatching(['first']);
  });
  test('if a decode fails due to a missing last name', () => {
    const firstName = { first: 'Albert' };
    expect(Name.decode(firstName)).toBeLeftWithErrorsMatching(['last']);
  });
  test('if a decode fails due to a missing first and last names', () => {
    expect(Name.decode({})).toBeLeftWithErrorsMatching(['first', 'last']);
  });
});

describe('.toBeLeftWithErrorsMatching should fail', () => {
  test('if the received errors do not include an expected string', () => {
    expect(() => expect(Name.decode({})).toBeLeftWithErrorsMatching(['address']))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftWithErrorsMatching(expectedErrorsMatching)

      Expected Errors: ["address"]
      Received Errors: ["Invalid value undefined supplied to : { first: string, last: string }/first: string", "Invalid value undefined supplied to : { first: string, last: string }/last: string"]
    `);
  });
  test('if the received is a Right Validation', () => {
    const stringName = { first: 'Albert', last: 'Einstein' };
    expect(() => expect(Name.decode(stringName)).toBeLeftWithErrorsMatching(['Albert', 'Einstein']))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftWithErrorsMatching(expectedErrorsMatching)

      Expected Errors: ["Albert", "Einstein"]
      Received Right: {"first": "Albert", "last": "Einstein"}
    `);
  });
  test('if the received is null', () => {
    expect(() => expect(null).toBeLeftWithErrorsMatching(['Albert', 'Einstein']))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftWithErrorsMatching(expectedErrorsMatching)

      Received value is not a Validation.
      Expected Errors: ["Albert", "Einstein"]
      Received: null
    `);
  });
  test('if the received is undefined', () => {
    expect(() => expect(undefined).toBeLeftWithErrorsMatching(['Albert', 'Einstein']))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftWithErrorsMatching(expectedErrorsMatching)

      Received value is not a Validation.
      Expected Errors: ["Albert", "Einstein"]
      Received: undefined
    `);
  });
  test('if the received is a Left but not a Validation', () => {
    expect(() => expect(left(null)).toBeLeftWithErrorsMatching(['Albert', 'Einstein']))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftWithErrorsMatching(expectedErrorsMatching)

      Received value is not a Validation.
      Expected Errors: ["Albert", "Einstein"]
      Received: {"_tag": "Left", "left": null}
    `);
  });
  test('if the received is neither a Left nor a Right', () => {
    expect(() => expect(1).toBeLeftWithErrorsMatching(['1'])).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftWithErrorsMatching(expectedErrorsMatching)

      Received value is not a Validation.
      Expected Errors: ["1"]
      Received: 1
    `);
  });
});

describe('.not.toBeLeftWithErrorsMatching should pass', () => {
  test('if the received is a Right', () => {
    const stringName = { first: 'Albert', last: 'Einstein' };
    expect(Name.decode(stringName)).not.toBeLeftWithErrorsMatching(['404', '401']);
  });
  test('if the received is a Left with errors that do not match the expected errors', () => {
    const arrayName = { first: ['Santa', 'Easter'], last: ['Claus', 'Bunny'] };
    expect(Name.decode(arrayName)).not.toBeLeftWithErrorsMatching(['Tooth', 'Fairy']);
  });
  test('if the received is Left with a non-Error value', () => {
    expect(left(null)).not.toBeLeftWithErrorsMatching(['null']);
  });
  test('if the received is neither a Left nor a Right', () => {
    expect(1).not.toBeLeftWithErrorsMatching(['1']);
  });
});

describe('.not.toBeLeftWithErrorsMatching should fail', () => {
  test('if the received is a Left with errors that match', () => {
    const arrayName = { first: ['Santa', 'Easter'], last: ['Claus', 'Bunny'] };
    expect(() => expect(Name.decode(arrayName)).not.toBeLeftWithErrorsMatching(['Easter', 'Bunny']))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeLeftWithErrorsMatching(expectedErrorsMatching)

      Expected Errors: not ["Easter", "Bunny"]
      Received Errors:     ["Invalid value [\\"Santa\\",\\"Easter\\"] supplied to : { first: string, last: string }/first: string", "Invalid value [\\"Claus\\",\\"Bunny\\"] supplied to : { first: string, last: string }/last: string"]
    `);
  });
});

describe('Alternative ways to test validation errors', () => {
  const receivedName = { first: 1, last: undefined };
  const validation = Name.decode(receivedName);
  const errorStrings = PathReporter.report(validation);
  test('The number 1 and the value undefined are invalid values for the t.string codec', () => {
    expect(validation).toBeLeftWithErrorsMatching(['1', /undefined/]);
  });
  test('Stasndard asymmetric matchers can be used to test for strings within pathReporter output', () => {
    expect(errorStrings).toEqual(
      expect.arrayContaining([expect.stringMatching('1'), expect.stringMatching(/undefined/)]),
    );
  });
  test('Standard snapshot tests can be used to test full pathReporter output', () => {
    expect(errorStrings).toMatchInlineSnapshot(`
      Array [
        Invalid value 1 supplied to : { first: string, last: string }/first: string,
        Invalid value undefined supplied to : { first: string, last: string }/last: string,
      ]
    `);
  });
  test('Standard snapshot tests can be used to test the raw array of validation errors (verbose!)', () => {
    expect(validation).toMatchInlineSnapshot(`
      Object {
        _tag: Left,
        left: Array [
          Object {
            context: Array [
              Object {
                actual: Object {
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
                  props: Object {
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
              Object {
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
          Object {
            context: Array [
              Object {
                actual: Object {
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
                  props: Object {
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
              Object {
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
