// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle CSS imports
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
