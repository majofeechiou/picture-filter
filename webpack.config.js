'use strict'
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPack = require('html-webpack-plugin');

var FILE_SRC = 'src/';
var FILE_BUILD = 'build/';

module.exports = {
  entry: {
    'index': './'+FILE_SRC+'/js/index.js',
  },
  output: {
    path: path.join(__dirname, FILE_BUILD),
    filename: 'js/[name].js'
  }
}