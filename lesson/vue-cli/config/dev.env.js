'use strict'
const merge = require('webpack-merge') //将多个对象合并成一个对象，可以选择创建一个新克隆对象插件 https://www.npmjs.com/package/merge
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"' // 开发环境变量
})
