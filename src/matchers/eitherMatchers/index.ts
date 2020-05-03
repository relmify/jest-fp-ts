import { toBeEither } from './toBeEither';
import { toBeLeft } from './toBeLeft';
import { toBeRight } from './toBeRight';
import { toEqualLeft } from './toEqualLeft';
import { toEqualRight } from './toEqualRight';
import { toMatchLeft } from './toMatchLeft';
import { toMatchLeftObject } from './toMatchLeftObject';
import { toMatchRight } from './toMatchRight';
import { toMatchRightObject } from './toMatchRightObject';
import { toBeLeftWithErrorsMatching } from './toBeLeftWithErrorsMatching';

const matchers = {
  toBeEither,
  toBeLeft,
  toBeRight,
  toEqualLeft,
  toEqualRight,
  toMatchLeft,
  toMatchLeftObject,
  toMatchRight,
  toMatchRightObject,
  toBeLeftWithErrorsMatching,
};

export default matchers;
