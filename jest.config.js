module.exports = {
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "testRegex": "test/.*\\.ts",
  testPathIgnorePatterns: [
    "node_modules",
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "collectCoverage": true,
  "testEnvironment": "node",
  "collectCoverageFrom": [
    "src/**/*",
    "src/transformers/**/*",
    "!**/__test__/**"
  ]
}