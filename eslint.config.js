import ashNazg from 'eslint-config-ash-nazg';

export default [
  {
    ignores: [
      'vendor',
      // Items to move to own repo
      '!vendor/i18n-safe'
    ]
  },
  ...ashNazg(['sauron', 'browser']),
  {
    languageOptions: {
      globals: {
        fixture: 'readonly'
      }
    },
    rules: {
      'jsdoc/require-jsdoc': 0,

      // For testcafe
      'mocha/no-global-tests': 0,
      'mocha/handle-done-callback': 0,
      'sonarjs/no-unused-expressions': 0,
      'chai-friendly/no-unused-expressions': 0
    }
  }
];
