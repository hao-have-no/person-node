## 使用ts 装饰器 sequelize 注意类型定义  每一个xxx对应一个types/xx 完成对类型的转化

## 自动化部署  dockers  node.js  nginx

### docker使用
> 部署方便  规范

### Nginx 静态资源location 负载均衡pm2

### node环境解决问题
> 故障恢复
> 多核利用
> 多进程共享端口

### cluster 多个进程对应一个端口 进程守护
####　更加广泛使用的是　pm2

### pm2
> 负载均衡　cluster 子进程(fork模式)
> keep-alive 守护进程
> 终止不稳定进程

+ pm2 app.js --watch -i 2　　启动

npm install -g pm2
pm2 start app.js --watch -i 2// watch 监听文件变化// -i 启动多少个实例
pm2 stop allpm2 list
pm2 start app.js -i max # 根据机器CPU核数，开启对应数目的进程

+ pm2 监听  先登录pm2根据提示进行绑定


### nginx反向代理＋前端打包dist
> 静态服务
> 反向代理

### docker
> docker 可以将每个服务都挂到一个容器上（进程上）


### 负载均衡ＳＬＢ　动态调配资源
> slb文件夹中配置多个服务器，dockerfile映射对应的地址，并配置服务器资源
>sudo docker-compose up

> 四层　　传输层　　负载均衡　　tcp/ip转发
> 七层　　应用层　　负载均衡　　ｎｇｉｎｘ　ｓｌｂ负载均衡

> nginx负载均衡
+ 轮询　　每个请求按照时间顺序，注意分配不同的服务器
+ ip_bash  按照ｉｐ的hash结果进行分配，每个客户端对应一个后端服务器
+ url_bash 根据ｕｒｌ的ｈａｓｈ来分配对应的后端服务器
+ fire　根据相应时间

### docker_cli  完成前后端的部署
1. 配置setting 配置文件　定位发布服务器的存放地址
2. 配置docker.yml 配置构建的打包地址，来源地址，所有的镜像地址
3. 编译deploy-dev.sh 配置启动命令　docker-compose启动整体并更新
4. 自动cli,持续继承　　一旦提交代码，自动进行线上部署　webhocks: run_cmd 自动拉取代码并且部署



lesson10:docker与nginx进行前后端项目部署
  1. nginx 静态部署，反向代理　　pm2　线程守护，负载均衡　　slb　负载均衡的实现　　mongo　持久化　　　实现以上的使用
  2. docker　容器技术　每个服务都是单独的容器服务　　手写自己的定制化容器服务　　dockerFile的使用
  3. docker-compose 定制化docker集群部署　同时操作多台服务器
  4. webhooks 与github,git进行热链接　　通过监听代码库状态来进行动态部署　
  5. deploy-cli 持续化部署　强制对容器一些处理
  6. 继续部署的配置文件说明： 
        vscode/setting  deploy 在本地开发的时候实时更新　targets　配置服务器连接
        backend/process  后台进程守护
        frontend/dockerFile 前端打包流程
        nginx/conf.d／＊＊＊conf nginx　反向代理配置文件
        deploy-dev　cli持续的打包构建　主要用于对docker处理
        docker-compose 　docker集群部署 主要是对镜像的引用
        ssh-deploy 构建后端的脚本　启动相关镜像和服务
        webhooks: 源码库热链接，用于代码更新后的自动部署
        
  7. 以上具体的使用过程在有道云笔记有所记录
