module.exports = {
  globals: {
    __DATA__: "./test/unit/data"
  },
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "testRegex": "test/.*\\.ts",
  "testPathIgnorePatterns": [
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
  "collectCoverage": false,
  "testEnvironment": "node",
  "collectCoverageFrom": [
    "src/**/*",
    "!src/TeleportLight\.ts",
    "!src/demo\.ts"
  ]
}
