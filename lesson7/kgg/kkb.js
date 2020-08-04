const Koa = require('koa');
const {initRouter,initController} = require('./kkb-loader');


class kkb {
    constructor(conf){
        this.$app = new Koa(conf);
        this.$ctrl = initController();//先初始化控制器器，路路由对它有依赖
        this.$router = initRouter(this); //将kkb实例传入
        this.$app.use(this.$router.routes());
    }

    start(port){
        this.$app.listen(port,()=>{
            console.log(`服务启动:${port}`)
        })
    }
}

module.exports = kkb;
