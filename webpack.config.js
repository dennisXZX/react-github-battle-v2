const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
    publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
		]
	},
  devServer: {
    historyApiFallback: true,
  },
	plugins: [new HtmlWebpackPlugin({
		template: 'app/index.html'
	})]
}

// add more plugins if we are building for production
// process.env.NODE_ENV will be set to 'production' when we run 'npm run build'
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;