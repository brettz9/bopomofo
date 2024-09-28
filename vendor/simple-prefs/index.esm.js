/**
* @typedef {{[key: string]: Value}} Defaults
*/

/**
* @typedef {boolean|number|string} Value
*/

/**
 * Preferences storage.
 */

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}

/**
 * Defaults for SimplePrefs.
 */

function _call(body, then, direct) {
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class SimplePrefs {
  /**
   * @param {object} cfg
   * @param {string} [cfg.namespace] Avoid clashes with other apps
   * @param {Defaults} [cfg.defaults]
   * @param {SimplePrefsDefaults} [cfg.prefDefaults]
   */
  constructor(cfg) {
    this.configurePrefs(cfg);

    /** @type {((e: StorageEvent) => void)[]} */
    this.listeners = [];
  }
  /**
   * @param {object} cfg
   * @param {string} [cfg.namespace] Avoid clashes with other apps
   * @param {Defaults} [cfg.defaults]
   * @param {SimplePrefsDefaults} [cfg.prefDefaults]
   * @returns {void}
   */
  configurePrefs(_ref) {
    let {
      namespace,
      defaults,
      prefDefaults = simplePrefsDefaults(defaults)
    } = _ref;
    this.namespace = namespace ?? '';
    this.prefDefaults = prefDefaults;
  }
  /**
   * Get parsed preference value; returns `Promise` in anticipation
   * of https://domenic.github.io/async-local-storage/ .
   * @callback GetPref
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @returns {Promise<Value>} Resolves to the parsed
   *   value (defaulting if necessary)
   */

  /** @type {GetPref} */
  getPref(key) {
    const _this = this;
    return _call(function () {
      const result = localStorage.getItem(_this.namespace + key);
      return _await(_await(result === null ? /** @type {SimplePrefsDefaults} */_this.prefDefaults.getPrefDefault(key) : JSON.parse(result), void 0, !(result === null)));
    });
  }
  /**
   * Set a stringifiable preference value; returns `Promise` in anticipation
   *   of https://domenic.github.io/async-local-storage/ .
   * @callback SetPref
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @param {Value} val Stringifiable value
   * @returns {Promise<void>} Resolves after setting the item (Not currently
   *    in use)
   */
  /** @type {SetPref} */
  setPref(key, val) {
    const _this2 = this;
    return _call(function () {
      return _await(localStorage.setItem(_this2.namespace + key, JSON.stringify(val)));
    });
  }
  /**
  * @typedef {object} GetPrefSetPref
  * @property {GetPref} getPref
  * @property {SetPref} setPref
  */
  /**
   * Convenience utility to return two main methods `getPref` and
   *   `setPref` bound to the current object.
   * @returns {GetPrefSetPref}
   */
  bind() {
    return {
      getPref: this.getPref.bind(this),
      setPref: this.setPref.bind(this)
    };
  }

  /**
  * @callback PreferenceCallback
  * @param {StorageEvent} e
  * @returns {void}
  */

  /* eslint-disable promise/prefer-await-to-callbacks -- Repeating event */
  /**
  * @param {string|PreferenceCallback|undefined} key
  * @param {PreferenceCallback} cb
  * @returns {PreferenceCallback}
  */
  listen(key, cb) {
    if (typeof key === 'function') {
      cb = key;
      key = undefined;
    }

    /**
     * @param {StorageEvent} e
     */
    const listener = e => {
      if (e.key === null) {
        // `null` for clear browser action or user `clear()`
        if (key === undefined) {
          // Only trigger when no key supplied
          return;
        }
      } else {
        if (!e.key.startsWith( /** @type {string} */this.namespace)) {
          return;
        }
        if (key !== undefined && !e.key.startsWith( /** @type {string} */this.namespace + key)) {
          return;
        }
      }
      cb(e);
    };
    window.addEventListener('storage', listener);
    this.listeners.push(listener);
    return listener;
  }

  /**
   * @param {EventListener} listener
   * @returns {void}
   */
  unlisten(listener) {
    if (listener) {
      for (let i = 0; i < this.listeners.length; i++) {
        if (listener === this.listeners[i]) {
          this.listeners.splice(i, 1);
          window.removeEventListener('storage', listener);
          return;
        }
      }
    }
    this.listeners.forEach(listenerItem => {
      window.removeEventListener('storage', listenerItem);
    });
  }
  /* eslint-enable promise/prefer-await-to-callbacks -- Repeating event */
}
class SimplePrefsDefaults {
  /**
   *
   * @param {{defaults: Defaults}} defaults
   */
  constructor(_ref2) {
    let {
      defaults
    } = _ref2;
    this.defaults = defaults;
  }
  /**
   * Get parsed default value for a preference.
   * @param {string} key Preference key
   * @returns {Promise<Value>}
   */
  getPrefDefault(key) {
    const _this3 = this;
    return _call(function () {
      return _await(_this3.defaults[key], function (_this3$defaults$key) {
        return _this3$defaults$key ?? null;
      });
    });
  }
  /**
   * Set parsed default value for a preference.
   * @param {string} key Preference key
   * @param {Value} value
   * @returns {Promise<Value>} The old value
   */
  setPrefDefault(key, value) {
    const _this4 = this;
    return _call(function () {
      const oldValue = _this4.defaults[key] ?? null;
      _this4.defaults[key] = value;
      return _await(oldValue);
    });
  }
}

/**
 * Simplified factory for `SimplePrefsDefaults`
 * @param {Defaults} [defaults]
 * @returns {SimplePrefsDefaults}
 */
function simplePrefsDefaults() {
  let defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new SimplePrefsDefaults({
    defaults
  });
}

export { SimplePrefs, SimplePrefsDefaults, simplePrefsDefaults };
