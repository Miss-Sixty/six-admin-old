const { resolve } = require("path");

module.exports = {
  publicPath: "/",
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    before: require("./mock/mock-server.js")
  },
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
