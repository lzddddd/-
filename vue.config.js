const path = require('path');        //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)  //path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('components', resolve('./src/components'))
      .set('network', resolve('./src/network'))
      .set('store', resolve('./src/store'))
      .set('views', resolve('./src/views'))
  },

  // 由于浏览器有跨域限制,这里cli 工具提供了 启动本地代理服务器 请求
  devServer: {
    open: false,      // 是否打开浏览器;
    hotOnly: true,    // 是否热更新;

    proxy: {
      '/api': {   // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下面移除即可
        // 目标代理接口地址,实际跨域要访问的接口,这个地址会替换掉 axios.defaults.baseURL


        target: 'http://112.74.126.4:8080/',
        // target: 'http://www.bilibili.com/',

        changeOrigin: true,  // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {   // 去掉 路径中的  /api  的这一截
          '^/api': ''
        },
        // ws: true,       // 是否启用  websockets;
        // secure: false,

      },

    },

  },
}

