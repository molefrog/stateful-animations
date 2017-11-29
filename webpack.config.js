const path = require('path')

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

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
}
