### proyfill的升级，按需加载报错问题
> 从babel7.4开始，官⽅不推荐再使⽤@babel/polyfill了，因为@babel/polyfill本身其实就是两个npm包
 的集合：core-js与regenerator-runtime。
> 官⽅推荐直接使⽤这两个npm包。虽然@babel/polyfill还在进⾏版本升级，但其使⽤的core-js包为2.x.x
  版本，⽽core-js这个包本身已经发布到了3.x.x版本了，@babel/polyfill以后也不会使⽤3.x.x版本的包
  了。新版本的core-js实现了许多新的功能，例如数组的includes⽅法,数组的flat⽅法。必须安装并引⼊
  core-js@3版本才可以，否则Babel会转换失败并提示
> 可以先使用proyfill与corejs2进行搭配，babel升级以后，只需要升级corejs到3版本就可以  

## lesson5 手写迷你版webpack

### webpack打包原理分析(打包流程都干了些什么)
> 入口：从哪个文件进行解析
+ 那些是依赖模块，依赖模块的位置；
+ 处理入口文件内容，解析为浏览器能够识别的格式
+ 递归处理依赖模块，是否含有依赖，解析文件内容......

> 生成chunk(代码片段)
+ 补齐函数，生成bundle文件内容（启动器函数）
+ 为什么有启动器函数，因为解析完成的函数中有大部分定义是缺失的，需要通过启动器函数来补全这部分

> 出口 生成资源文件的名称和位置

### 手写webpack
> bundle 启动文件