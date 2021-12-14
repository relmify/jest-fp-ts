import { matchers as decodeMatchers } from './decodeMatchers';
import { matchers as eitherMatchers } from './eitherMatchers';
import { matchers as optionMatchers } from './optionMatchers';
import { matchers as theseMatchers } from './theseMatchers';
import { matchers as eitherOrTheseMatchers } from './eitherOrTheseMatchers';

const matchers = {
  ...decodeMatchers,
  ...eitherMatchers,
  ...optionMatchers,
  ...theseMatchers,
  ...eitherOrTheseMatchers,
};

export { matchers };
