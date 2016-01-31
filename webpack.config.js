'use strict'
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPack = require('html-webpack-plugin');

var FILE_SRC = 'src/';
var FILE_BUILD = 'build/';

module.exports = {
	entry: {
		'index': [ path.join( __dirname, FILE_SRC, 'index.js' ) ]
	},
	module: {
		loaders: [
            { 
                test: /\.js$/, 
                loaders: ['script-loader'], 
                include: /external/
            },
            { 
                test: /\.js$/, 
                loaders: ['babel-loader']
            }
		]
	},
	output: {
		path: path.join(__dirname, FILE_BUILD),
		filename: 'js/[name].js'
	},
	resolve: {
		extensions: ['', '.js']
	},
	plugins: [
		new HtmlPack({ 
			title: 'Images',// 在這設定的變數，可在template.html中用 {%= o.htmlWebpackPlugin.options.title %} 帶入
			filename: 'index.html', // 輸出的檔名是什麼
			template: path.join( FILE_SRC, 'template/index.html' ),
			inject: 'body' // 檔案會從輸出的index.html的哪裡link入
		}),
		new ExtractTextPlugin('css/[name].css')
	]
};
