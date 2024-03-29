var path = require('path')
require('babel-polyfill');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  configureWebpack:(config)=>{
    // config.externals = {
    //   "vue": "vue",
    //   'vue-router': 'vue-router',
    //   'axios': 'axios',
    //   'clipboard': 'clipboard',
    //   'vue-i18n': 'vue-i18n'
    // }
    config.entry.app = ['babel-polyfill', './src/main.js'] //入口文件
  },
  chainWebpack: config => {
    // 路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@img', resolve('src/assets/img'))
  },

  productionSourceMap: false,

  css: {
    // extract: true,
    // sourceMap: false,
    // modules: false,
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  // devServer: {
  //   open: process.platform === 'darwin',
  //   // host: '192.168.125.32',
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   proxy: null
  // },
  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  }
}
