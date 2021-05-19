//启动webpack　进行构建
const webpack = require("./lib/webpack.js");
const options = require("./webpack.self.config.js");
//函数入口
// run是webpack打包流程中的生命周期，run是入口
new webpack(options).run();
