import { matchers } from './matchers';

// //declare let global: any;

// const jestExpect = global.expect;

// if (jestExpect !== undefined) {
//   jestExpect.extend(matchers);
// } else {
//   /* eslint-disable no-console */
//   console.error(
//     "Unable to find Jest's global expect." +
//       '\nPlease check you have added jest-fp-ts correctly to your jest configuration.' +
//       '\nSee https://github.com/relmify/jest-fp-ts#setup for help.',
//   );
//   /* eslint-enable no-console */
// }

expect.extend(matchers);

// export default matchers;
