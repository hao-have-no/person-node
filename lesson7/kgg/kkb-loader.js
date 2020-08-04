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
        cb(filename,file);
    })
}


function initRouter(app){
    //router引入controller,适配对象工厂的柯里化形式
    //传递app实例进来


    const router = new Router();
    load('routes',(filename,routers)=>{
        //路由前缀规则
        const prefix = filename === 'index'?'':`/${filename}`

        //判断是否是函数
        // console.log('routers',routers);
        routers = typeof routers === 'function'?routers(app):routers;

        // 遍历路路由并添加到路路由器器
        Object.keys(routers).forEach(key=>{
            const [method,path] = key.split(' ');
            console.log('address',`${method.toLocaleUpperCase()} ${prefix}${path}`);

            // 执⾏行行router.method(path, handler)注册路路由
            // get('/user',async()=>{}) 路由处理
            router[method](prefix+path,routers[key])
        })
    })
    return router;
}



//对象 --->  对象工厂

function initController(){
    const controllers = {};
    load('controller',(filename,controller)=>{
        controllers[filename] = controller;
    })
    return controllers;
}


module.exports = {initRouter,initController}
