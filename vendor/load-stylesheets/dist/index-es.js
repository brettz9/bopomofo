function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function loadStylesheets(stylesheets) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      beforeDefault = _ref.before,
      afterDefault = _ref.after,
      faviconDefault = _ref.favicon,
      canvasDefault = _ref.canvas,
      _ref$image = _ref.image,
      imageDefault = _ref$image === void 0 ? true : _ref$image,
      acceptErrors = _ref.acceptErrors;

  stylesheets = Array.isArray(stylesheets) ? stylesheets : [stylesheets];

  function setupLink(stylesheetURL) {
    var options = {};

    if (Array.isArray(stylesheetURL)) {
      var _stylesheetURL = stylesheetURL;

      var _stylesheetURL2 = _slicedToArray(_stylesheetURL, 2);

      stylesheetURL = _stylesheetURL2[0];
      var _stylesheetURL2$ = _stylesheetURL2[1];
      options = _stylesheetURL2$ === void 0 ? {} : _stylesheetURL2$;
    }

    var _options = options,
        _options$favicon = _options.favicon,
        favicon = _options$favicon === void 0 ? faviconDefault : _options$favicon;
    var _options2 = options,
        _options2$before = _options2.before,
        before = _options2$before === void 0 ? beforeDefault : _options2$before,
        _options2$after = _options2.after,
        after = _options2$after === void 0 ? afterDefault : _options2$after,
        _options2$canvas = _options2.canvas,
        canvas = _options2$canvas === void 0 ? canvasDefault : _options2$canvas,
        _options2$image = _options2.image,
        image = _options2$image === void 0 ? imageDefault : _options2$image;

    function addLink() {
      if (before) {
        before.before(link);
      } else if (after) {
        after.after(link);
      } else {
        document.head.appendChild(link);
      }
    }

    var link = document.createElement('link'); // eslint-disable-next-line promise/avoid-new -- No native option

    return new Promise(function (resolve, reject) {
      var rej = reject;

      if (acceptErrors) {
        rej = typeof acceptErrors === 'function' ? function (error) {
          acceptErrors({
            error: error,
            stylesheetURL: stylesheetURL,
            options: options,
            resolve: resolve,
            reject: reject
          });
        } : resolve;
      }

      if (stylesheetURL.endsWith('.css')) {
        favicon = false;
      } else if (stylesheetURL.endsWith('.ico')) {
        favicon = true;
      }

      if (favicon) {
        link.rel = 'shortcut icon';
        link.type = 'image/x-icon';

        if (image === false) {
          link.href = stylesheetURL;
          addLink();
          resolve(link);
          return;
        }

        var cnv = document.createElement('canvas');
        cnv.width = 16;
        cnv.height = 16;
        var context = cnv.getContext('2d');
        var img = document.createElement('img'); // eslint-disable-next-line promise/prefer-await-to-callbacks -- No API

        img.addEventListener('error', function (error) {
          reject(error);
        });
        img.addEventListener('load', function () {
          context.drawImage(img, 0, 0);
          link.href = canvas ? cnv.toDataURL('image/x-icon') : stylesheetURL;
          addLink();
          resolve(link);
        });
        img.src = stylesheetURL;
        return;
      }

      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = stylesheetURL;
      addLink(); // eslint-disable-next-line promise/prefer-await-to-callbacks -- No API

      link.addEventListener('error', function (error) {
        rej(error);
      });
      link.addEventListener('load', function () {
        resolve(link);
      });
    });
  }

  return Promise.all(stylesheets.map(function (stylesheetURL) {
    return setupLink(stylesheetURL);
  }));
}

export default loadStylesheets;
