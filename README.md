# bopomofo

A web app tool for learning the phonetic
[Bopomofo](https://en.wikipedia.org/wiki/Bopomofo)/[Zhuyin](https://en.wikipedia.org/wiki/Zhuyin_table)
system for Mandarin Chinese.

## Features

- Allow input into textarea of Bopomofo text based on pinyin buttons of
  consonants, medials, and tones (with Bopomofo characters as tooltips).
- Speaks the sound when Bopomofo buttons are clicked
- Speaks all the Bopomofo text in the textarea if "Play" is pushed (with
  "Cancel" button).
- Has pull-down for Chinese voices available on the browser (may be only
  one or none for browsers not supporting Chinese voices or not
  supporting `speechSynthesis`).
- Button to show flashcards dialog; dialog shows button with a
  randomly chosen Mandarin character or pinyin derived from the character
  (currently the most frequent, lowest stroke count character that is not
  pronounceable with another sound) (among all syllables possible); can
  hover button to see comprising pinyin and Bopomofo characters, can push
  button to get sound, and can scroll forward through new random items,
  or backward through already discovered items.

## To-dos

1. Add more testcafe tests
1. Allow filtering of possible choices by consonant, medial (or final?)
1. Allow input of tone to flashcards playback
1. Keep a memory of user's progress, more often omitting items marked
    as known
1. Allow preference to show pinyin instead of Chinese character on
   flashcards.
