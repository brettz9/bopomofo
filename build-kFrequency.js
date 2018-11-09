import 'core-js/fn/array/flat-map';
import fs from 'fs';
import path from 'path';
import util from 'util';
import unihanETL from 'node-unihan-etl';
import {possibleBopomofoSyllables} from './src/index.js';

function stripPinyinDiacritics (str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u0307\u0309-\u036f]/g, '')
    .replace(/u\u0308/g, '\u00fc'); // We add back the composite `u` diaeresis
}

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

(async () => {

// console.log(await unihanETL({version: true}), 'Version returned.');

await unihanETL({
  destination: 'unihan.json',
  fields: ['kFrequency', 'kHanyuPinyin', 'kTotalStrokes', 'kSimplifiedVariant']
});

const unihanFile = path.join(process.cwd(), 'unihan.json');

const json = JSON.parse(await readFile(unihanFile));

const mostFrequentCharsPreMap = json.sort((a, b) => {
  if (a.kFrequency === b.kFrequency) {
    return a.kTotalStrokes['zh-Hans'] === b.kTotalStrokes['zh-Hans']
      ? 0
      : a.kTotalStrokes['zh-Hans'] < b.kTotalStrokes['zh-Hans']
        ? -1
        : 1;
  }
  if (!a.kFrequency) {
    if (!b.kFrequency) {
      return 0;
    }
    return 1;
  } else if (!b.kFrequency) {
    return -1;
  }
  // Safe to avoid `parseInt` for frequencies being only 1-4
  // const aa = parseInt(a.kFrequency);
  // const bb = parseInt(b.kFrequency);
  const aa = a.kFrequency;
  const bb = b.kFrequency;
  return aa === bb ? 0 : aa < bb ? -1 : 1;
});

const mostFrequentChars = mostFrequentCharsPreMap.map(({kFrequency, kTotalStrokes, kSimplifiedVariant, kHanyuPinyin, char: c}) => {
  const readings = kHanyuPinyin && kHanyuPinyin[0] && kHanyuPinyin[0].readings;
  if (!readings || !readings.length) {
    // Why do some like "给" have no pinyin recorded?
    // console.log('No readings: ', c, '::', kSimplifiedVariant, '::', kHanyuPinyin, '::', kFrequency);
    return null;
  }
  if (Array.isArray(kSimplifiedVariant)) {
    kSimplifiedVariant = String.fromCodePoint(parseInt(kSimplifiedVariant[0].slice(2), 16));
  }
  const uniquePinyinNoTones = new Set(readings.map(stripPinyinDiacritics));
  const nonUnique = uniquePinyinNoTones.size !== 1; // Won't be good for quizzing if has other possible sounds; however, some sounds may only be mixed with others (like "dei"?)
  let sound;
  if (nonUnique) {
    sound = readings; // .map(stripPinyinDiacritics);
  } else {
    sound = uniquePinyinNoTones.values().next().value;
  }
  return [kSimplifiedVariant || c, sound, parseInt(kFrequency), nonUnique]; // , kFrequency, kTotalStrokes['zh-Hans']];
}).filter((i) => i);

function getFirstChar (freqs) {
  return freqs.slice(0, 1).map(([chr]) => chr)[0];
}

const possibleBopomofoSyllablesEnhanced = possibleBopomofoSyllables.map(([bpmf, pinyin]) => {
  const freqsAll = mostFrequentChars.filter(([, freqPinyin, , nonUnique]) => {
    return nonUnique ? freqPinyin.includes(pinyin) : pinyin === freqPinyin;
  });
  // We pick an algorithm to get only those of the lowest frequency as possible
  let freqs, ct = 1;
  do {
    freqs = freqsAll.filter(([, , kFrequency, nonUnique]) => {
      return !nonUnique && kFrequency === ct;
    });
    ct++;
  } while (!freqs.length && ct <= 5);
  if (!freqs.length) {
    freqs = freqsAll;
  }
  let freqChars = getFirstChar(freqs); // For now, we just include 1
  if (!freqChars) {
    // Try again but without filtering out duplicates
    freqChars = {
        // These do not have pinyin for some reason
        dei: '得',
        lia: '涜',
        gei: '給',
        zhei: '这',
        shei: '谁',
        zhuai: '跩',
        jü: '侷',
        // These also, but not sure about replacements:
        // to
        // These with umlauts:
        // lüan
        // jüe
        // jüan
        // jün
        // qü
        // qüe
        // qüan
        // qün
        // xü
        // xüe
        // xüan
        // xün
        // These single syllable finals: ê, ei, i, u, ü
        // All of the double syllable finals
    }[pinyin];
    if (!freqChars) {
      return null;
    }
  }
  return [bpmf, pinyin, freqChars];
}).filter((i) => i);

// console.log('possibleBopomofoSyllablesEnhanced', possibleBopomofoSyllablesEnhanced);

const possibleBopomofoSyllablesEnhancedPath = path.join(__dirname, 'data', 'possibleBopomofoSyllablesEnhanced.json');
await writeFile(
  possibleBopomofoSyllablesEnhancedPath,
  JSON.stringify(possibleBopomofoSyllablesEnhanced, null, 2) + '\n'
);
console.log(`Wrote file ${possibleBopomofoSyllablesEnhancedPath}`);

/*
console.log('mostFrequentChars', mostFrequentChars);

const mostFrequentCharsPath = path.join(__dirname, 'data', 'mostFrequentChars.json');
await writeFile(
  mostFrequentCharsPath,
  JSON.stringify(mostFrequentChars, null, 2) + '\n'
);
console.log(`Wrote file ${mostFrequentCharsPath}`);
*/

})();
