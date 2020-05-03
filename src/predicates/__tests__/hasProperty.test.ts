import { hasProperty } from '../index';

describe('hasProperty', () => {
  test('should return false if value is null', () => {
    expect(hasProperty('prop')(null)).toEqual(false);
  });
  test('should return false if value is undefined', () => {
    expect(hasProperty('prop')(undefined)).toEqual(false);
  });
  test('should return true if the property exists', () => {
    const obj = { prop: 'prop' };
    expect(hasProperty('prop')(obj)).toEqual(true);
  });
  test('should handle undefined property values', () => {
    const obj = { prop: undefined };
    expect(hasProperty('prop')(obj)).toEqual(true);
  });
  test('should handle null property values', () => {
    const obj = { prop: null };
    expect(hasProperty('prop')(obj)).toEqual(true);
  });
  test('should handle string values', () => {
    const str = 'a string';
    expect(hasProperty('length')(str)).toEqual(true);
  });
  test('should handle array received values with an index number string as the property', () => {
    const arr = ['an', 'array'];
    expect(hasProperty('1')(arr)).toEqual(true);
  });
  test('should return false if an out of range array index is provided', () => {
    const arr = ['an', 'array'];
    expect(hasProperty('2')(arr)).toEqual(false);
  });
  test('should handle inherited property values', () => {
    class StringWithPrefix extends String {
      constructor(str: string, prefix = 'why ') {
        super(prefix + str);
      }
    }
    const str = new StringWithPrefix('hello');
    expect(hasProperty('length')(str)).toEqual(true);
  });
});
