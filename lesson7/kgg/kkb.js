const Koa = require('koa');
const {initRouter,initController,initService} = require('./kkb-loader');


class kkb {
    constructor(conf){
        this.$app = new Koa(conf);
        this.$service = initService(); //初始化service,业务层
        //service 适配
        //controller+service的用法，通过柯里化提升
        this.$ctrl = initController(this);//先初始化控制器器，路由对它有依赖
        //
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
