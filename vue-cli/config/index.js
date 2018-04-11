'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {  // 开发环境下的一些变量配置

    // Paths
    assetsSubDirectory: 'static', // 生产环境下 打包后生成二级目录（文件夹）名字
    assetsPublicPath: '/', // 生产环境下  编译后项目路径的根目录，可配置为资源服务器域名或 CDN 域名
    proxyTable: {  //  处理代理请求的配置
            // 里边一般可以这样配置

      // '/api': {
      //   target: 'http://114.225.25.88:8082',  // 接口域名
      //   changeOrigin: true,  //是否跨域
      //   pathRewrite: {
      //     '^/api': ''   //需要rewrite的, 将/api 替换为空
      //   }
      // }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST（可以被process.env.HOST覆盖）启动项目的地址，可以写自己电脑ip，这样在局域网可以访问你的页面
    port: 8080, // 启动项目时的端口号 （可以被过程改写，如果端口正在使用，则将确定一个空闲端口。）can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false, // 是否启用自动打开浏览器， 默认不启用
    errorOverlay: true,  //查询错误
    notifyOnErrors: true,   // 是否启用编译时的错误提示

    //是跟devserver相关的一个配置，webpack为我们提供的devserver是可以监控文件改动的，但在有些情况下却不能工作，我们可以设置一个轮询（poll）来解决
    poll: false, //控制选项与监视文件有关。 https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true, // 是否启用 eslint 代码检测，默认启用
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false, //是否展示eslint的错误提示

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map', // 设置SourceMap模式 生成一个没有列信息（column-mappings）的SourceMaps文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true, //一个配合devtool的配置，当给文件名插入新的hash导致清楚缓存时是否生成souce maps，默认在开发环境下为true

    cssSourceMap: true //是否开启cssSourceMap
  },

  build: { // 生产环境下的一些变量配置
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'), // 编译后index.html的路径，path.resolve(__dirname, '../dist')中

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'), // 打包后的文件根路径
    assetsSubDirectory: 'static',
    assetsPublicPath: '/', // 开发环境下 路径的根目录

    /**
     * Source Maps
     */

    productionSourceMap: true,  //是否开启source-map，
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',  //生成一个SourceMap文件.

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, //是否压缩，
    productionGzipExtensions: ['js', 'css'], // gzip模式下需要压缩的文件的扩展名，设置后会对相应扩展名的文件进行压缩

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 是否开启打包后的分析报告
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
