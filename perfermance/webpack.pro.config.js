const {merge} = require("webpack-merge")

const commonConfig = require("./webpack.common.config.js")
const htmlwebpackPlugin = require("html-webpack-plugin")
const MinicssextractPlugin = require("mini-css-extract-plugin")
const optimizecss = require("optimize-css-assets-webpack-plugin")
const proConfig = {
    module:{
        rules:[
            {
                test:/\.less$/,
                // use:["style-loader","css-loader","postcss-loader","less-loader"]
                use:[MinicssextractPlugin.loader,"css-loader","postcss-loader","less-loader"]
            }
        ]
    },
    optimization:{
        usedExports:true
    },
    mode:"production",
    plugins:[
        new htmlwebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                minifyCSS:true
            }
        }),
        new MinicssextractPlugin({
            filename:"css/[name]_[contenthash:6].css"
        }),
        new optimizecss({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
        })
    ]
}


module.exports = merge(commonConfig,proConfig)