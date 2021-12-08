// plugin to remove ansi escape codes from pretty-format output
//
// Was using the jest-snapshot-serializer-ansi npm package but switched to this implementation due
// to security warnings. Code is adapted from that package as well as chalk packages has-ansi and ansi-regex

const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
].join('|');

const ansiRegex = ({ onlyFirst = false } = {}) => new RegExp(pattern, onlyFirst ? undefined : 'g');

const regex = ansiRegex({ onlyFirst: true });

const hasAnsi = (string: string) => {
  return regex.test(string);
};

const stripAnsi = (string: any) => {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }

  return string.replace(ansiRegex(), '');
};

// Must export test and print functions for the compiled serializer to work as a global jest
// configuration setting in jest.config.js That said, decided to use explicit
// expect.addSnapshotSerializer() calls instead of the jest global setting to avoid having to
// explicitly build the code before running jest
export const test = (value: any) => typeof value === 'string' && hasAnsi(value);
export const print = (value: unknown, serialize: any) => serialize(stripAnsi(value as string));

const plugin: jest.SnapshotSerializerPlugin = { test, print };

export default plugin;
