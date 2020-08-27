//webpack 配置文件
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin'); //模版生成插件
const glob = require('glob');

const setMpa = ()=>{
    const entry ={};
    const htmlWebpackPlugins = [];

    //扫描文件
    const entryFiles = glob.sync(path.resolve(__dirname,"./src/*/index.js"));

    //遍历提取指定元素
    entryFiles.map((item, index) => {
        const entryFile = item;
        const match = entryFile.match(/src\/(.*)\/index\.js$/);
        const pageName = match && match[1];
        console.log(pageName);

        entry[pageName] = entryFile;

        htmlWebpackPlugins.push(
            new htmlWebpackPlugin({
                template: path.join(__dirname, `./src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
            })
        );
    });

    console.log(entryFiles);
    return {entry,htmlWebpackPlugins};
};

const {entry,htmlWebpackPlugins} = setMpa();

module.exports = {
    //暗号:等价交换，炼金术不变的原则
    //　entry 入口文件 enter三种类型　　　
    entry,
    // output
    output: {
        //指定输出资源的存放目录,必须是绝对路径
        path:path.resolve(__dirname,'./dist'),
        filename:"[name].js"
    },

    mode:'development',

    plugins: [...htmlWebpackPlugins]
};
