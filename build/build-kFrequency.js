/* eslint-env node -- Node script */
/* eslint-disable no-console -- CLI */
import fs from 'fs';
import path from 'path';
import util from 'util';
import unihanETL from 'node-unihan-etl';
import {possibleBopomofoSyllables} from '../src/index.js';

/**
 *
 * @param {string} str
 * @returns {string}
 */
function stripPinyinDiacritics (str) {
  return str.normalize('NFD').
    replaceAll(/[\u0300-\u0307\u0309-\u036F]/gu, '').
    replaceAll('u\u0308', '\u00FC'); // We add back the composite `u` diaeresis
}

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// console.log(await unihanETL({version: true}), 'Version returned.');

await unihanETL({
  destination: 'unihan.json'
  // Todo: Current bug doesn't allow passing just one field, so have to
  //         do all
  // fields:
  //  ['kFrequency', 'kHanyuPinyin', 'kTotalStrokes', 'kSimplifiedVariant']
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

const mostFrequentChars = mostFrequentCharsPreMap.map(({
  kFrequency, // kTotalStrokes,
  kSimplifiedVariant, kHanyuPinyin, char: c
}) => {
  const readings = kHanyuPinyin && kHanyuPinyin[0] && kHanyuPinyin[0].readings;
  if (!readings || !readings.length) {
    // Why do some like "给" have no pinyin recorded?
    // console.log(
    //   'No readings: ', c, '::', kSimplifiedVariant, '::',
    //   kHanyuPinyin, '::', kFrequency
    // );
    return null;
  }
  if (Array.isArray(kSimplifiedVariant)) {
    kSimplifiedVariant = String.fromCodePoint(
      Number.parseInt(kSimplifiedVariant[0].slice(2), 16)
    );
  }
  const uniquePinyinNoTones = new Set(readings.map(
    (s) => stripPinyinDiacritics(s)
  ));
  // Won't be good for quizzing if has other possible sounds;
  //   however, some sounds may only be mixed with others (like "dei"?)
  const nonUnique = uniquePinyinNoTones.size !== 1;
  const sound = nonUnique
    ? readings // .map(stripPinyinDiacritics);
    : uniquePinyinNoTones.values().next().value;

  return [
    kSimplifiedVariant || c,
    sound,
    Number.parseInt(kFrequency),
    nonUnique,
    readings[0]
  ]; // , kFrequency, kTotalStrokes['zh-Hans']];
}).filter(Boolean);

/**
* @typedef {GenericArray} CharInfo
* @property {string} 0 kSimplifiedVariant, defaulting to char
* @property {string|string[]} 1 sound
* @property {Integer} 2 kFrequency
* @property {boolean} 3 nonUnique
* @property {string} 4 First item of `readings`
*/

/**
 *
 * @param {CharInfo[]} freqs
 * @returns {CharInfo}
 */
function getFirstCharInfo (freqs) {
  return freqs.slice(0, 1)[0]; // .map(([chr]) => chr);
}

const possibleBopomofoSyllablesEnhanced = possibleBopomofoSyllables.map(
  ([bpmf, pinyin]) => {
    const freqsAll = mostFrequentChars.filter(([, freqPinyin, , nonUnique]) => {
      return nonUnique ? freqPinyin.includes(pinyin) : pinyin === freqPinyin;
    });
    // We pick an algorithm to get only those of the lowest
    //   frequency as possible
    let freqs, ct = 1;
    do {
      // eslint-disable-next-line no-loop-func -- Variable content
      freqs = freqsAll.filter(([, , kFrequency, nonUnique]) => {
        return !nonUnique && kFrequency === ct;
      });
      ct++;
    } while (!freqs.length && ct <= 5);
    if (!freqs.length) {
      freqs = freqsAll;
    }
    const freqChars = getFirstCharInfo(freqs); // For now, we just include 1
    if (!freqChars || !freqChars[0]) {
      // Try again but without filtering out duplicates
      const chr = {
        // These do not have pinyin for some reason
        dei: ['得', 'děi'],
        lia: ['俩', 'liǎ'],
        gei: ['給', 'gěi'],
        zhei: ['这', 'zhèi'],
        shei: ['谁', 'shéi'],
        zhuai: ['跩', 'zhuǎi'],
        jü: ['侷', 'jú']
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
      }[pinyin] || [];
      /*
      if (!chr) {
        return null;
      }
      */
      const pinyinWithTonesIfAvailable = (
        (freqChars && freqChars[4]) ||
        chr[1] || pinyin
      );
      return [
        bpmf,
        pinyinWithTonesIfAvailable,
        chr[0] || pinyinWithTonesIfAvailable
      ];
    }
    return [bpmf, freqChars[4], freqChars[0]];
  }
).filter(Boolean);

/*
console.log(
  'possibleBopomofoSyllablesEnhanced', possibleBopomofoSyllablesEnhanced
);
*/

const possibleBopomofoSyllablesEnhancedPath = new URL(
  '../data/possibleBopomofoSyllablesEnhanced.json',
  import.meta.url
);
await writeFile(
  possibleBopomofoSyllablesEnhancedPath,
  JSON.stringify(possibleBopomofoSyllablesEnhanced, null, 2) + '\n'
);
console.log(`Wrote file ${possibleBopomofoSyllablesEnhancedPath.href}`);

/*
console.log('mostFrequentChars', mostFrequentChars);

const mostFrequentCharsPath = path.join(
  __dirname, 'data', 'mostFrequentChars.json'
);
await writeFile(
  mostFrequentCharsPath,
  JSON.stringify(mostFrequentChars, null, 2) + '\n'
);
console.log(`Wrote file ${mostFrequentCharsPath}`);
*/
