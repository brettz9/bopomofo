// Todo: Move to own library
export class Preferences {
  constructor (opts) {
    this.configurePrefs(opts);
  }
  configurePrefs ({appNamespace, prefDefaults}) {
    Object.assign(this, {appNamespace, prefDefaults});
  }
  /**
   * Get parsed preference value; returns `Promise` in anticipation
   * of https://domenic.github.io/async-local-storage/ .
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @returns {Promise} Resolves to the parsed value (defaulting if necessary)
   */
  async getPref (key) { // eslint-disable-line require-await
    const result = localStorage.getItem(this.appNS + key);
    return result === null
      ? this.prefDefaults.getPrefDefault(key)
      : JSON.parse(result);
  }
  /**
   * Set a stringifiable preference value; returns `Promise` in anticipation
   *   of https://domenic.github.io/async-local-storage/ .
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @param {boolean|number|string} val Stringifiable value
   * @returns {Promise} Resolves to result of setting the item (Not currently
   *    in use)
   */
  async setPref (key, val) { // eslint-disable-line require-await
    return localStorage.setItem(this.appNS + key, JSON.stringify(val));
  }
}

export class PrefDefaults {
  constructor ({defaults}) {
    this.defaults = defaults;
  }
  /**
   * Get parsed default value for a preference.
   * @param {string} key Preference key
   * @returns {boolean|number|string}
   */
  async getPrefDefault (key) { // eslint-disable-line require-await
    return this.defaults[key];
  }
}
