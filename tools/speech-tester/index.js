/* eslint-disable camelcase -- For Chrome extension-compatible locales */

import {jml, body, nbsp} from 'jamilih';
import loadStylesheets from 'load-stylesheets';
import tippy from 'tippy.js';
import {SimplePrefs} from 'simple-prefs';
import dialogPolyfill from 'dialog-polyfill';
import {i18n} from '../../vendor/i18n-safe/index-es.js';
import {
  consonants,
  finals_single, finals_double, finals_single_nontranscriptional,
  tones, getRandomEnhancedSyllable as getRandomSyllable
} from '../../src/index.js';

/**
 * @param {string} sel
 */
const $ = (sel) => {
  return /** @type {HTMLElement} */ (document.querySelector(sel));
};

/**
 * @param {string} sel
 */
const $s = (sel) => {
  return /** @type {HTMLSelectElement} */ (document.querySelector(sel));
};

/**
 * @param {string} sel
 */
const $t = (sel) => {
  return /** @type {HTMLTextAreaElement} */ (
    document.querySelector(sel)
  );
};

const tippyZIndex = 100150; // dialog is set to 100149
const synth = globalThis.speechSynthesis;

const backgroundColors = [
  'Pink', 'DeepPink',
  'LightPink', 'PaleVioletRed',
  'HotPink', 'MediumVioletRed'
];
// Acceptable Contrasts:
const colors = [
  'black', 'black' /* if not small */,
  'black', 'black' /* if not small */,
  'black', 'white' /* if not small */
];

const bopomofoSymbols = [
  ...consonants, ...finals_single, ...finals_double, ...tones
];
const symbolsPerRow = 9;

const defaults = {
  Pronounce_component_syllables: true,
  Display_Chinese_characters: true
};
const prefs = new SimplePrefs({namespace: 'bopomofo-', defaults});

/** @type {{detectedLocale?: string}} */
const state = {};
const [_] = await Promise.all([
  i18n({
    state,
    // eslint-disable-next-line @stylistic/max-len -- Long
    // eslint-disable-next-line n/no-unsupported-features/node-builtins -- Browser
    locales: [...navigator.languages, 'en-US'],
    localesBasePath: '../../'
  }),
  loadStylesheets([
    ['data:image/x-icon;,', {image: false, favicon: true}], // Suppress console
    '../../vendor/dialog-polyfill/dialog-polyfill.css',
    '../../vendor/tippy.js/dist/tippy.css',
    'index.css'
  ])
]);
if (state.detectedLocale) {
  document.documentElement.lang = state.detectedLocale;
  // Todo: Use rtl-detect to add `document.documentElement.dir`
}

/**
* @external JamilihArray
* @see https://github.com/brettz9/jamilih/
*/

/**
 *
 * @returns {import('jamilih').JamilihArray}
 */
function buildFlashcardButton () {
  return ['button', {id: 'flashcardSound', $on: {
    async click () {
      const pref = await prefs.getPref('Pronounce_component_syllables');
      if (pref) {
        // eslint-disable-next-line prefer-destructuring -- TS
        const syllableBPMFChars = /** @type {string} */ (
          this.dataset.syllableBPMFChars
        );
        if (syllableBPMFChars.length > 1) {
          [...syllableBPMFChars].forEach((chr) => {
            speak(chr);
          });
        }
        speak(/** @type {string} */ (this.dataset.syllableChars));
      } else {
        speak(/** @type {string} */ (this.dataset.syllableChars));
      }
    }
  }}];
}

/**
 *
 * @returns {Promise<void>}
 */
async function init () {
  document.title = /** @type {string} */ (_('title'));
  jml('div', {
    role: 'main', // Expeced by Axe (Accessibility)
    class: 'hbox'
  }, /** @type {import('jamilih').JamilihChildren} */ ([
    ['div', {class: 'vbox'}, [
      ['h1', [_('Controls')]],
      ['div', {class: 'hbox'}, [
        ['select', {id: 'voices', 'aria-label': _('Voices')}],
        nbsp,
        ['button', {id: 'play', $on: {
          click (e) {
            e.preventDefault();
            speak(userText.value);
          }
        }}, [_('Play')]]
      ]],
      nbsp,
      ['button', {id: 'cancel', $on: {
        click () {
          synth.cancel();
        }
      }}, [_('Cancel')]],
      nbsp,
      ['button', {$on: {
        async click () {
          const dialog = /**
           * @type {HTMLDialogElement & {
           *   $setPreviousRandomSyllable: () => Promise<void>,
           *   $setSyllable: (
           *     syllableBPMFChars: string,
           *     pinyinWithTones: string,
           *     syllableChars: string
           *   ) => Promise<void>,
           *   $setRandomSyllable: () => Promise<void>
           * }}
           */ (jml('dialog', {
              $custom: {
                $syllableCtr: -1,
                /** @type {import('../../src/index.js').Syllable[]} */
                $randomSyllables: [],
                async $setPreviousRandomSyllable () {
                  if (this.$syllableCtr < 1) {
                    return;
                  }
                  const previousRandomSyllableInfo =
                    this.$randomSyllables[--this.$syllableCtr];
                  await this.$setSyllable(...previousRandomSyllableInfo);
                },

                /**
                 * @param {string} syllableBPMFChars
                 * @param {string} pinyinWithTones
                 * @param {string} syllableChars
                 */
                async $setSyllable (
                  syllableBPMFChars, pinyinWithTones, syllableChars
                ) {
                  $('#flashcardSound').replaceWith(
                    jml(...buildFlashcardButton())
                  );
                  const displayChars = await prefs.getPref(
                    'Display_Chinese_characters'
                  );
                  const noCharAvailable = pinyinWithTones === syllableChars;
                  const flashcardSound = $('#flashcardSound');
                  flashcardSound.textContent = displayChars
                    ? syllableChars
                    : pinyinWithTones;
                  flashcardSound.dataset.syllableBPMFChars = syllableBPMFChars;
                  flashcardSound.dataset.syllableChars = noCharAvailable
                  // Pronounce BMPF when no char. available as pinyin
                  //  reading, even with tones, is treated as English
                    ? syllableBPMFChars
                    : syllableChars;
                  flashcardSound.dataset.tippyContent =
                    (displayChars ? pinyinWithTones + ' (' : '') +
                      syllableBPMFChars +
                      (displayChars ? ')' : '');
                  tippy('button[data-tippy-content]', {
                    appendTo: dialog,
                    zIndex: tippyZIndex,
                    followCursor: true,
                    distance: 100,
                    placement: 'right'
                  });
                },
                async $setRandomSyllable () {
                  const syllableInfo = (
                    this.$syllableCtr >= this.$randomSyllables.length - 1
                  )
                    ? await getRandomSyllable()
                    : this.$randomSyllables[this.$syllableCtr + 1];
                  await this.$setSyllable(...syllableInfo);
                  this.$randomSyllables[++this.$syllableCtr] = syllableInfo;
                }
              }
            }, /** @type {import('jamilih').JamilihChildren} */ ([
              ['div', {style: 'display: block;'}, [
                buildFlashcardButton(),
                ['br'], ['br'],
                ['button', {$on: {
                  click () {
                    dialog.$setPreviousRandomSyllable();
                  }
                }}, [
                  _('backward')
                ]],
                ['button', {$on: {
                  async click () {
                    await dialog.$setRandomSyllable();
                  }
                }}, [
                  _('forward')
                ]],
                ['br'], ['br'],
                ['button', {$on: {
                  click () {
                    dialog.close();
                    dialog.remove();
                  }
                }}, [
                  _('Close')
                ]]
              ]]
            ]), body));
          await dialog.$setRandomSyllable();
          dialogPolyfill.registerDialog(dialog);
          dialog.showModal();
        }
      }}, [_('Flashcards')]],
      nbsp,
      ['button', {$on: {
        click () {
          userText.value = '';
        }
      }}, [
        _('Clear')
      ]],
      nbsp,
      ['fieldset', [
        ['legend', [_('Preferences')]],
        ...await Promise.all(
          Object.entries(defaults).map(async ([preference, defaultValue]) => {
            const type = typeof defaultValue;
            switch (type) {
            case 'boolean':
              return ['div', [
                ['label', [
                  ['input', {
                    type: 'checkbox',
                    id: preference,
                    checked: await prefs.getPref(preference),
                    $on: {
                      /**
                       * @this {HTMLInputElement}
                       */
                      async click () {
                        await prefs.setPref(preference, this.checked);
                      }
                    }
                  }],
                  _(preference)
                ]]
              ]];
            default:
              throw new TypeError('Unexpected default value type');
            }
          })
        )
      ]]
    ]],
    nbsp.repeat(2),
    ['textarea', {
      id: 'userText',
      class: 'userText',
      'aria-label': _('Bopomofo')
    }, [
      bopomofoSymbols.reduce((s, [bopomofoSymbol]) => {
        return s + bopomofoSymbol + ' ';
      }, '')
    ]],
    nbsp.repeat(2),
    ['div', {class: 'buttonArea vbox'}]
  ]), body);
}
await init();

const voiceSelect = $s('#voices');
const userText = $t('#userText');
const voices = synth.getVoices().filter(({lang, name}) => {
  if (lang.startsWith('zh-CN')) {
    jml('option', {dataset: {lang, name}}, [
      name
    ], voiceSelect);
    return true;
  }
  return false;
});

/**
 *
 * @param {string} text
 * @returns {void}
 */
function speak (text) {
  const selectedOption = voiceSelect.selectedOptions[0].dataset.name;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = /** @type {SpeechSynthesisVoice} */ (
    voices.find(({name}) => {
      return name === selectedOption;
    })
  );
  // console.log('utterance.voice', utterance.voice);
  synth.speak(utterance);
}

/** @type {HTMLDivElement} */
let lastHorizontalButtonBox;

Object.entries({
  consonants,
  finals_single,
  finals_single_nontranscriptional,
  finals_double,
  tones
}).forEach(([type, symbols], i) => {
  $('.buttonArea').append(jml('div', {id: type}));
  const buttonAreaType = $(`#${type}`);
  buttonAreaType.append(
    (i > 0 ? jml('br') : ''),
    jml('h2', {class: 'symbolType'}, [
      /** @type {string} */
      (_(type))
    ])
  );

  symbols.forEach(([bopomofoSymbol, pinyin], j, arr) => {
    if (!j || !(j % symbolsPerRow)) {
      if (j > 0) {
        buttonAreaType.append(lastHorizontalButtonBox, nbsp);
      }
      lastHorizontalButtonBox = jml('div', {class: 'hbox'});
    }
    lastHorizontalButtonBox.append(
      jml('button', {
        class: 'bopomofoSymbol',
        style: 'color: ' + colors[j % 6] +
          '; background-color: ' + backgroundColors[j % 6],
        dataset: {
          bopomofoSymbol,
          pronounce: bopomofoSymbol || pinyin, // Default for sake of first tone
          tippyContent: type === 'finals_single_nontranscriptional'
            ? /** @type {string} */ (_('finals_single_nontranscriptional_note'))
            : type === 'tones'
              ? j > 0
                ? j + 1
                : /** @type {string} */ (_('first_tone_is_default'))
              : bopomofoSymbol
        },
        $on: {
          click () {
            const bpmfSymbol = /** @type {string} */ (
              this.dataset.bopomofoSymbol
            );
            const {value, selectionStart, selectionEnd} = userText;
            if (lastFocusedElement === userText) {
              userText.value = value.slice(0, selectionStart) +
              bpmfSymbol +
              value.slice(selectionEnd);
              userText.selectionStart = userText.selectionEnd =
                selectionStart + bpmfSymbol.length;
            } else {
              userText.value += bpmfSymbol;
              userText.selectionStart = userText.value.length;
            }
            userText.focus();

            speak(/** @type {string} */ (this.dataset.pronounce));
          }
        }
      }, [pinyin]),
      nbsp.repeat(2)
    );
    if (j === arr.length - 1) {
      buttonAreaType.append(lastHorizontalButtonBox);
    }
  });
});
$('.buttonArea').append(nbsp, jml('a', {href: 'https://github.com/brettz9/bopomofo/blob/master/LICENSE-AGPL.txt'}, [
  /** @type {string} */ (_('License_AGPL'))
]));

// EVENTS

/** @type {HTMLElement} */
let lastFocusedElement;
// Focus listener is needed for likes of tab control selection
//   but focus is apparently needed for clicks on non-form-controls
document.addEventListener('focus', function ({target}) {
  lastFocusedElement = /** @type {HTMLElement} */ (target);
}, true); // Must be capturing for `focus` or `blur`
globalThis.addEventListener('click', function ({target}) {
  // Focus doesn't seem to always detect (at least in Firefox)
  if (!(/** @type {HTMLElement} */ (
    target
  )).classList.contains('bopomofoSymbol')) {
    lastFocusedElement = /** @type {HTMLElement} */ (target);
    // console.log('lastFocusedElement', lastFocusedElement);
  }
});

tippy('[data-tippy-content]', {
  zIndex: tippyZIndex,
  followCursor: true,
  distance: 50,
  placement: 'right'
});

// Trigger caching of JSON so ideally no need to wait when
//   user clicks for flashcards
getRandomSyllable();
