const { environment } = require('@rails/webpacker')
const typescript =  require('./loaders/typescript')

environment.loaders.append('html', {
  test: /\.html$/,
  use: [{
    loader: 'html-loader',
    options: {
      minimize: true,
      removeAttributeQuotes: false,
      caseSensitive: true,
      customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
      customAttrAssign: [ /\)?\]?=/ ]
    }
  }]
})

environment.loaders.append('typescript', typescript)
module.exports = environment
