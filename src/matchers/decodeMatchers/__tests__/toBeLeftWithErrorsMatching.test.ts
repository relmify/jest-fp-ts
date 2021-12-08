import * as t from 'io-ts';
import { matchers } from '../index';
import { left } from 'fp-ts/lib/Either';
import { stripAnsi } from '../../../serializers';

expect.addSnapshotSerializer(stripAnsi);
expect.extend(matchers);

const Name = t.type({
  first: t.string,
  last: t.string,
});
type Name = t.TypeOf<typeof Name>;
const stringName = { first: 'Albert', last: 'Einstein' };
const numberName = { first: 404, last: 401 };
const arrayName = { first: ['Santa', 'Easter'], last: ['Claus', 'Bunny'] };

describe('.toBeLeftWithErrorsMatching should pass', () => {
  test('if the received is a Left that contains errors matching the expected values', () => {
    expect(Name.decode(numberName)).toBeLeftWithErrorsMatching([/404/, '401']);
  });
  test('if the received is a Left with the expected values in a different order', () => {
    expect(Name.decode(numberName)).toBeLeftWithErrorsMatching(['401', '404']);
  });
  test('if called as an asymmetric matcher', () => {
    expect(Name.decode(numberName)).toEqual(expect.toBeLeftWithErrorsMatching(['401', '404']));
  });
  test('if a decode fails due to a null value', () => {
    expect(Name.decode(null)).toEqual(expect.toBeLeftWithErrorsMatching(['null']));
  });
  test('if a decode fails due to an undefined value', () => {
    expect(Name.decode(undefined)).toEqual(expect.toBeLeftWithErrorsMatching(['undefined']));
  });
});

describe('.toBeLeftWithErrorsMatching should fail', () => {
  test('if the received is a Right Validation', () => {
    expect(() => expect(Name.decode(stringName)).toBeLeftWithErrorsMatching(['Albert', 'Einstein']))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).toBeLeftWithErrorsMatching(expectedErrorsMatching)

      Expected Errors: ["Albert", "Einstein"]
      Received a Right Validation
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
    expect(Name.decode(stringName)).not.toBeLeftWithErrorsMatching(['404', '401']);
  });
  test('if the received is a Left with errors that do not match the expected errors', () => {
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
    expect(() => expect(Name.decode(arrayName)).not.toBeLeftWithErrorsMatching(['Easter', 'Bunny']))
      .toThrowErrorMatchingInlineSnapshot(`
      expect(received).not.toBeLeftWithErrorsMatching(expectedErrorsMatching)

      Expected Errors: not ["Easter", "Bunny"]
      Received Errors:     ["Invalid value [\\"Santa\\",\\"Easter\\"] supplied to : { first: string, last: string }/first: string", "Invalid value [\\"Claus\\",\\"Bunny\\"] supplied to : { first: string, last: string }/last: string"]
    `);
  });
});
