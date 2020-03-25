'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge') // 合并对象插件
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin') //拷贝资源插件 https://www.npmjs.com/package/copy-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin') // 该插件将为您生成一个HTML5文件  http://www.css88.com/doc/webpack/plugins/html-webpack-plugin/
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 能够更好在终端看到webapck运行的警告和错误 http://npm.taobao.org/package/friendly-errors-webpack-plugin
const portfinder = require('portfinder') //一个自动检索端口的包 http://npm.taobao.org/package/portfinder

const HOST = process.env.HOST // 获取进程env 中的 ip地址（可能没有）
const PORT = process.env.PORT && Number(process.env.PORT) // 获取进程env 中的 端口（可能没有）

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }) // 为css预处理器配置相应的loader
  },
  // cheap-module-eval-source-map 对于开发环境来说是更快的。
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning', // 控制台显示bundle 的警告
    historyApiFallback: { //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, // 是否启用 webpack 的模块热替换特性
    contentBase: false, // since we use CopyWebpackPlugin. 告诉服务器从哪里提供内容
    compress: true, // 一切服务都启用gzip 压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser, // 是否自动打开浏览器
    overlay: config.dev.errorOverlay  //当出现编译错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。如果您只想显示编译器错误:
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, //此路径下的打包文件可在浏览器中访问
    proxy: config.dev.proxyTable, // 代理设置
    quiet: true, // necessary for FriendlyErrorsPlugin 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: { //与监视文件相关的控制选项
      poll: config.dev.poll,
    }
  },
  plugins: [ // 插件的使用
    new webpack.DefinePlugin({ // 允许创建一个在编译时可以配置的全局常量插件 http://www.css88.com/doc/webpack/plugins/define-plugin/
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(), //启用热替换模块(Hot Module Replacement) http://www.css88.com/doc/webpack/plugins/hot-module-replacement-plugin/
    new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径  HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(), // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段，不会阻塞编译，在编译结束后报错。这样可以确保输出资源不会包含错误。
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true   // 为true时，所有javascript资源都将放置在body元素的底部。'head'将脚本放置在head元素中
    }),
    // copy custom static assets
    new CopyWebpackPlugin([ // 将静态文件复制到构建出的目录里
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 发布e2e测试所需的新端口。 publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // 添加端口到devServer配置。 add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
