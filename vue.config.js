const webpack = require('webpack')
// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, '..'1, dir)
// }

module.exports = {
  lintOnSave: false,
  outputDir: 'dist', // 打包名称
  publicPath: './', // 部署项目路径
  devServer: {
    port: 8088, // 端口号
    open: false, //配置自动启动浏览器
    proxy: {
      '/qingpubus': {
        target: "http://101.231.47.117:50020/qingpubus", // 外网 
        // target: "http://10.1.30.204:50020/qingpubus" // 内网 
        // target: "http://192.168.1.102:8006/qingpubus", // 本地 
        changeOrigin: true,
        pathRewrite: {
          '^/qingpubus': '/'
        }
      },
    }
  },

  configureWebpack: {
    // webpack 配置项
    // resolve: {
    //   alias: {
    //     vue$: 'vue/dist/vue.esm.js'
    //     // '@': resolve('src'),
    //     // 'views': resolve('src/views')
    //   }
    // },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        // data: `@import "@/assets/css/global.scss";`
      },
    },
    extract: false
  }
}
