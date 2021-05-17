//webpack 配置文件  webpack环境搭建1
const path = require('path');

// module.exports = {
//     //　entry 入口文件 enter三种类型
//     // entry: "./src/index.js",  SPA
//     entry:{
//       index:"./src/asset/index1.js",
//         login:"./src/asset/login.js"
//     },
//
//     // output
//     output: {
//         //指定输出资源的存放目录,必须是绝对路径
//         path:path.resolve(__dirname,'./build'),
//         // filename:"main.js" SPA
//         filename:"[name].js"
//     },
//
// };


// webpack 性能优化
// const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
// const webpack = require("webpack");
const textWebpackPlugin = require("./myPlugins/text-webpack-plugins");

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    mode: "development",
    // resolveLoader: {
    //     modules: ["./node_modules", "./myLoaders"],
    // },
    module: {
        rules: [
            {
                test: /.(png|jpe?g|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "assets/images/",
                        limit: 3 * 1024, //对小体积的资源图片进行管理，小图片转成base64,减少请求数量
                    },
                },
            },
            {
                test: /\.(eot|woff)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                },
            },
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /.less$/,
                use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
            },


            // babel-loader 对js的兼容
            {
              test: /\.js$/,
              use: "babel-loader"
            //
            //
            //   // babel 的配置使用　　另外一种是babelrc文件
            //       {
            //       loader:"babel-loader",
            //       options:{
            //           presets:[
            //               ['@babel/preset-env',
            //                   {
            //                       targets:{
            //                       edge:'16',
            //                       firefox:'60',
            //                       chrome:'67'
            //                   },
            //                   corejs:2, //babel新版本特性，需要和useBuiltIns 搭配使用 目前兼容到corejs3
            //                   useBuiltIns:"entry",
            //                   //按需加载　需要在webpack的入口文件(./src/index.js)中动态引入
            //
            //                   // useBuiltIns:"usage",
            //                   // usage 全自动检测，动态引入，不需要声明
            //               },
            //               ],
            //               "@babel/preset-react" //react解析
            //           ],
            //           //借助插件来进行语法转换
            //           //通过[[],{}] 可以对preset-env 进行插件设置
            //       }
            //   },  //babel 加@表示属于同一包下
            },
        ],
    },

    devServer: {
        contentBase: "./dist",
        open: true,
        port: 8080,
        proxy: {
            "/api": {
                target: "http://localhost:9092",
            },
        },
        //浏览器刷新功能关闭
        hot: true,
        hotOnly: true,
    },
    devtool: "cheap-module-eval-source-map",
    plugins: [
        new htmlwebpackplugin({
            template: "./src/asset/index.html",
            filename: "index.html",
        }),
        //使用自己的plugins
        new textWebpackPlugin({
            name:'laohan'
        }),
        // new webpack.HotModuleReplacementPlugin(),
    ],
};
