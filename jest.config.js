process.env.NODE_ENV = 'test';

module.exports = {
  roots: ['src', 'test'],
  forceExit: true,
  testMatch: [
    '**/test/**/*.spec.ts',
    '**/test/**/*.it.ts',
    '**/test/**/*.test.ts',
    '**/test/**/*.e2e.ts',
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'node_modules/*',
    'mock',
    'mock/*',
    'src/swagger.ts',
    'src/app.ts',
  ],
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended', './test/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'mjs', 'json'],
  moduleDirectories: ['node_modules'],
  preset: 'ts-jest',
  testResultsProcessor: 'jest-sonar-reporter',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
