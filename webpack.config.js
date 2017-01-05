'use strict'

// Example webpack configuration with asset fingerprinting in production.
const webpack = require('webpack')
const path = require('path')

// Port
let DEV_SERVER_PORT = 3808

// Envs
const nodeEnv = process.env.NODE_ENV || process.env.RAILS_ENV || 'development'
const isProduction = nodeEnv === 'production'

// ---
// Config
// ---
var config = {
  context: __dirname,

  entry: {
    'application': [ './src/application.js' ]
  },

  output: {
    path: path.join(__dirname, '..', 'public'),
    publicPath: '/',
    filename: isProduction ? '[name]-[chunkhash].js' : '[name].js'
  },

  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.webpack.js', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(isProduction)
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ 'react-hot-loader/webpack', 'babel' ]
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ]
      }
    ]
  }
}

// ---
// Production config
// ---
if (isProduction) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  )
} else {
  config.entry.application.unshift('webpack/hot/dev-server')
  config.entry.application.unshift('webpack-dev-server/client?http://localhost:' + String(DEV_SERVER_PORT))
  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  config.devServer = {
    hot: true,
    port: DEV_SERVER_PORT,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: './public'
  }

  // config.output.publicPath = '//localhost:' + DEV_SERVER_PORT + '/webpack/'
  // Source maps
  config.devtool = 'cheap-module-eval-source-map'
}

module.exports = config
