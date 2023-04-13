function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * @module SimplePrefs
 */

/**
* @typedef {PlainObject<{
* string: module:SimplePrefs.Value}>} module:SimplePrefs.Defaults
*/

/**
* @typedef {boolean|number|string} module:SimplePrefs.Value
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


var SimplePrefs = /*#__PURE__*/function () {
  /**
   * @param {PlainObject} cfg
   * @param {string} cfg.namespace Avoid clashes with other apps
   * @param {module:SimplePrefs.Defaults} cfg.defaults
   * @param {module:SimplePrefs.SimplePrefsDefaults} cfg.prefDefaults
   * @returns {void}
   */
  function SimplePrefs(cfg) {
    _classCallCheck(this, SimplePrefs);

    this.configurePrefs(cfg);
    this.listeners = [];
  }
  /**
   * @param {PlainObject} cfg
   * @param {string} cfg.namespace Avoid clashes with other apps
   * @param {module:SimplePrefs.Defaults} cfg.defaults
   * @param {module:SimplePrefs.SimplePrefsDefaults} cfg.prefDefaults
   * @returns {void}
   */


  _createClass(SimplePrefs, [{
    key: "configurePrefs",
    value: function configurePrefs(_ref) {
      var namespace = _ref.namespace,
          defaults = _ref.defaults,
          _ref$prefDefaults = _ref.prefDefaults,
          prefDefaults = _ref$prefDefaults === void 0 ? simplePrefsDefaults(defaults) : _ref$prefDefaults;
      Object.assign(this, {
        namespace: namespace,
        prefDefaults: prefDefaults
      });
    }
    /**
     * Get parsed preference value; returns `Promise` in anticipation
     * of https://domenic.github.io/async-local-storage/ .
     * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
     * @returns {Promise<module:SimplePrefs.Value>} Resolves to the parsed
     *   value (defaulting if necessary)
     */

  }, {
    key: "getPref",
    value: function getPref(key) {
      try {
        var _this2 = this;

        var result = localStorage.getItem(_this2.namespace + key);
        return _await(result === null ? _this2.prefDefaults.getPrefDefault(key) : JSON.parse(result), void 0, !(result === null));
      } catch (e) {
        return Promise.reject(e);
      }
    }
    /**
     * Set a stringifiable preference value; returns `Promise` in anticipation
     *   of https://domenic.github.io/async-local-storage/ .
     * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
     * @param {module:SimplePrefs.Value} val Stringifiable value
     * @returns {Promise<void>} Resolves after setting the item (Not currently
     *    in use)
     */

  }, {
    key: "setPref",
    value: function setPref(key, val) {
      try {
        var _this4 = this;

        return _await(localStorage.setItem(_this4.namespace + key, JSON.stringify(val)));
      } catch (e) {
        return Promise.reject(e);
      }
    }
    /**
    * @typedef {PlainObject} GetPrefSetPref
    * @property {module:SimplePrefs.SimplePrefs#getPref} getPref
    * @property {module:SimplePrefs.SimplePrefs#setPref} setPref
    */

    /**
     * Convenience utility to return two main methods `getPref` and
     *   `setPref` bound to the current object.
     * @returns {GetPrefSetPref}
     */

  }, {
    key: "bind",
    value: function bind() {
      return {
        getPref: this.getPref.bind(this),
        setPref: this.setPref.bind(this)
      };
    }
    /**
    * @callback PreferenceCallback
    * @returns {void}
    */

    /* eslint-disable promise/prefer-await-to-callbacks -- Repeating event */

    /**
    * @param {string} [key]
    * @param {PreferenceCallback} cb
    * @returns {void}
    */

  }, {
    key: "listen",
    value: function listen(key, cb) {
      var _this5 = this;

      if (typeof key === 'function') {
        cb = key;
        key = undefined;
      }

      var listener = function listener(e) {
        if (e.key === null) {
          // `null` for clear browser action or user `clear()`
          if (key === undefined) {
            // Only trigger when no key supplied
            return;
          }
        } else {
          if (!e.key.startsWith(_this5.namespace)) {
            return;
          }

          if (key !== undefined && !e.key.startsWith(_this5.namespace + key)) {
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

  }, {
    key: "unlisten",
    value: function unlisten(listener) {
      if (listener) {
        for (var i = 0; i < this.listeners.length; i++) {
          if (listener === this.listeners[i]) {
            this.listeners.splice(i, 1);
            window.removeEventListener('storage', listener);
            return;
          }
        }
      }

      this.listeners.forEach(function (listenerItem) {
        window.removeEventListener('storage', listenerItem);
      });
    }
    /* eslint-enable promise/prefer-await-to-callbacks -- Repeating event */

  }]);

  return SimplePrefs;
}();
var SimplePrefsDefaults = /*#__PURE__*/function () {
  /**
   *
   * @param {module:SimplePrefs.Defaults} defaults
   */
  function SimplePrefsDefaults(_ref2) {
    var defaults = _ref2.defaults;

    _classCallCheck(this, SimplePrefsDefaults);

    this.defaults = defaults;
  }
  /**
   * Get parsed default value for a preference.
   * @param {string} key Preference key
   * @returns {Promise<module:SimplePrefs.Value>}
   */


  _createClass(SimplePrefsDefaults, [{
    key: "getPrefDefault",
    value: function getPrefDefault(key) {
      try {
        var _this7 = this;

        return _await(_this7.defaults[key]);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    /**
     * Set parsed default value for a preference.
     * @param {string} key Preference key
     * @param {module:SimplePrefs.Value} value
     * @returns {Promise<module:SimplePrefs.Value>} The old value
     */

  }, {
    key: "setPrefDefault",
    value: function setPrefDefault(key, value) {
      try {
        var _this9 = this;

        var oldValue = _this9.defaults[key];
        _this9.defaults[key] = value;
        return _await(oldValue);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }]);

  return SimplePrefsDefaults;
}();
/**
 * Simplified factory for `SimplePrefsDefaults`
 * @param {module:SimplePrefs.Defaults} defaults
 * @returns {module:SimplePrefs.SimplePrefsDefaults}
 */

function simplePrefsDefaults(defaults) {
  return new SimplePrefsDefaults({
    defaults: defaults
  });
}

export { SimplePrefs, SimplePrefsDefaults, simplePrefsDefaults };
