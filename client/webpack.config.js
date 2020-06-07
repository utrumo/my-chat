'use strict';

const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const Mode = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

const Path = {
  SRC: path.resolve(__dirname, 'src'),
  DIST: path.resolve(__dirname, 'dist'),
};


const commonConfig = {
  entry: {
    app: './index.jsx',
  },
  output: {
    path: Path.DIST,
  },
  context: Path.SRC,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': Path.SRC,
      'react-dom': '@hot-loader/react-dom',
    },
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
  plugins: [
    new EnvironmentPlugin({
      CLIENT_VERSION: process.env.npm_package_version,
      REST_API_SERVER: 'http://localhost:3000',
      WEBSOCKET_API_SERVER: 'ws://localhost:3000',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      lang: 'en',
      title: 'My chat',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
};

const developmentConfig = {
  mode: Mode.DEVELOPMENT,
  output: {
    filename: '[name].js',
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 8080,
  },
};

const productionConfig = {
  mode: Mode.PRODUCTION,
  output: {
    filename: '[name].[chunkhash:4].js',
  },
};

module.exports = () => {
  const isProduction = process.env.NODE_ENV === Mode.PRODUCTION;
  const config = isProduction ? productionConfig : developmentConfig;
  return merge.smart(commonConfig, config);
};
