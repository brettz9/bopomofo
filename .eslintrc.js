'use strict';

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  settings: {
    polyfills: [
      'Array.isArray',
      'console',
      'Error',
      'fetch',
      'JSON',
      'navigator',
      'Object.assign',
      'Object.entries',
      'Promise',
      'Set',
      'SpeechSynthesisUtterance',
      'String.fromCodePoint',
      'window.speechSynthesis'
    ]
  },
  extends: ['ash-nazg/sauron', 'plugin:testcafe/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  overrides: [
    {
      files: '.*.js',
      extends: ['ash-nazg/sauron', 'plugin:node/recommended-script'],
      rules: {
        'import/no-commonjs': 0
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'require-jsdoc': 0,
    'standard/computed-property-even-spacing': 0
  }
};
