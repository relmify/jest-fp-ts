import * as t from 'io-ts';
import matchers from '../index';

expect.extend(matchers);

const Name = t.type({
  first: t.string,
  last: t.string,
});
type Name = t.TypeOf<typeof Name>;
const validName = { first: 'Michelle', last: 'Obama' };
const numberName = { first: 404, last: 401 };
const arrayName = { first: ['Santa', 'Easter'], last: ['Clause', 'Bunny'] };

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
});

describe('.toBeLeftWithErrorsMatching should fail', () => {
  test('if the received is a Right', () => {
    expect(() =>
      expect(Name.decode(validName)).toBeLeftWithErrorsMatching(['Michelle', 'Obama']),
    ).toThrowError();
  });
});

describe('.not.toBeLeftWithErrorsMatching should pass', () => {
  test('if the received is a Right', () => {
    expect(Name.decode(validName)).not.toBeLeftWithErrorsMatching(['404', '401']);
  });
  test('if the received is a Left with errors that do not match the expected errors', () => {
    expect(Name.decode(arrayName)).not.toBeLeftWithErrorsMatching(['Tooth', 'Fairy']);
  });
});

describe('.not.toBeLeftWithErrorsMatching should fail', () => {
  test('if the received is a Left with errors that match', () => {
    expect(() =>
      expect(Name.decode(arrayName)).not.toBeLeftWithErrorsMatching(['Easter', 'Bunny']),
    ).toThrowError();
  });
});
