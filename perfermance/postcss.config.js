//生产环境压缩代码
module.exports = {
    plugins:[
        require("autoprefixer")({
            overrideBrowserslist:["last 2 versions",">1%"]
        })
    ]
}
