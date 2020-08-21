//webpack 配置文件
const path = require('path');

module.exports = {
    //　entry 入口文件 enter三种类型
    // entry: "./src/index.js",  SPA
    entry:{
      index:"./src/index.js",
        login:"./src/login.js"
    },

    // output
    output: {
        //指定输出资源的存放目录,必须是绝对路径
        path:path.resolve(__dirname,'./build'),
        // filename:"main.js" SPA
        filename:"[name].js"
    },

};
