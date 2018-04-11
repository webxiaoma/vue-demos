'use strict'
require('./check-versions')() // 检测 Node 和 npm 版本 以及输出格式颜色的控制

process.env.NODE_ENV = 'production' // 设置用户环境信息 NODE_ENV 为 生产环境

const ora = require('ora') // 优雅的加载loading 效果插件 https://www.npmjs.com/package/ora
const rm = require('rimraf')  // 生成文件插件 https://www.npmjs.com/package/rimraf
const path = require('path') // 引入路径模块
const chalk = require('chalk')  // 为终端命令添加颜色插件 （https://www.npmjs.com/package/chalk）
const webpack = require('webpack') // 引入webpack
const config = require('../config') // 引入config配置 （项目开发环境配置）
const webpackConfig = require('./webpack.prod.conf') //引入webpack生产环境配置

const spinner = ora('building for production...')
spinner.start()  // 加载loading 效果


// 这里生成 dist 目录, dist目录中生成stati目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err // 如果错误抛出错误

  //执行webpack生产环境的配置，并设置回调函数
  webpack(webpackConfig, (err, stats) => {  //err 对象只会包含 webpack 相关的问题，比如配置错误等。编译错误需要在stats中自己配置 http://www.css88.com/doc/webpack/api/node/
    spinner.stop()  // 停止加载loading 效果
    if (err) throw err

    // 把webpack编译时的信息输出到终端。
    process.stdout.write(stats.toString({ //stats.toString 以格式化的字符串形式返回描述编译信息（类似 CLI 的输出）
      colors: true,  // 增加控制台颜色开关   https://doc.webpack-china.org/configuration/stats
      modules: false,  // 是否添加构建模块信息
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,  // 使构建过程更静默无输出
      chunkModules: false // 是否将构建模块信息添加到 chunk 信息
    }) + '\n\n')

    if (stats.hasErrors()) { //用来检查webpack编译期是否有错误
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow( //输出提醒
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
