var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  preserveWhitespace: false,
    postcss: [
        require('autoprefixer')({
            browsers: ['last 3 versions'],
            remove: false
        }),
        // require('postcss-plugin-px2rem')({
        //     remUnit: 37.5,
        //     exclude: /(node_module)/,
        // })
        // require('postcss-pxtorem')({
        //     rootValue: 37.5,
        //     propList: ['*']
        // })
    ]
}
