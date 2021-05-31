const {merge} = require("webpack-merge")
const htmlwebpackPlugin = require("html-webpack-plugin")
const commonConfig = require("./webpack.common.config.js")

// const path = require("path");
//不维护了 4可以用　5不太行
// const purifycss = require("purifycss-webpack");
// const glob = require('glob-all');

const devConfig = {
    devServer:{
        port:8080
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:["style-loader","css-loader","postcss-loader","less-loader"]
                // use:[MinicssextractPlugin.loader,"css-loader","postcss-loader","less-loader"]
            }
        ]
    },
    mode:"development",
    plugins:[
        new htmlwebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
        }),
        // new purifycss({
        //     //1.指定匹配的文件目录
        //     paths:glob.sync([
        //         path.resolve(__dirname,'./src/*.html'),
        //         path.resolve(__dirname,'./src/*.js')
        //     ])
        // })
    ]
}


module.exports = merge(commonConfig,devConfig)
