### ts 装饰器  手写
 
> 搭建环境
>npm i typescript ts-node-dev tslint @types/node -D 
+ ts-node-dev 服务器脚本
+ @types/node 数据类型定义

> 装载koa 
+ npm i koa koa-static koa-body koa-xtime -S

> 实现最基础的ts的koa服务器 src/index

> ts装饰器实现路由的定义及约定
+ 函数柯里化 实现函数的嵌套实现

> aop切面 方式   有几种实现
+ aop是啥:
+ 几种实现: 中间件 装饰器

> 以中间件的形式来实现aop 借助装饰器
> 装饰器先后顺序： 属性装饰器先执行  类装饰器后执行  需要借助process.nextTick 来重新定义执行顺序

> 数据库整合
