'use strict';

module.exports = {
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2022
  },
  settings: {
    polyfills: [
      'Array.isArray',
      'console',
      'document.title',
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
  extends: ['ash-nazg/sauron-overrides', 'plugin:testcafe/recommended'],
  overrides: [
    {
      files: 'build/build-kFrequency.js',

      // import.meta.url
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false
      }
    }
  ],
  rules: {
    'require-jsdoc': 0
  }
};
