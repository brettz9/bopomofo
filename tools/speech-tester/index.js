import {jml, $, nbsp} from '../../vendor/jamilih/dist/jml-es.js';
import {bopomofoSymbols} from '../../src/index.js';

const synth = window.speechSynthesis;
const voiceSelect = $('#voices');
const playButton = $('#play');
const cancelButton = $('#cancel');
const userText = $('#userText');
const buttonArea = $('#buttonArea');

const colors = ['Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'PaleVioletRed'];

userText.textContent = bopomofoSymbols.reduce((s, [bopomofoSymbol]) => {
  return s + bopomofoSymbol + ' ';
}, '');

let lastHorizontalButtonBox;
bopomofoSymbols.forEach(([bopomofoSymbol, pinyin], i, arr) => {
  console.log('111');
  if (!i || !(i % 9)) {
    console.log('1112');
    if (i > 0) {
      buttonArea.append(lastHorizontalButtonBox, nbsp);
    }
    lastHorizontalButtonBox = jml('div', {class: 'hbox'});
  }
  lastHorizontalButtonBox.append(
    jml('button', {
      style: 'color: black; background-color: ' + colors[i % 6],
      title: bopomofoSymbol,
      dataset: {bopomofoSymbol},
      $on: {
        click () {
          speak(this.dataset.bopomofoSymbol);
        }
      }
    }, [pinyin]),
    nbsp.repeat(2)
  );
  if (i === arr.length - 1) {
    buttonArea.append(lastHorizontalButtonBox);
  }
});

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

// EVENTS

playButton.addEventListener('click', function (e) {
  e.preventDefault();
  speak(userText.value);
});

cancelButton.addEventListener('click', function (e) {
  synth.cancel();
});
