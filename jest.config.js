module.exports = {
  globals: {
    __DATA__: "./__tests__/unit/data"
  },
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "testPathIgnorePatterns": [
    "__tests__/config",
    "__tests__/unit/utils"
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
    "!**/*.d.ts"
  ]
}
