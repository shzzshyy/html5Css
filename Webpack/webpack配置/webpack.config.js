const path = require('path') //从node的包里面找path
const webpack = require('webpack')

module.exports = {
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),  //要动态路径
    filename:'bundle.js'
  },
  plugins: [
    new webpack.BannerPlugin('123123123')
  ]
}