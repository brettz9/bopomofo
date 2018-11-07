/* globals dialogPolyfill */
import {jml, $, body, nbsp} from '../../vendor/jamilih/dist/jml-es.js';
import loadStylesheets from '../../vendor/load-stylesheets/dist/index-es.js';
import {
  consonants,
  finals_single, finals_double, finals_single_nontranscriptional,
  tones, getRandomSyllable
} from '../../src/index.js';
import tippy from '../../vendor/tippy.js/dist/esm/tippy.js';
import {i18n} from '../../vendor/i18n-safe/index-es.js';
import {Preferences, PrefDefaults} from '../../vendor/easy-prefs/index-es.js';
import '../../vendor/dialog-polyfill/dialog-polyfill.js';

const synth = window.speechSynthesis;
const colors = ['Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'PaleVioletRed'];
const bopomofoSymbols = [...consonants, ...finals_single, ...finals_double, ...tones];
const symbolsPerRow = 9;

const defaults = {
  Pronounce_component_syllables: true
};
const prefDefaults = new PrefDefaults({defaults});
const prefs = new Preferences({appNamespace: 'bopomofo-', prefDefaults});

(async () => {

const [_] = await Promise.all([
    i18n({locales: [...navigator.languages, 'en-US'], localesBasePath: '../../'}),
    loadStylesheets([
        ['data:image/x-icon;,', {image: false, favicon: true}], // Suppress console
        '../../vendor/dialog-polyfill/dialog-polyfill.css',
        '../../vendor/tippy.js/dist/tippy.css',
        'index.css'
    ])
]);

function buildFlashcardButton () {
    return ['button', {id: 'flashcardSound', $on: {
        async click () {
            const pref = await prefs.getPref('Pronounce_component_syllables');
            if (pref) {
              if (this.dataset.syllableChars.length > 1) {
                [...this.dataset.syllableChars].forEach((chr) => {
                  speak(chr);
                });
              }
              speak(this.dataset.syllableChars);
            } else {
              speak(this.dataset.syllableChars);
            }
        }
    }}];
}

async function init () {
  document.title = _('title');
  jml('div', {class: 'hbox'}, [
    ['div', {class: 'vbox'}, [
      ['div', {class: 'hbox'}, [
        ['select', {id: 'voices'}],
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
          click () {
              setTimeout(() => {
                  dialog.$setRandomSyllable();
              });
              const dialog = jml('dialog', {
                  $custom: {
                      $syllableCtr: -1,
                      $randomSyllables: [],
                      $setPreviousRandomSyllable () {
                          if (this.$syllableCtr < 1) {
                              return;
                          }
                          const previousRandomSyllableInfo =
                            this.$randomSyllables[--this.$syllableCtr];
                          this.$setSyllable(...previousRandomSyllableInfo);
                      },
                      $setSyllable (syllableChars, syllableSound) {
                          $('#flashcardSound').replaceWith(jml(...buildFlashcardButton()));
                          flashcardSound.textContent = syllableSound;
                          flashcardSound.dataset.syllableChars = syllableChars;
                          flashcardSound.dataset.tippyContent = syllableChars;
                          tippy('button[data-tippy-content]', {
                              followCursor: true,
                              distance: 100,
                              placement: 'right'
                          });
                      },
                      $setRandomSyllable () {
                          const syllableInfo = (
                              this.$syllableCtr >= this.$randomSyllables.length - 1
                          )
                            ? getRandomSyllable()
                            : this.$randomSyllables[this.$syllableCtr + 1];
                          this.$setSyllable(...syllableInfo);
                          this.$randomSyllables[++this.$syllableCtr] = syllableInfo;
                      }
                  }
              }, [
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
                          click () {
                              dialog.$setRandomSyllable();
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
              ], body);
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
                      async click (e) {
                        await prefs.setPref(preference, this.checked);
                      }
                    }
                  }],
                  _(preference)
                ]]
              ]];
            }
          })
        )
      ]]
    ]],
    nbsp.repeat(2),
    ['textarea', {id: 'userText', class: 'userText'}, [
        bopomofoSymbols.reduce((s, [bopomofoSymbol]) => {
          return s + bopomofoSymbol + ' ';
        }, '')
    ]],
    nbsp.repeat(2),
    ['div', {class: 'buttonArea vbox'}]
  ], body);
}
await init();

const voiceSelect = $('#voices');
const userText = $('#userText');
const voices = synth.getVoices().filter(({lang, name}) => {
    if (lang.startsWith('zh-CN')) {
        jml('option', {dataset: {lang, name}}, [
          name
        ], voiceSelect);
        return true;
    }
});

function speak (text) {
  const selectedOption = voiceSelect.selectedOptions[0].dataset.name;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices.find(({name}) => {
      return name === selectedOption;
  });
  // console.log('utterance.voice', utterance.voice);
  synth.speak(utterance);
}

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
        jml('h2', {class: 'symbolType'}, [_(type)])
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
          style: 'color: black; background-color: ' + colors[j % 6],
          dataset: {
              bopomofoSymbol,
              pronounce: bopomofoSymbol || pinyin, // Default for sake of first tone
              tippyContent: type === 'finals_single_nontranscriptional'
                ? _('finals_single_nontranscriptional_note')
                : type === 'tones'
                  ? bopomofoSymbol
                      ? null
                      : _('first_tone_is_default')
                  : bopomofoSymbol
          },
          $on: {
            click () {
              const {bopomofoSymbol} = this.dataset;
              const {value, selectionStart, selectionEnd} = userText;
              if (lastFocusedElement === userText) {
                userText.value = value.slice(0, selectionStart) +
                  bopomofoSymbol +
                  value.slice(selectionEnd);
                userText.selectionStart = userText.selectionEnd =
                    selectionStart + bopomofoSymbol.length;
              } else {
                userText.value += bopomofoSymbol;
                userText.selectionStart = userText.value.length;
              }
              userText.focus();

              speak(this.dataset.pronounce);
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
    _('License_AGPL')
]));

// EVENTS

let lastFocusedElement;
// Focus listener is needed for likes of tab control selection
//   but focus is apparently needed for clicks on non-form-controls
document.addEventListener('focus', function ({target}) {
    lastFocusedElement = target;
}, true); // Must be capturing for `focus` or `blur`
window.addEventListener('click', function ({target}) {
  // Focus doesn't seem to always detect (at least in Firefox)
  if (!target.classList.contains('bopomofoSymbol')) {
    lastFocusedElement = target;
    // console.log('lastFocusedElement', lastFocusedElement);
  }
});

tippy('[data-tippy-content]', {
    followCursor: true,
    distance: 50,
    placement: 'right'
});

})();
