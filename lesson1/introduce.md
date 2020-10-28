## lesson1 node 基础讲解及vue-cli

### 异步IO
> promisify,异步回调函数，封装同步操作为异步　
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
readFile('./conf.js').then(data=>console.log(data))

> Buffer缓冲区
+  用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。 八位字节组
成的数组，可以有效的在JS中存储二进制数据
+ 可以用于大文件上传，比如断点续传,切片上传

> Stream流:用于与node中流数据交互的接口
const rs2 fs.createReadStream('./01.jpg')
const ws2 = fs.createWriteStream('./02.jpg


### cli工具
> bin/kkb: 声明解析方式，cli的入口文件
> npm link(在对应的npm文件中进行关联):通过在package.json中的bin中声明入口方式，从而暴露全局，可以直接调用
> 命令行界面
> 实现init函数,完成脚手架的拷贝，依赖的安装，浏览器自启动功能

> 实现refresh函数,完成约定路由功能
+ 1.fs扫描文件夹，借用hbs模版函数,组装对应的文件


### npm 发布组件
>  chmod 777 publish.sh  赋予权限
