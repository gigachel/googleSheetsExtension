// var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Jimp = require("jimp");

module.exports = {
  // entry: './src/index.js',
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, 'dist')
  // },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      // options: {
      //   loaders: {
      //     js: 'babel-loader!eslint-loader'
      //   }
      // }
    }, {
      // test: /\.js$/,
      // loader: 'babel-loader',
      // exclude: /node_modules/
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/manifest.json',
      to: 'manifest.json'
    }]),
    // new class { // custom task: resize image and copy them
    new Object({ // custom task: resize image and copy them
      apply(compiler) {
        compiler.plugin("emit", async function(compilation, callback) {
          var image = await Jimp.read('src/images/empty.png');
          image.resize(128, Jimp.AUTO).write('dist/images/empty-128.png');
          image.resize(64, Jimp.AUTO).write('dist/images/empty-64.png');
          image.resize(48, Jimp.AUTO).write('dist/images/empty-48.png');
          image.resize(32, Jimp.AUTO).write('dist/images/empty-32.png');
          image.resize(16, Jimp.AUTO).write('dist/images/empty-16.png');
          callback();
        });
      }
    }),
    // new HtmlWebpackPlugin()
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Custom template',
      template: 'src/index.html', // Load a custom template (lodash by default see the FAQ for details)
    })
  ],
  // devtool: '#eval-source-map',
  // devtool: 'inline-source-map',
};
