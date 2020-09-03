const webpack = require("./lib/webpack")
const options = require("./webpack.config.js");

new webpack(options).run();