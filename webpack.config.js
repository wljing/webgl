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
    host: '0.0.0.0',
    open: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_module/,
      },
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_module/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
		new htmlWebpackPlugin({
			template: join(__dirname, './index.html'),
			filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
	],
}