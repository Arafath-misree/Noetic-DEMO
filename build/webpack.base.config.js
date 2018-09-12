module.exports = {
  context: `${__dirname}/../`,
  target: 'web',
  resolve: {
    extensions: ['.js', '.json', '.styl']
  },
  output: {
    filename: 'bundle.js'
  }
}
