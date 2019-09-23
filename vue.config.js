const API_URL = 'https://merchant_api.xunbaowang.net'

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/interface/v1/': {
        target: API_URL,
        ws: true,
        changeOrigin: true
      },
      // '/oss/upload/': {
      //   target: API_URL,
      //   ws: true,
      //   changeOrigin: true
      // }
    }
  }
}
