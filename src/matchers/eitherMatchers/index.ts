import { toBeEither } from './toBeEither';
import { toBeLeft } from './toBeLeft';
import { toBeRight } from './toBeRight';
import { toEqualLeft } from './toEqualLeft';
import { toEqualRight } from './toEqualRight';
import { toStrictEqualLeft } from './toStrictEqualLeft';
import { toStrictEqualRight } from './toStrictEqualRight';
import { toSubsetEqualLeft } from './toSubsetEqualLeft';
import { toSubsetEqualRight } from './toSubsetEqualRight';
import { toBeLeftWithErrorsMatching } from './toBeLeftWithErrorsMatching';

const matchers = {
  toBeEither,
  toBeLeft,
  toBeRight,
  toEqualLeft,
  toEqualRight,
  toStrictEqualLeft,
  toStrictEqualRight,
  toSubsetEqualLeft,
  toSubsetEqualRight,
  toBeLeftWithErrorsMatching,
};

export default matchers;
