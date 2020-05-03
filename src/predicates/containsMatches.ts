import { containsMatch } from './containsMatch';

export const containsMatches = (expectedValues: Array<string | RegExp>) => (
  receivedArray: Array<string> | ReadonlyArray<string>,
): boolean => {
  return expectedValues
    .map((value) => containsMatch(receivedArray, value))
    .reduce((acc, cur) => acc && cur, true);
};
