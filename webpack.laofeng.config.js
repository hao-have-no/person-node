//webpack 配置文件
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin') //模版生成插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin') //文件清除插件
const miniCssExtractPlugin = require("mini-css-extract-plugin");　//将样式表抽离为单独的文件引用，而不是装载到style标签上

module.exports = {
    //　entry 入口文件 enter三种类型
    entry: "./src/index.js",

    // output
    output: {
        //指定输出资源的存放目录,必须是绝对路径
        path:path.resolve(__dirname,'./laofeng'),
        filename:"main.js"
    },

    mode:'development',
    resolveLoader: {
        modules: ["./node_modules","./myLoaders"] //指定寻找ｌｏａｄｅｒ的位置
    },
    module:{
        rules: [
            {
              test:/\.(png|gif|gpe?g)/,
                use:{
                    loader: "url-loader",
                    options: {
                        name:'[name].[ext]',
                        //打包后的存放位置
                        outputPath: "assets/images/",
                        limit:'3*1024' //限制图片大小，小于指定大小编码为ｂａｓｅ６４
                    }
                }
            },
            {
                //loader是有执行顺序的，自后往前，从右到左，从下到上
                test: /\.css$/,
                use: [miniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.less$/,
                use: ["styleLoader", "cssLoader", "lessLoader"],
            },
            {
                test: /\.js$/,
                use:[
                    "replaceLoader",
                    {
                        loader: "replaceLoaderAsync",
                        options: {
                            name:'haogege'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            template:"src/index.html",
            filename:"laofeng.html", //可以定制生成的目录
        }),
        new CleanWebpackPlugin(), //打包文件清理多余的垃圾文件
        new miniCssExtractPlugin({
            filename: "index.css",
        }),
    ]
};
