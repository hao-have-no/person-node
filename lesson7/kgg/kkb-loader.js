const fs =require('fs');
const path = require('path');
const Router = require('koa-router');

//自动读取文件夹
function load(dir,cb){
    //获取绝对路径
    const url = path.resolve(__dirname,dir);
    //读取路径下的文件
    const files = fs.readdirSync(url);

    //遍历路由文件,将路由配置解析到路由中
    files.forEach(filename=>{
        filename = filename.replace('.js','');
        //导入文件
        const file = require(url+'/'+filename)
        //处理文件

        ///model/user.js  filename:user file:user.js文件内容
        cb(filename,file);
    })
}


function initRouter(app){
    //router引入controller,适配对象工厂的柯里化形式
    //传递app实例进来


    const router = new Router();
    load('routes',(filename,routers)=>{
        //路由前缀规则
        const prefix = filename === 'index'?'':`/${filename}`;

        //判断是否是函数
        // console.log('routers',routers);
        routers = typeof routers === 'function'?routers(app):routers;

        // 遍历路路由并添加到路路由器器
        Object.keys(routers).forEach(key=>{
            const [method,path] = key.split(' ');
            console.log('address',`${method.toLocaleUpperCase()} ${prefix}${path}`);

            // 执⾏行行router.method(path, handler)注册路路由
            // get('/user',async()=>{}) 路由处理

            //制定service自动加载时，出现router+service的组合，需要进一步添加中间件处理

            router[method](prefix+path, async ctx=>{
                app.ctx= ctx; //挂在到app上
                await routers[key](app); //路由器接受的是app   因为后续的操作  会相互用到controller，service
            })
        })
    });
    return router;
}



//对象 --->  对象工厂
//controller+service  需要引入app  进行柯里化提升
function initController(app){
    const controllers = {};
    load('controller',(filename,controller)=>{
        controllers[filename] = controller(app);
    })
    return controllers;
}

//加载service
function initService(app){
const services = {};
load('service',(filename,service)=>{
    //添加服务
    services[filename] = service(app);
});
return services;
}

//加载数据
const Sequelize = require('sequelize')

//加载数据库配置文件和对应的数据库模型
function loadConfig(app){
    load('config',(filename,conf)=>{
        if (conf.db){
            console.log('loader db');

            //实例化数据库
            app.$db = new Sequelize(conf.db);

            app.$model = {};
            //加载数据库模型
            load('model',(filename,{scheme,options})=>{
                app.$model[filename] = app.$db.define(filename,scheme,options)
            });

            //同步数据库
            app.$db.sync();
        }

        if (conf.middleware){
            conf.middleware.forEach(mid=>{
                const midPath = path.resolve(__dirname,"middleware",mid);
                app.$app.use(require(midPath));
            })
        }
    })
}

const schedule = require('node-schedule')
//增加定时任务
function initSchedule() {
    load('schedule', (filename, scheduleConfig) => {
        schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
    })
}

module.exports = {initRouter,initController,initService,loadConfig,initSchedule}
