import ashNazg from 'eslint-config-ash-nazg';

export default [
  {
    ignores: [
      'vendor/**/*.js',
      // Items to move to own repo
      '!vendor/i18n-safe/**/*.js'
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

      // As we copy to `vendor`, we don't need imported
      //    dependencies
      'n/no-unpublished-import': 0,

      // For testcafe
      'mocha/no-global-tests': 0,
      'mocha/handle-done-callback': 0,
      'sonarjs/no-unused-expressions': 0,
      'chai-friendly/no-unused-expressions': 0
    }
  }
];
