import { matchers as eitherMatchers } from './eitherMatchers';
import { matchers as optionMatchers } from './optionMatchers';

const matchers = { ...eitherMatchers, ...optionMatchers };

export { matchers };
