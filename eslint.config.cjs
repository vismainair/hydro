const litPlugin = require('eslint-plugin-lit');
const wcPlugin = require('eslint-plugin-wc');

let customConfig = [];
let hasIgnoresFile = false;

try {
  require.resolve('./eslint.ignores.cjs');
  hasIgnoresFile = true;
} catch {
  // eslint.ignores.cjs doesn't exist
}

if (hasIgnoresFile) {
  const ignores = require('./eslint.ignores.cjs');
  customConfig = [{ ignores }];
}

module.exports = [
  ...customConfig,
  ...require('gts'),
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      lit: litPlugin,
      wc: wcPlugin,
    },
    rules: {
      // Enables Lit and Web Component best-practice rules safely
      'lit/no-native-attributes': 'error',
    },
  },
];