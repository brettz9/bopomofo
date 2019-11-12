/* eslint-disable import/no-anonymous-default-export */
import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    // By building from distribution file, we can avoid
    //   some fragility, since the only based-in dep. now
    //   is popper.js
    // This is the file pointed to by tippy.js' `module`
    //   in `package.json`, so we could check for that
    //   and import that instead, but if that ever ends
    //   up needing more build steps than this dist
    //   file, it could require more work than this.
    // For some reason, this requires `process`!
    input: 'node_modules/tippy.js/dist/tippy-bundle.esm.js',
    output: {
      banner: 'var process = {env: {NODE_ENV: "production"}}',
      format: 'esm',
      file: 'vendor/tippy.js/dist/tippy-bundle.esm.js'
    },
    plugins: [resolve()]
  }
];
