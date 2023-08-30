module.exports = {
  extends: "@dmitrigrabov/eslint-config",
  ignorePatterns:['node_modules/**', '*.generated.*', 'build/**'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  }
}
