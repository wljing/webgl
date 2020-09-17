const webpack = require('webpack');

export default {
  entry: {
    index: './index.js',
  },
  output: {
    path: './dist',
    filename: 'common.js',
  },
  devServer: {
    content: './src',
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
        exclude: './node_module/'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
		new htmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
	],
}