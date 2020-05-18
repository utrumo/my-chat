'use strict';

module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-env',
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-export-namespace-from',
  ],
};
