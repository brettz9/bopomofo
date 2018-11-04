import {jml, $} from '../../vendor/jamilih/dist/jml-es.js';
import {bopomofoSymbols} from '../../src/index.js';

const synth = window.speechSynthesis;
const voiceSelect = $('#voices');
const playButton = $('#play');
const cancelButton = $('#cancel');
const userText = $('#userText');

userText.textContent = bopomofoSymbols.reduce((s, [bopomofoSymbol]) => {
  return s + bopomofoSymbol + ' ';
}, '');

const voices = synth.getVoices().filter(({lang, name}) => {
    if (lang.startsWith('zh-CN')) {
        jml('option', {dataset: {lang, name}}, [
          name
        ], voiceSelect);
        return true;
    }
});

// EVENTS

playButton.addEventListener('click', function (e) {
  e.preventDefault();
  const selectedOption = voiceSelect.selectedOptions[0].dataset.name;
  const utterance = new SpeechSynthesisUtterance(userText.value);
  utterance.voice = voices.find(({name}) => {
      return name === selectedOption;
  });
  console.log('utterance.voice', utterance.voice);
  synth.speak(utterance);
});

cancelButton.addEventListener('click', function (e) {
  synth.cancel();
});
