# bopomofo CHANGES

## 0.9.0

- Enhancement: Add tone markers to pinyin

## 0.8.0

- Enhancement: Add preference to pronounce component syllables
- Enhancement: Button to clear textarea
- Change: Allow first tone to be input anyways despite lack of necessity

## 0.7.0

- Fix: Avoid duplicates in `finalsToPinyin`
- Enhancement: Export `finals_single`, `finals_double`,
  `finals_single_nontranscriptional`
- Enhancement: Add finals as buttons instead of only medials, including
  special note for nontranscriptional final

## 0.6.0

- Fix: Possible syllables were returning pinyin incorrectly in some cases;
   fixed as export and within flashcards

## 0.5.0

- i18n: Add Google-translated zh-CN; fix English title

## 0.4.0

- Fix: "en-US" as default language for fallback when all user locales
    are unavailable in the app (Thanks @Gcaufy!)
- Demo: Add license link to demo

## 0.3.0

- Breaking change (API): Export format (see `src/index.js`)
- Enhancement: "Flashcards" randomizing among all possible syllables
- Enhancement: Add tooltips showing Bopomofo (Zhuyin) characters
- Enhancement: Allow input of consonants, vowels, and (relevant) tone marks
- Enhancement: i18nize

## 0.2.0

- Enhancement: Add button area

## 0.1.0

- Initial commit (Just the ability to play the speech in a textbox
  populated by default with bopomofo)
