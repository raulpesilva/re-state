module.exports = {
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],
  testMatch: ['<rootDir>/src/**/*.test.{tsx,ts}', '<rootDir>/src/**/*.spec.{tsx,ts}'],
  testPathIgnorePatterns: ['<rootDir>/types/'],
};
