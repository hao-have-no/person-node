//守护进程
// class 模块检测  自动重新在错误发生
var cluster = require('cluster'); //集群服务 调用一组node.js去处理负载任务 cluster模块可以创建共享服务器端口的子进程 负载均衡
var os = require('os'); //系统的信息
var numCPUs = os.cpus().length; //cpu数量

var process = require('process'); //进程

var workers = {};
  //检测其他进程状态
if (cluster.isMaster){
    //主进程
    console.log('cpu num',numCPUs);
    //检测其他进程状态
    //worker 问题进程  code 状态码 signal 系统信号
    cluster.on('exit',(worker,code,signal)=>{
        console.log('工作关闭',worker.process.pid);
        delete workers[worker.process.pid];
        //产生新的进程去进行干活
        console.log('sss',numCPUs,workers.length);
        worker = cluster.fork();
        workers[worker.process.pid] = worker;
    });

    //操作其他进程干活
    for (var i=0;i<numCPUs;i++){
        worker = cluster.fork(); //复制进程,执行cluster
        workers[worker.process.pid] = worker;
    }

    require('./test');
} else{
    //工作进程
    const app = require('./app');
    console.log('进程启动......');
    app.listen(3000,()=>{
    })

}

//进程监听
process.on('SIGTERM',()=>{
    //结束所有子进程并自杀
    for (var pid in workers){
        process.kill(pid);
    }
    process.exit(0);
})

