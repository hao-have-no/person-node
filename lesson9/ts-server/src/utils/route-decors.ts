import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as glob from 'glob';  //读取文件夹所需要

const router = new KoaRouter();

//路由方法
type HTTPMethod = 'get'|'post'|'delete'|'put';


// router.get(url,()=>{})

// export const get=(path: string)=>{
//     return (target,property)=>{
//         //target实际上是 get装饰器所在的User类
//         router.get(path,target[property])
//     }
// }


//这种写法：变量引用不透明,因为参数是通过作用域带进来的，比如router[method](path,target[property])
//比如router必须得有上面的声明才能使用，否则根本不知道哪里来的   函数不纯洁

// export const method = method=(path: string)=>{

//继续升阶  变为纯函数式引用
// router:KoaRouter 做语法检查，确认传入的router是准确的

//增加中间件机制，需要增加options参数
 const method =(router:KoaRouter) => (method: HTTPMethod) => (
     path: string ,
     options?:{middleware:Array<any>})=>{
    //返回一个装饰器，下面的参数是装饰器接受参数标准
    return (target,property)=>{
        //但是执行顺序的类装饰器先执行，但是装饰器中没有先后顺序的定义 属性装饰器先执行了，类装饰器就不执行
        // 所以导入nextTick方法， 先执行同步任务，在执行异步任务
        //先走声明的方法，然后再走装饰器的加载，从上往下
        // 也可以在这里面进行一个middleware的收集，在类装饰器里进行加载
        console.log(method,path,target,property);

        process.nextTick(()=>{
            console.log(method,path,target,property);
            //添加中间件数组
            const middlewares = [];

            if (target.middlewares){
                middlewares.push(...target.middlewares);
            }

            if (options&&options.middleware){
                middlewares.push(...options.middleware);
            }

            middlewares.push(target[property]);

            //target实际上是 get装饰器所在的User类
            //target[property] 指定的是对应的publish回调方法，eg：list属性
            console.log(middlewares);

            router[method](path,...middlewares) //...middlewares 平铺 全部执行
        })
    }
};

 const decorate = method(router);

export const get = decorate('get');
export const post = decorate('post');

//不方便，直接升阶，传入参数来生成函数  变为对象工厂
// export const post=(path: string)=>{
//     return (target,property)=>{
//         //target实际上是 get装饰器所在的User类
//         router.post(path,target[property])
//     }
// }

export const load = (folder:string):KoaRouter=>{
    //扫秒当前文件所在指定路径下的相关文件
    //调用对应的route文件，加载装饰器，生成router
    //文件解析方位
    const LoadOptions =".{js,ts}";
    glob
        .sync(require("path").join(folder,`./**/*${LoadOptions}`)) //扫描文件
        .forEach(item=>require(item))

    return router
}

//middlewares:Koa.Middleware 限定类型
//类装饰器，绑定到类上
export const middlewares = (middlewares:Koa.Middleware) =>{
    return function (target){
        console.log('123');
        target.prototype.middlewares = middlewares;
    }
}