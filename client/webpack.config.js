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
  output: {
    path: Path.DIST,
  },
  context: Path.SRC,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': Path.SRC,
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
  entry: {
    app: ['react-hot-loader/patch', './index.jsx'],
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
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
  entry: {
    app: './index.jsx',
  },
  output: {
    filename: '[name].[contenthash:4].js',
  },
  devtool: 'nosources-source-map',
};

module.exports = (env) => {
  if (env && env.NODE_ENV) {
    process.env.NODE_ENV = env.NODE_ENV;
  }

  const isProduction = process.env.NODE_ENV === Mode.PRODUCTION;
  const partConfig = isProduction ? productionConfig : developmentConfig;
  const resultConfig = merge.smart(commonConfig, partConfig);

  return resultConfig;
};
