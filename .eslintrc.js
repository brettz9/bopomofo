module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "settings": {
    "polyfills": [
      "Array.isArray",
      "console",
      "Error",
      "fetch",
      "JSON",
      "Object.assign",
      "Object.entries",
      "Promise",
      "Set",
      "SpeechSynthesisUtterance",
      "String.fromCodePoint",
      "window.speechSynthesis"
    ]
  },
  "extends": ["ash-nazg/sauron", "plugin:testcafe/recommended"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "require-jsdoc": 0,
    "standard/computed-property-even-spacing": 0
  }
};
