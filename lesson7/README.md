## egg.js 企业级node框架  三层结构

### 三层架构
>eg: modifyPsw __> 判断用户是否过期__>用户表模型

### 基于约定的路由  约定优于配置  通过配置controler和router  自动生成映射关系


### egg引入外部工具,基于插件的形式
> 需要在config/plugin 中引入对应的插件
> 在config/config.default中书写对应的配置

### next.js与egg.js
> next.js比较好用 egg更是一个的底层


### 自定义三层结构
> 定义路由规范
+ 所有路路由，都要放在routes⽂文件夹中
+ 若导出路路由对象，使⽤`用动词+空格+路径`作为key，值是操作方法
+ 若导出函数，则函数返回第⼆条约定格式的对象
+ 注意函数的柯里化和中间件的使用


#### 定时任务
+ crontab  用crontab来启动定时  一种linux的编译语言

### egg.js补充
> egg-router-group 路由分组管理
> egg-mongoose mongoDb数据库驱动
> egg-validate 数据校验
> md5 二次加密　　jsonwebtoken 加密解密
