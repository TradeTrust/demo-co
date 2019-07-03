module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverage: false,
  coverageDirectory: "<rootDir>/.coverage/",
  collectCoverageFrom: ["src/**/*.{js,jsx}", "scripts/**/*.{js,jsx}", "!src/**/*.spec.{js,jsx}"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)test.[jt]s?(x)"],
  moduleDirectories: ["src", "node_modules"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/_mocks_/fileMock.js",
    "\\.(css|sass|scss)$": "<rootDir>/_mocks_/styleMock.js"
  }
};
