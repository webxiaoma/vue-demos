# vue-cli （3.0.0版本）讲解


### 关于项目

- 目前该 `vue-cli` 使用的是 3.0.0 版本。
- 该项的`src`文件夹中加入了一些我在写`vue`项目时的一些常用目录构架，下面会详细说。
- 另外项目中我都有对代码的注释，来了解 `vue-cli`这个脚手架。
- 该项并不可以直接使用，目的是了解vue-cli 项目结构。
- 某些目录下面也会有详细的说明和官网链接以及相关文章链接。

### 目录结构讲解

```

|-- build                            // 项目构建(webpack以及简易node服务)相关代码
|   |-- build.js                     // 生产环境构建代码 （执行npm run build 时，执行此文件）
|   |-- check-version.js             // 检查node、npm等版本
|   |-- utils.js                     // 主要处理一些css相关的loader
|   |-- vue-loader.config.js         // vue-loader 的配置项设置（utils 中的一些配置，也是在这里传进去的）
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                   // vue公共组件
|   |-- store                        // vuex的状态管理
|   |-- router                       // 路由文件
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些不需要编译的图片、font字体、json数据等
|-- test                             // 关于测试的文件
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义和维护一致的编码风格 1
|-- .eslintignore                    // 设置那些文件忽略eslint 代码检测 2
|-- .eslintrc.js                     // eslint代码检测配置 2
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcssrc.js                    // 处理css 比如，给css加上兼容性前缀
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
|-- package-lock.json                // 锁定插件版本的文件(当你第二下载插件时，自动生成)
|-- README.md                        // 项目说明

```


1. 关于`editorconfig`的一些东西 [官网](http://editorconfig.org/)    [文章](https://www.cnblogs.com/xiaohuochai/p/7160067.html)
2. 关于eslint的一些东西 [官网](http://eslint.cn/docs/rules/)  [相关文章](http://cnodejs.org/topic/57c68052b4a3bca66bbddbdd)



### src 目录说明

src目录中我添加了一些自己写项目时唱搭建的目录结构

```
|-- src                              // 源码目录
|   |-- api                          // api请求接口目录（里面apis 存储所有api接口，还可以对应页面建目录，来写api请求）
|   |   |--apis                      // 存储所有api接口
|   |-- components                   // vue公共组件
|   |   |-- layout                   // 存放页面整体结构目录（例如头部，尾部，客服浮动框）
|   |   |-- Home.vue                 // 网站首页
|   |   |-- Main.vue                 // 网站整体构架的搭建
|   |-- public                       // 公共方法
|   |-- store                        // vuex的状态管理
|   |-- router                       // 路由文件
|   |-- theme                        // 存放一些公共主题样式，比如页面的主色调，副色调，hover色调，按钮色调
|   |-- utils                        // 针对项目对异步请求的一些封装目录（我这里对axios进行了简单的封装）
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件

```
