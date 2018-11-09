export const tones = [
    ['¯', 'ˉ'], // First could be left empty as first tone is default for bomofo
    ['ˊ', 'ˊ'],
    ['ˇ', 'ˇ'],
    ['ˋ', 'ˋ'],
    ['˙', '˙']
];

// First value is bopomofo, second is romanized, third is form if available
//  independently (with the soft "-i" (ㄭ) vowel which is the only vowel item that
// isn't represented independently in transcription except here with consonants)
export const consonants = [
  ['ㄅ', 'b', null, [
      'ㄚ', 'ㄛ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄧ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄥ',
      'ㄨ'
  ]],
  ['ㄆ', 'p', null, [
      'ㄚ', 'ㄛ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄧ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄥ',
      'ㄨ'
  ]],
  ['ㄇ', 'm', null, [
      'ㄚ', 'ㄛ', 'ㄜ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄧ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄡ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄥ',
      'ㄨ'
  ]],
  ['ㄈ', 'f', null, [
      'ㄚ', 'ㄛ', 'ㄟ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ'
  ]],
  ['ㄉ', 'd', null, [
      'ㄚ', 'ㄜ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄤ', 'ㄥ',
      'ㄧ', 'ㄧㄚ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄡ', 'ㄧㄢ', 'ㄧㄥ',
      'ㄨ', 'ㄨㄛ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄥ'
  ]],
  ['ㄊ', 't', null, [
      'ㄚ', 'ㄛ', 'ㄝ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄤ', 'ㄥ',
      'ㄧ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄢ', 'ㄧㄥ',
      'ㄨ', 'ㄨㄛ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄥ'
  ]],
  ['ㄋ', 'n', null, [
      'ㄚ', 'ㄜ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄧ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄡ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄤ', 'ㄧㄥ',
      'ㄨ', 'ㄨㄛ', 'ㄨㄢ', 'ㄨㄥ',
      'ㄩ', 'ㄩㄝ'
  ]],
  ['ㄌ', 'l', null, [
      'ㄚ', 'ㄛ', 'ㄜ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄤ', 'ㄥ',
      'ㄧ', 'ㄧㄚ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄡ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄤ', 'ㄧㄥ',
      'ㄨ', 'ㄨㄛ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄥ',
      'ㄩ', 'ㄩㄝ', 'ㄩㄢ'
  ]],
  ['ㄍ', 'g', null, [
      'ㄚ', 'ㄜ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄚ', 'ㄨㄛ', 'ㄨㄞ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄤ', 'ㄨㄥ'
  ]],
  ['ㄎ', 'k', null, [
      'ㄚ', 'ㄜ', 'ㄞ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄚ', 'ㄨㄛ', 'ㄨㄞ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄤ', 'ㄨㄥ'
  ]],
  ['ㄏ', 'h', null, [
      'ㄚ', 'ㄜ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄚ', 'ㄨㄛ', 'ㄨㄞ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄤ', 'ㄨㄥ'
  ]],
  ['ㄐ', 'j', null, [
      'ㄧ', 'ㄧㄚ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄡ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄤ', 'ㄧㄥ',
      'ㄩ', 'ㄩㄝ', 'ㄩㄢ', 'ㄩㄣ', 'ㄩㄥ'
  ]],
  ['ㄑ', 'q', null, [
      'ㄧ', 'ㄧㄚ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄡ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄤ', 'ㄧㄥ',
      'ㄩ', 'ㄩㄝ', 'ㄩㄢ', 'ㄩㄣ', 'ㄩㄥ'
  ]],
  ['ㄒ', 'x', null, [
      'ㄧ', 'ㄧㄚ', 'ㄧㄝ', 'ㄧㄠ', 'ㄧㄡ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄤ', 'ㄧㄥ',
      'ㄩ', 'ㄩㄝ', 'ㄩㄢ', 'ㄩㄣ', 'ㄩㄥ'
  ]],
  ['ㄓ', 'zh', 'zhi', [
      'ㄭ', 'ㄚ', 'ㄜ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄚ', 'ㄨㄛ', 'ㄨㄞ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄤ', 'ㄨㄥ'
  ]],
  ['ㄔ', 'ch', 'chi', [
      'ㄭ', 'ㄚ', 'ㄜ', 'ㄞ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄚ', 'ㄨㄛ', 'ㄨㄞ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄤ', 'ㄨㄥ'
  ]],
  ['ㄕ', 'sh', 'shi', [
      'ㄭ', 'ㄚ', 'ㄜ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄚ', 'ㄨㄛ', 'ㄨㄞ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄤ'
  ]],
  ['ㄖ', 'r', 'ri', [
      'ㄭ', 'ㄜ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄛ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄥ'
  ]],
  ['ㄗ', 'z', 'zi', [
      'ㄭ', 'ㄚ', 'ㄜ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄛ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄥ'
  ]],
  ['ㄘ', 'c', 'ci', [
      'ㄭ', 'ㄚ', 'ㄜ', 'ㄞ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄛ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄥ'
  ]],
  ['ㄙ', 's', 'si', [
      'ㄭ', 'ㄚ', 'ㄜ', 'ㄞ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ',
      'ㄨ', 'ㄨㄛ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄥ'
  ]],
];

// These are all present within `medials`, but indicate which can be a complete
//  ending vowel combination
export const finals = [
    // independent vowels and combinations thereof (i.e., all vowel combinations
    //  (without consonants) except the "-i" (ㄭ) which is not represented as an
    //  independent character in transcription)
    'ㄚ', 'ㄛ', 'ㄜ', 'ㄝ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ', 'ㄦ',
    'ㄧ', 'ㄧㄚ', 'ㄧㄛ', 'ㄧㄝ', 'ㄧㄞ', 'ㄧㄠ', 'ㄧㄡ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄤ', 'ㄧㄥ',
    'ㄨ', 'ㄨㄚ', 'ㄨㄛ', 'ㄨㄞ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄤ', 'ㄨㄥ',
    'ㄩ', 'ㄩㄝ', 'ㄩㄢ', 'ㄩㄣ', 'ㄩㄥ'
];

// Similar to finals, but only single items (and includes -i (ㄭ) as it is
//  connectable to consonants even while not used independently in transcription)
export const medials = [
    ['ㄚ', 'a', null],
    ['ㄛ', 'o', null],
    ['ㄜ', 'e', null],
    ['ㄝ', 'ê', null],
    ['ㄞ', 'ai', null],
    ['ㄟ', 'ei', null],
    ['ㄠ', 'ao', null],
    ['ㄡ', 'ou', null],
    ['ㄢ', 'an', null],
    ['ㄣ', 'en', null],
    ['ㄤ', 'ang', null],
    ['ㄥ', 'eng', null],
    ['ㄦ', 'er', null],
    // Occurs alone and followed by the previous (excepting ê (ㄝ), ao (ㄠ), ou (ㄡ), er (ㄦ)
    ['ㄧ', 'i', 'yi'],
    // Occurs alone and followed by the previous (excepting ê (ㄝ), ao (ㄠ), ou (ㄡ), er (ㄦ)
    ['ㄨ', 'u', 'wu'],
    // Occurs alone and followed only by these among the previous: ê (ㄝ), an (ㄢ), en (ㄣ), eng (ㄥ)
    ['ㄩ', 'ü', 'yu'],
    // Is different from all of the above in not being represented independently in
    //  transcription (except if including in combination with consonants)
    ['ㄭ', 'i', 'i']
];

export const finalsToPinyin = [
  medials.slice(-1)[0].slice(0, 2), // We only need `ㄭ` as others are part of finals as well
  ...finals.map((finalChars) => {
    // Those within the switch are irregular relative to how the second character
    //  is transformed; there are also, in a few cases, irregularities in how the
    //  first character is transformed as well:
    // 1. In each of the two exceptional instances, 'ㄝ' (ê) is "e" when used in
    //    a final ("ê" is only used outside of a final context--when by itself)
    // 2. For two the three exceptional instances (where "u" and "ü" would be
    //    expected), 'ㄥ', changes from the expected (to "o" and "i")
    switch (finalChars) {
    // ㄧ (i):
    case 'ㄧㄝ': // (independently as i + ê)
      return [finalChars, 'ie'];
    case 'ㄧㄡ': // (independently as i + ou)
      return [finalChars, 'iu'];
    case 'ㄧㄣ': // (independently as i + en)
      return [finalChars, 'in'];
    case 'ㄧㄥ': // (independently as i + eng)
      return [finalChars, 'ing'];
    // ㄨ (u)
    case 'ㄨㄟ': // (independently as u + ei)
      return [finalChars, 'ui'];
    case 'ㄨㄣ': // (independently as u + en)
      return [finalChars, 'un'];
    case 'ㄨㄥ': // (independently as u + eng)
      return [finalChars, 'ong'];
    // ㄩ (ü)
    case 'ㄩㄝ': // (independently as ü + ê)
      return [finalChars, 'üe'];
    case 'ㄩㄣ': // (independently as ü + en)
      return [finalChars, 'ün'];
    case 'ㄩㄥ': // (independently as ü + eng)
      return [finalChars, 'iong'];
    }
    return [
      finalChars, // BPMF
      [...finalChars].reduce((s, finalChar) => { // Phonetics
          return s + medials.find(([chr]) => {
              return finalChar === chr;
          })[1];
      }, '')
    ];
  })
];
// console.log('finalsToPinyin', finalsToPinyin);

export function findPinyinForBopomofoChars (finalChars, component = true) {
  if (component && finalChars === 'ㄝ') { // 'ê' is only used independently
    return 'e';
  }
  const result = finalsToPinyin.find(([bpmf /* , pinyin */ ]) => {
    return bpmf === finalChars;
  });
  if (!result) {
    return undefined;
  }
  return result[1];
}
export const possibleBopomofoSyllables = [...consonants.flatMap(([c, phonetic, /* fullPhonetic */ , availableFinals]) => {
    return availableFinals.map((finalChars) => {
        return [
          (c +
            // 'ㄭ' is not transcribed so don't pass here, but we do pass to
            //  `findPinyinForBopomofoChars` so it can add `i`
            (finalChars === 'ㄭ' ? '' : finalChars)
          ),
          phonetic + findPinyinForBopomofoChars(finalChars)
        ];
    });
}), ...finals.map((r) => {
    return [r, findPinyinForBopomofoChars(r, false)];
})];

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// Todo: Could add in option to add tones too (and use in GUI tool)
export function getRandomSyllable () {
    return possibleBopomofoSyllables[getRandomInt(possibleBopomofoSyllables.length - 1)];
}

let possibleBopomofoSyllablesEnhanced;
export async function getRandomEnhancedSyllable () {
  if (!possibleBopomofoSyllablesEnhanced) {
    possibleBopomofoSyllablesEnhanced = await (
      await fetch('../../data/possibleBopomofoSyllablesEnhanced.json')
    ).json();
  }
  return possibleBopomofoSyllablesEnhanced[getRandomInt(possibleBopomofoSyllables.length - 1)];
};

export const finals_single_nontranscriptional = finalsToPinyin.slice(0, 1);
export const finals_single = finalsToPinyin.slice(1).filter(([bpmf]) => bpmf.length === 1);
export const finals_double = finalsToPinyin.filter(([bpmf]) => bpmf.length > 1);

// console.log('possibleBopomofoSyllables', possibleBopomofoSyllables);
