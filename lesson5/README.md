启动mongodb
> sudo service mongodb stop 　　sudo service mongodb start

>异步多任务串行  观察者模式 once 与 eventLoop的实际联系
+ 1.db.js中connect是一个异步事件  once是一个同步事件
+ 2.事件执行机制:一定会将所有的同步事件执行
+ 3.一定先走initDb中的once函数,函数内部先不执行,先订阅完成
+ 4.只有connect走完,才会走下一个  先走同步,再走异步(宏任务和微任务)


>mongoose 数据库中间件
+ 1.scheme 定义模型/模式
+ 2.编译model 相当于建立connection
+ 3.借助中间件定义流程,即mongoose出现,完成通过后端模型(领域模型),数据库只提供服务

> 持久化: 通过后端模型生成持久化服务  全栈无编码  通过约定来完成代码的操作
> 模型->crud api
