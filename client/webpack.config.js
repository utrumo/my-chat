'use strict';

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = resolve(__dirname, 'src');
const dist = resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: dist,
    open: true,
    port: 9000,
    historyApiFallback: true,
  },
  context: src,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': src,
      'react-dom': '@hot-loader/react-dom',
    },
  },
  entry: './index.jsx',
  output: {
    filename: 'main.js',
    path: dist,
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
  plugins: [new HtmlWebpackPlugin({
    template: './index.html',
    lang: 'en',
    title: 'My chat',
  })],
};
