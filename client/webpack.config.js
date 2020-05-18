'use strict';

const { resolve } = require('path');

const src = resolve(__dirname, 'src');
const dist = resolve(__dirname, 'public');

module.exports = {
  context: src,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: './index.jsx',
  output: {
    filename: 'main.js',
    path: dist,
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: dist,
    open: true,
    port: 9000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
