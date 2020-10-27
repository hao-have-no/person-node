## lesson4 webpack性能优化

### babel（与webpack没有多大关系） javascript 编译器
> env 面向未来的一种规范，不需要关注当前转化的语法处于什么状态
> use: {
                  loader:"babel-loader",
                  options:{
                      presets:['@babel/preset-env'] //借助插件来进行语法转换
                  }
              },  //babel 加@表示属于同一包下
              完成代码的转化，但是不满足低版本的适配，
              需要配置polyfill(.babelrc配置文件)(垫片)，进行低版本的语法兼容
              @babel　7.4版本以后　不推荐使用polyfill 直接使用core-js/stable就行

> polyfill 低版本浏览器兼容，搭配presets,来完成插件的配置

## dependencies生产依赖


## package.json/browserslist 常见的配置集
> dead: 碰到不维护的浏览器，服务死掉

## react语法解析

## babel 7以上，可以通过babelrc文件来配置babel的相关配置

## 插件系统作用在整个webpack的构建流程中 生命周期　生命周期钩子


### babel7版本以上引入polyfill时,后使用core.js的自动扫描转码会报错　原因在于babel7以后,core做了升级
　　不支持polyfill,如果使用会报错
