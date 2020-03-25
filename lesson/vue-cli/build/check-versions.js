'use strict'
const chalk = require('chalk') // 为终端命令添加颜色插件 （https://www.npmjs.com/package/chalk）
const semver = require('semver') // 格式化版本号，还可以进行比较 https://www.npmjs.com.cn/misc/semver/
const packageConfig = require('../package.json') // 引入package.json 文件
const shell = require('shelljs') // 在Node.js API之上的Unix shell命令的便携式（Windows / Linux / OS X）实现。 https://www.npmjs.com/package/shelljs

function exec (cmd) { // 打开cmd 并执行命令（这里将输入的命令变成字符串并去掉两边空格了）
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), // 格式化node版本号 变成如 6.0.0
    versionRequirement: packageConfig.engines.node // 获取node最低要求的版本号
  }
]

if (shell.which('npm')) { // 统一不同系统（Windows / Linux / OS X）上的命令
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), // 获取npm版本
    versionRequirement: packageConfig.engines.npm //获取npm最低要求的版本号
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) { // 判断所处node/npm的版本是否符合要求（这里可以看看semver插件的用法）
      //如果不符合要求 将警告存储在 warnings 数组中
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +  // 给输出信息添加颜色 （这里是红色，下边是绿色）
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) { // 判断是否存在警告（存在说明node或npm 版本不符合要求）
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) { // 输出不符合要求node/npm的信息
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1) // 结束node进程 输出状态码 1
  }
}
