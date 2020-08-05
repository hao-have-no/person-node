const Koa = require('koa');
const {initRouter,initController,initService,loadConfig,initSchedule} = require('./kkb-loader');


class kkb {
    constructor(conf){
        this.$app = new Koa(conf);

        //加载数据库中间件及中间件工具
        loadConfig(this);

        //需要柯里化处理,因为带入了新的参数app
        //而app导入的话,原来的需要以函数的形式返回对象,所以进行了柯里化的提升

        //按照依赖关系依次loader
        //service+model 需要进行柯里化处理
        this.$service = initService(this); //初始化service,业务层
        //service 适配
        //controller+service的用法，通过柯里化提升
        this.$ctrl = initController(this);//先初始化控制器器，路由对它有依赖
        //router+service 引入中间件,对柯里化进行适配
        this.$router = initRouter(this); //将kkb实例传入
        this.$app.use(this.$router.routes());

        //增加定时任务
        initSchedule()
    }

    start(port){
        this.$app.listen(port,()=>{
            console.log(`服务启动:${port}`)
        })
    }
}

module.exports = kkb;
