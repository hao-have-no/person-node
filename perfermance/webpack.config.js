const path = require('path');
const htmlWebpackPlugin= require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports = {
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'[name].js'
    },
    mode:'development',
    devServer:{
        port:8080
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename: 'index.html'
        })
    ]
}
