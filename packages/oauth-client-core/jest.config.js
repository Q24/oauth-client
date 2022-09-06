module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
};
