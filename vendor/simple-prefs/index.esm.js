function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

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

/* eslint-disable node/no-unsupported-features/es-syntax */

/**
 * @module SimplePrefs
 */

/**
* @typedef {PlainObject<{string: module:SimplePrefs.Value}>}
*   module:SimplePrefs.Defaults
*/

/**
* @typedef {boolean|number|string} module:SimplePrefs.Value
*/

/**
 * Preferences storage.
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
    value: function () {
      var _getPref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // eslint-disable-line require-await
                result = localStorage.getItem(this.namespace + key);
                return _context.abrupt("return", result === null ? this.prefDefaults.getPrefDefault(key) : JSON.parse(result));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPref(_x) {
        return _getPref.apply(this, arguments);
      }

      return getPref;
    }()
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
    value: function () {
      var _setPref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key, val) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", localStorage.setItem(this.namespace + key, JSON.stringify(val)));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setPref(_x2, _x3) {
        return _setPref.apply(this, arguments);
      }

      return setPref;
    }()
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
  }]);

  return SimplePrefs;
}();
/**
 * Defaults for SimplePrefs.
 */

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
    value: function () {
      var _getPrefDefault = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.defaults[key]);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPrefDefault(_x4) {
        return _getPrefDefault.apply(this, arguments);
      }

      return getPrefDefault;
    }()
    /**
     * Set parsed default value for a preference.
     * @param {string} key Preference key
     * @param {module:SimplePrefs.Value} value
     * @returns {Promise<module:SimplePrefs.Value>} The old value
     */

  }, {
    key: "setPrefDefault",
    value: function () {
      var _setPrefDefault = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key, value) {
        var oldValue;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // eslint-disable-line require-await
                oldValue = this.defaults[key];
                this.defaults[key] = value;
                return _context4.abrupt("return", oldValue);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setPrefDefault(_x5, _x6) {
        return _setPrefDefault.apply(this, arguments);
      }

      return setPrefDefault;
    }()
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
