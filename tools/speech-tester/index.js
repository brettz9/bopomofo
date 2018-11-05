import {jml, $, body, nbsp} from '../../vendor/jamilih/dist/jml-es.js';
import loadStylesheets from '../../vendor/load-stylesheets/dist/index-es.js';
import {consonants, medials, tones} from '../../src/index.js';
import tippy from '../../vendor/tippy.js/dist/esm/tippy.js';
import {i18n} from '../../vendor/i18n-safe/index-es.js';

const synth = window.speechSynthesis;
const colors = ['Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'PaleVioletRed'];
const bopomofoSymbols = [...consonants, ...medials, ...tones];
const symbolsPerRow = 9;

(async () => {

const [_] = await Promise.all([
    i18n({localesBasePath: '../../'}),
    loadStylesheets([
        'index.css',
        '../../vendor/tippy.js/dist/tippy.css'
    ])
]);

function init () {
  document.title = _('title');
  jml('div', {class: 'hbox'}, [
    ['div', {class: 'vbox'}, [
      ['div', {class: 'hbox'}, [
        ['select', {id: 'voices'}],
        nbsp,
        ['button', {id: 'play'}, [_('Play')]]
      ]],
      nbsp,
      ['button', {id: 'cancel'}, [_('Cancel')]]
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
init();

const voiceSelect = $('#voices');
const playButton = $('#play');
const cancelButton = $('#cancel');
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
  console.log('utterance.voice', utterance.voice);
  synth.speak(utterance);
}

let lastHorizontalButtonBox;

Object.entries({consonants, medials, tones}).forEach(([type, symbols], i) => {
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
              bopomofoSymbol: bopomofoSymbol || pinyin, // Default for sake of first tone
              tippyContent: type === 'tones' ? null : bopomofoSymbol
          },
          $on: {
            click () {
              speak(this.dataset.bopomofoSymbol);
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

// EVENTS

playButton.addEventListener('click', function (e) {
  e.preventDefault();
  speak(userText.value);
});

cancelButton.addEventListener('click', function (e) {
  synth.cancel();
});

tippy('[data-tippy-content]', {
    followCursor: true,
    distance: 50,
    placement: 'right'
});

})();
