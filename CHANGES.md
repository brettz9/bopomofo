# bopomofo CHANGES

## ?

- Docs: JSDoc (Linting)

## 2.1.0

- Optimization: Defer scripts
- Linting: Update ignore file
- npm: Make separate copy scripts for clarity as to included deps.
- npm: Update devDeps; opn-cli -> open-cli, deps copied:
  core-js-bundle, jamilih, load-stylesheets, tippy.js
- npm: Remove unused `@babel/polyfill`

## 2.0.0

- Breaking change: Now requires core-js/regenerator-runtime as added
    SimplePrefs as external dep.
- Refactoring: Simplify preference default setting; fix and
  simplify preference namespacing
- Refactoring: Simplify labeling by using aria-label rather than CSS
- npm: Add separate open script
- npm: Update devDeps

## 1.0.0

- Fix: Global `flashcardSound`
- Enhancement: Accessibility
- Update: Use new ESM version of dialog-polyfill
- Linting (ESLint): Add eslint-config-ash-nazg and npm script and apply
- Testing: Add UI tests
- Docs: Typos, lbs, todo
- npm: Update devDeps including dialog-polyfill; make explicit `core-js` devDep

## 0.10.1

- Fix: Show special tooltip for first tone

## 0.10.0

- Enhancement: Show tone numbers on hover over tones

## 0.9.3

- Fix: For few items for which no characters are found (a number of syllable
  finals, some syllables with umlauts and `to`), at least show the pinyin.
- Fix: Get tones to show for characters we are forcing a match with

## 0.9.2

- Fix: Possible race condition for flashcard set-up
- l10n: Grammar nit
- Docs: Update docs per latest behavior

## 0.9.1

- Fix: Have pronunciation include tones (speaks character now)

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
