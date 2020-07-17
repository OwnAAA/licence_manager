module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://api.lm.5c.work",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
}}
