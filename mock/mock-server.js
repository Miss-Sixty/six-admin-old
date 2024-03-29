const chokidar = require("chokidar"); //文件监控
const bodyParser = require("body-parser"); //块会处理application/x-www-form-urlencoded、application/json两种格式的请求体。
const chalk = require("chalk"); //控制台输出
const path = require("path");

const mockDir = path.resolve("mock");

function registerRoutes(app) {
  let mockLastIndex;
  const { default: mocks } = require("./index.js");
  for (const mock of mocks) {
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocks).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

module.exports = app => {
  // es6 polyfill
  require("@babel/register");

  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  const mockRoutes = registerRoutes(app);
  var mockRoutesLength = mockRoutes.mockRoutesLength;
  var mockStartIndex = mockRoutes.mockStartIndex;

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true
    })
    .on("all", event => {
      if (event === "change" || event === "add") {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          // clear routes cache
          unregisterRoutes();

          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;

          //console.log(chalk.blue(`> Mock服务热更新成功：${path}`));
        } catch (error) {
          console.log(chalk.redBright(error));
        }
      }
    });
};
