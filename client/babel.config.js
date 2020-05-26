'use strict';

module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        // useBuiltIns: 'usage',
        // debug: true,
      },
    ],
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-export-namespace-from',
  ],
};
