module.exports = {
  globals: {
    __DATA__: "./test/unit/data"
  },
  testPathIgnorePatterns: [
    "test/config\.ts"
  ], 
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "testRegex": "test/.*\\.ts",
  testPathIgnorePatterns: [
    "node_modules",
    "test/config",
    "test/unit/utils"
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
    "!**/__test__/**",
    "!src/TeleportLight\.ts",
    "!src/demo\.ts"
  ]
}