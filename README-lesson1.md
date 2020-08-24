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


### chunk　代码片段，由入口文件和依赖文件生成
　　　＞　值得是webpack处理后的每个文件的代码块
　　　＞ｅｇ：ｍａｉｎ.js的75行
    > webpack打包时输出的chunks:main  值得就是chunk的合集
    >entry对象形式＋outpue.filename的name占位符　来完成多入口的打包
    
    > ＳＰＡ下bundle和chunk是一对一的，　chunk和entｒｙ 是一对一，ｅｎｔｒｙ与ｍｏｄｕｌｅ是一对多（存在依赖关系）
　　　＞mpa下bundle和chunks是一对一的   chunk和entｒｙ 是一对一，ｅｎｔｒｙ与ｍｏｄｕｌｅ是一对多（存在依赖关系）
### module　模块，基于ｎｏｄｅ，一切都是模块，模块化开发

### bundle　打包后输出到资源目录的文件，构建成功后的资源文件
    > 就是main.js  由chunk＋webpackBootstrap构成



### loader  模块转化　浏览器只识别js,不识别css,img,json这些模块，所以需要转义　　
    >　在module配置对各种文件的解析器（loader）;

### plugin　webpack构建的扩展插件

