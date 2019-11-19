const path = require('path')


const config = {
  port: 3310,
  source: path.join(__dirname, '../src/app'),
  template: path.join(__dirname, '../src/app/index.html'),
  dist: path.join(__dirname, '../dist'),
  publicPath: '/',
  proxy: {
      '/':{
        target:'http://127.0.0.1:8888/',
        changeOrigin:true
      }
    }
}

module.exports = config
