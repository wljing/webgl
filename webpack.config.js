const webpack = require('webpack');
const htmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, join } = require('path');

module.exports =  {
  entry: {
    index: './index.js',
  },
  output: {
    path: resolve('dist'),
    filename: 'common.js',
  },
  devServer: {
    contentBase: './src',
    port: 3000,
    hot: true,
    host: 'localhost',
    open: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_module/ ,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
		new htmlWebpackPlugin({
			template: join(__dirname, './src/index.html'),
			filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
	],
}