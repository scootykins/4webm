const path = require('path')

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './static')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'buble-loader',
      }
    ]
  }
}
