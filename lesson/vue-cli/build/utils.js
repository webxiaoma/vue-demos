'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 将css样式抽离js文文件插件 https://www.npmjs.com/package/extract-text-webpack-plugin
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) { // 确定生产环境或开发环境下的二级目录(静态文件)
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path) // path.posix  跨平台合并路径
}

exports.cssLoaders = function (options) {  //
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = { // 自动补全css兼容性前缀
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader] // 是否使用Postcss-loader

    if (loader) {
      loaders.push({ // 将css 预编译器以及配置 存在 loaders数组中
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) { // 是否将css和js进行分类 （这里在生产环境下才会分类，在vue-loader.config.js 中有配置）
      return ExtractTextPlugin.extract({ // 使用ExtractTextPlugin 插件来抽离css样式
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {  // 支持的css解析器
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 为独立样式文件生成加载器 Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) { // 这个函数里其实过滤掉了没有使用的css解析器
  const output = []
  const loaders = exports.cssLoaders(options)  // 存储cssLoaders() 函数返回的对象(包含所有使用的css解析器)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier') //使用Node.js发送跨平台本地通知

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
