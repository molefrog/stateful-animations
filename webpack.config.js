const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/application.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'application.js'
  },

  resolve: {
    symlinks: false,
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: isProduction
    ? [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new UglifyJsPlugin()
      ]
    : [],

  devtool: isProduction ? false : 'cheap-module-eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
}
