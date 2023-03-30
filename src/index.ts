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

export { toBeLeftWithErrorsMatching } from './decodeMatchers/toBeLeftWithErrorsMatching';
export { toBeEither } from './eitherMatchers/toBeEither';
export { toBeLeft } from './eitherOrTheseMatchers/toBeLeft';
export { toBeLeftErrorMatching } from './eitherOrTheseMatchers/toBeLeftErrorMatching';
export { toBeRight } from './eitherOrTheseMatchers/toBeRight';
export { toEqualLeft } from './eitherOrTheseMatchers/toEqualLeft';
export { toEqualRight } from './eitherOrTheseMatchers/toEqualRight';
export { toStrictEqualLeft } from './eitherOrTheseMatchers/toStrictEqualLeft';
export { toStrictEqualRight } from './eitherOrTheseMatchers/toStrictEqualRight';
export { toSubsetEqualLeft } from './eitherOrTheseMatchers/toSubsetEqualLeft';
export { toSubsetEqualRight } from './eitherOrTheseMatchers/toSubsetEqualRight';
export { toBeOption } from './optionMatchers/toBeOption';
export { toBeNone } from './optionMatchers/toBeNone';
export { toBeSome } from './optionMatchers/toBeSome';
export { toEqualSome } from './optionMatchers/toEqualSome';
export { toStrictEqualSome } from './optionMatchers/toStrictEqualSome';
export { toSubsetEqualSome } from './optionMatchers/toSubsetEqualSome';
export { toBeThese } from './theseMatchers/toBeThese';
export { toBeBoth } from './theseMatchers/toBeBoth';
export { toEqualBoth } from './theseMatchers/toEqualBoth';
export { toStrictEqualBoth } from './theseMatchers/toStrictEqualBoth';
export { toSubsetEqualBoth } from './theseMatchers/toSubsetEqualBoth';

expect.extend(matchers);
