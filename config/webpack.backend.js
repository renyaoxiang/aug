var webpack = require('webpack')

module.exports = [{
	devtool: 'inline-source-map',
	entry: {
		server: ['./src/backend/server.ts'],
	},
	output: {
		path: process.cwd() + '/build/backend',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			}
		]
	},
	target: 'node',
	plugins: [

	]
}]
