const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  entry: {
    auth: ['webpack-hot-middleware/client', './src/app_auth/index.js'],
    business: ['webpack-hot-middleware/client', './src/app_business/index.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: require('./commonRules.js')
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      template: './webview.index.template.html',
      filename: 'auth.html',
      excludeChunks: ['business']
    }),
    new HtmlWebpackPlugin({
      template: './webview.index.template.html',
      filename: 'business.html',
      excludeChunks: ['auth']
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  performance: {
    hints: false
  },
  node: {
    fs: 'empty'
  }
};
