# bopomofo

A web app tool for learning the phonetic [Bopomofo](https://en.wikipedia.org/wiki/Bopomofo)/[Zhuyin](https://en.wikipedia.org/wiki/Zhuyin_table)
system for Mandarin Chinese.

## Features

- Allow input into textarea of Bopomofo text based on pinyin buttons of
  consonants, medials, and tones (with Bopomofo characters as tooltips).
- Speaks the sound when Bopomofo buttons are clicked
- Speaks all the Bopomofo text in the textaea if "Play" is pushed (with
  "Cancel" button).
- Has pull-down for Chinese voices available on the browser (may be only
  one or none for browsers not supporting Chinese voices or not
  supporting `speechSynthesis`).
- Button to show flashcards dialog; dialog shows pinyin button with a
  randomly chosen Mandarin syllable (among all syllables possible); can
  hover button to see comprising Bopomofo characters, can push button to
  get sound, and can scroll forward through new random items, or backward
  through already discovered items.

## To-dos

1. Allow filtering of possible choices by consonant, medial (or final?)
1. Allow input of tone to flashcards playback
1. Keep a memory of user's progress, more often omitting items marked
    as known
