// Todo: Move to own library
// Todo: Allow literal brackets (with or without substitutions
//        of the same name present)
/**
Example:

```js
promiseChainForValues(['a', 'b', 'c'], (val) => {
  return new Promise(function (resolve, reject) {
    if (val === 'a') {
      reject(new Error('missing'));
    }
    setTimeout(() => {
      resolve(val);
    }, 100);
  });
});
```
*/
/**
 * The given array will have its items processed in series; if the supplied
 *  callback, when passed the current item, returns a Promise or value that
 *  resolves, that value will be used for the return result of this function
 *  and no other items in the array will continue to be processed; if it
 *  rejects, however, the next item will be processed.
 * Accept an array of values to pass to a callback which should return
 *  a promise (or final result value) which resolves to a result or which
 *  rejects so that the next item in the array can be checked in series.
 * @param {Array} values Array of values
 * @param {Function} cb Accepts an item of the array as its single argument
 * @returns {Promise} Either resolves to a value derived from an item in the
 *  array or rejects if all items reject
 */
// eslint-disable-next-line promise/prefer-await-to-callbacks
const promiseChainForValues = (values, cb) => {
  return values.reduce(async (p, value) => {
    try {
      return await p; // We'd short-circuit here instead if we could
    } catch (err) {
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      return cb(value);
    }
  }, Promise.reject(new Error(
    'Intentionally reject so as to begin checking chain'
  )));
};

/**
 *
 * @param {string[]} locales BCP-47 language strings
 * @param {string[]} defaultLocales BCP-47 language strings
 * @param {function|false|string} defaults Upon a key not being found,
 *   if `default` is a string, that value will be used for the message.
 *   If a function, the function will be called with the key and locale
 *   strings object. If `false`, an Error will be thrown.
 * @param {string} localesBasePath
 * @param {object} stateObj Will get `detectedLocale` set to a boolean
 * @returns {Promise} Promise which:
 *   1) resolves to a function that:
 *     a) checks a key against an object of strings
 *     b) optionally accepts an object of substitutions which are used when
 *         finding text within curly brackets (pipe symbol not allowed in its
 *         keys); the substitutions may be DOM elements as well as strings
 *         and may be functions which return the same (being provided the
 *         text after the pipe within brackets as the single argument), and
 *     c) optionally accepts a config object, with the optional key "dom"
 *         which if set to `true` optimizes when DOM elements are present; or
 *   2) rejects if no strings are found
 */
export const i18n = async function i18n ({
  locales = navigator.languages,
  defaultLocales = ['en-US'],
  defaults,
  localesBasePath = '.',
  state = {}
}) {
  const strings = await promiseChainForValues(
    [...locales, ...defaultLocales],
    async function getLocale (locale) {
      const url = `${localesBasePath.replace(/\/$/u, '')}/_locales/${locale}/messages.json`;
      try {
        const json = await (await fetch(url)).json();
        state.detectedLocale = locale;
        return json;
      } catch (err) {
        if (!locale.includes('-')) {
          throw new Error('Locale not available');
        }
        // Try without hyphen
        return getLocale(locale.replace(/-.*$/u, ''));
      }
    }
  );
  return (key, substitutions, {dom} = {}) => {
    const bracketRegex = /\{([^}]*?)(?:\|([^}]*))?\}/gu; // eslint-disable-line unicorn/no-unsafe-regex
    let returnsDOM = false;
    const str = (
      key in strings && strings[key] && 'message' in strings[key]
        ? strings[key].message
        : typeof defaults === 'function'
          ? defaults(key, strings)
          : defaults === false
            ? (() => {
              throw new Error(`Key not found: (${key})`);
            })()
            : defaults

    );
    if (!substitutions) {
      return str;
    }
    // Give chance to avoid this block when known to contain DOM
    if (!dom) {
      // Run this loop to optimize non-DOM substitutions
      const ret = str.replace(bracketRegex, (_, ky, arg) => {
        let substitution = substitutions[ky];
        if (typeof substitution === 'function') {
          substitution = substitution(arg);
        }
        returnsDOM = returnsDOM ||
          (substitution && substitution.nodeType === 1);
        return substitution;
      });
      if (!returnsDOM) {
        return ret;
      }
    }
    const nodes = [];
    let result;
    let previousIndex = 0;
    while ((result = bracketRegex.exec(str)) !== null) {
      const {lastIndex} = bracketRegex;
      const [bracketedKey, ky, arg] = result;
      let substitution = substitutions[ky];
      if (typeof substitution === 'function') {
        substitution = substitution(arg);
      }
      const startBracketPos = lastIndex - bracketedKey.length;
      if (startBracketPos > previousIndex) {
        nodes.push(str.slice(previousIndex, startBracketPos));
      }
      nodes.push(substitution);
      previousIndex = lastIndex;
    }
    if (previousIndex !== str.length) { // Get text at end
      nodes.push(str.slice(previousIndex));
    }

    const container = document.createElement('span');
    // console.log('nodes', nodes);
    container.append(...nodes);
    return container;
  };
};
