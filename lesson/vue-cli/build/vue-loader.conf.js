'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production' // 是否是生产环境
const sourceMapEnabled = isProduction  // 是否开启生产环境的 SourceMap 还是开发环境的
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = { // vue-loader 的配置项设置
  loaders: utils.cssLoaders({ // css loader 处理的一些配置
    sourceMap: sourceMapEnabled, //是否开启sourceMap
    extract: isProduction        // 是否抽离css样式
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
