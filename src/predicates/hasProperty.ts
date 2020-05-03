export const hasProperty = (property: PropertyKey) => (value: unknown): boolean => {
  return value !== null && value !== undefined && {}.hasOwnProperty.call(value, property)
    ? true
    : false;
};
