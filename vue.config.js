'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = 'Field Force Excellence' // page title

const port = process.env.port || process.env.npm_config_port || 8088 // dev port

module.exports = {

  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    sockHost: 'http://localhost:8088',
    host: '0.0.0.0',
    port: port,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    hotOnly: true
    // proxy: {
    //   '/upms': {
    //     target: 'https://freyr.dev.helixtec.cn/upms',
    //     changeOrigin: true
    //   }
    // }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
