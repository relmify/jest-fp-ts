module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './dist/coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  snapshotSerializers: ['jest-snapshot-serializer-raw/always'],
  slowTestThreshold: 10,
  watchPlugins: [
    ['jest-watch-toggle-config', { setting: 'verbose' }],
    ['jest-watch-toggle-config', { setting: 'collectCoverage' }],
    ['jest-watch-toggle-config', { setting: 'bail' }],
  ],
};
