module.exports = {
  preset: 'jest-expo',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  testMatch: ['<rootDir>/**/__tests__/**/*.spec.{ts,tsx}'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};
