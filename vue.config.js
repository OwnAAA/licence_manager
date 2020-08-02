module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://api.lm.5c.work",
        // target: "http://localhost:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
}}
