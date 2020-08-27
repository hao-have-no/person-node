## lesson3 开发环境构建2 

### babel
> postcss-babel 自动添加前缀　　移动端  rem-->px

### sourceMap  开发环境　调试　　定位错误信息
> devtool:"cheap-module-eval-source-map",// 开发环境配置
//线上不推荐开启
> devtool:"cheap-module-source-map", // 线上⽣成配置
> https://webpack.docschina.org/configuration/devtool/#development 
详解sourceMap在开发和生产环境的优缺点  eg: evel加快代码的查询


### webpackDevServer
> 热更新

>devServer: {
      contentBase: "./dist",
      open: true,
      port: 8082,
      hotOnly:true //不会刷新浏览器
    },

### 
