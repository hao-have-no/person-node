const path = require('path');
const htmlWebpackPlugin= require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MinicssextractPlugin = require("mini-css-extract-plugin");
const optimizecss = require("optimize-css-assets-webpack-plugin");

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
    module:{
      rules:[
          {
              test:/\.less$/,
              // use:[MinicssextractPlugin.loader,'style-loader','css-loader','postcss-loader','less-loader']
              use:[MinicssextractPlugin.loader,'css-loader','postcss-loader','less-loader']
          }
      ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename: 'index.html',
            //配置html文件的额外规则，比如移除注释
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                //内联的css压缩
                minifyCSS:true
            }
        }),
        //css另打包
        new MinicssextractPlugin({
            filename:"css/[name]_[contenthash:6].css"
        }),
        //压缩css
        new optimizecss({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
        })
    ]
}
