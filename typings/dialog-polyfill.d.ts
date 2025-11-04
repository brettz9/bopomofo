// Submitted https://github.com/GoogleChrome/dialog-polyfill/pull/252
declare module 'dialog-polyfill' {
  interface DialogPolyfillType {
    registerDialog(dialog: HTMLDialogElement): void;
    forceRegisterDialog(dialog: HTMLDialogElement): void;
  }

  const dialogPolyfill: DialogPolyfillType;
  export default dialogPolyfill;
}
