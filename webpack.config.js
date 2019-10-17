'use strict';
const { VueLoaderPlugin } = require('vue-loader');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        exclude: /(node_modules)/,
        use: 'vue-loader'
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './src'),
    watchContentBase: true,
    port: 9000
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: process.env.API_URL || 'http://localhost:3000',
      siteHeader: {
        'x-slsmu-site': process.env.SITE || 'localhost'
      },
      // Use this to create dynamic routes for contents
      contents: ['post'],
      permissions: {
        post: {
          creators: ['user', 'admin'],
          viewers: ['guest', 'user', 'admin']
        },
        upload: {
          creators: ['user', 'admin'],
          viewers: ['user', 'admin']
        }
      }
    })
  }
};
