### webpack 介绍   node 8
> webpack 优化：tree-shaking code spliting  懒加载　source map
> 增量编译和按需清空(优化)


1. 推荐项目安装，可以适应对应的项目,全局安装对项目不友好

2. webpack4 需要安装webpack-cli webpack  webpack3 较稳定

3. webpack可以构建类似esm ts 等新型文件 
   默认入口　/src/index.js
   
4. webpack 自定义配置文件  webpack默认会扫描文件下有没有webpack.config ,
   如果没有的话就使用默认的webpack(v4，V4以下必须创建配置文件文件)
5. webpack　打包后的main.js是一个自适应函数，传入的是访问的引用关系和webpack打包后的eval方法，
　　而eval方法运行中缺失的函数在闭包内部补齐，进行声明相关的声明

6. webpack --config ./webpack.laofeng.config.js 自定义使用webpack配置文件


## webpack 核心概念
### entry 构建入口文件，默认为./sec/index.js  可以通过entry进行修改

### output  资源打包后的输出位置和名称

### mode　　构建模式　常见dev:不压缩代码，便于调试　　　prd生产模式:压缩文件


### chunk　代码片段， 
　　　＞　值得是webpack处理后的每个文件的代码块
　　　＞ｅｇ：ｍａｉｎ.js的75行
    > webpack打包时输出的chunks:main  值得就是chunk的合集
    >entry对象形式＋outpue.filename的name占位符　来完成多入口的打包
    
    > ＳＰＡ下bundle和chunk是一对一的，　chunk和entｒｙ 是一对一，ｅｎｔｒｙ与ｍｏｄｕｌｅ是一对多（存在依赖关系）
　　　＞mpa下bundle和chunks是一对一的   chunk和entｒｙ 是一对一，ｅｎｔｒｙ与ｍｏｄｕｌｅ是一对多（存在依赖关系）
### module　模块，基于ｎｏｄｅ，一切都是模块，模块化开发

### bundle　打包后输出到资源目录的文件，构建成功后的资源文件
    > 就是main.js  由chunk＋webpackBootstrap(补全chunk中的函数)构成



### loader  模块转化　浏览器只识别js,不识别css,img,json这些模块，所以需要转义　　
    >　在module配置对各种文件的解析器（loader）;

### plugin　webpack构建的扩展插件



### 20210511

### 多入口文件
 entry: {
      main:path.resolve(__dirname,'../src/main.js'),
      header:path.resolve(__dirname,'../src/header.js')
  }, 
    output: {
      filename: '[name].[hash:8].js',      // 打包后的文件名称
      path: path.resolve(__dirname,'../dist')  // 打包后的目录
    },
    plugins:[
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html'),
        filename:'index.html',
        chunks:['main'] // 与入口文件对应的模块名
      }),
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/header.html'),
        filename:'header.html',
        chunks:['header'] // 与入口文件对应的模块名
      }),
    ]


### 优化webpack配置
> 优化打包速度
+  合理的配置mode参数与devtool参数，从而区分什么时候要进行特殊处理,
eg:　mode = production开始 tree shaking(去除无用代码)和uglifyjs(代码压缩混淆)
+  缩小文件的搜索范围
eg： webpack.config.js中配置alias:
alias:{
    'vue$':'vue/dist/vue.runtime.esm.js',
    '@':path.resolve(__dirname,'src/assets/icons'),
    'assets':resolve('src/assets'),
    'components':resolve('src/components')
}
eg: 
include exclude 同样配置include exclude也可以减少webpack loader的搜索转换时间。
增加noParse属性,告诉webpack不必解析，以此增加打包速度。

module:{
        noParse:'jquery',
       rules:[{
        test:'/\.vue$/',
        loader:'vue-loader',
        includes:[path.resolve(__dirname,'src')],
        exclude:/node_modules/
    }]
    }
+ HappyPack开启多进程Loader转换
why?在webpack构建过程中，实际上耗费时间大多数用在loader解析转换以及代码的压缩中。
基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间

+ 使用webpack-parallel-uglify-plugin 增强代码压缩

+ 配置缓存
why? 构建都会把所有的文件都重复编译一遍,重复工作是否可以被缓存下来,增加执行效率
目前大部分 loader 都提供了cache 配置项。
eg: 比如在 babel-loader 中，可以通过设置cacheDirectory 来开启缓存，
babel-loader?cacheDirectory=true 就会将每次的编译结果写进硬盘文件
（默认是在项目根目录下的node_modules/.cache/babel-loader目录内)

> 优化打包文件体积
+ webpack-bundle-analyzer分析打包后的文件
eg:
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
plugins:[
    new BundleAnalyzerPlugin({
        analyzerHost:'127.0.0.1',
        analyzerPort:'8089'
    })
]

package.json里配置启动命令
"analyz": "cross-env NODE_ENV=production npm_config_report=true npm run build" 

npm run analyz浏览器会自动打开文件依赖图的网页

+ externals: 引用一个库，但是又不想让webpack打包,不影响我们cmd,amd的使用
将这些不需要打包的静态资源从构建逻辑中剔除出去，而使用 CDN 的方式，去引用它们
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>

module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
};

import $ from 'jquery';

+ Tree-shaking : 用来清除代码中无用的部分
webpack4 我们设置mode为production的时候已经自动开启了tree-shaking。
但是要想使其生效，生成的代码必须是ES6模块
在使用babel时, 因为Babel的预案（preset）默认会将任何模块类型都转译成CommonJS类型
导致tree-shaking失效。修正这个问题也很简单，
在.babelrc文件或在webpack.config.js文件中设置modules： false就好了
