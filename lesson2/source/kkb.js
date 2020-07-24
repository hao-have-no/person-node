const http = require('http');

//将所有的值引进来
const context = require("./context");
const request = require("./request");
const response = require("./response");

//简化API,引入context上下文概念,通过get/set

class KKB {
    constructor(){
        this.middlewares = [];
    }

    listen(...args){
        const server = http.createServer(async(req,res)=>{
            //BL
            // this.callback(res,req);

            //进一步优化，创建上下文环境
            const ctx = this.createContext(req,res);

            //中间件合成
            console.log('this.middlewares',this.middlewares);
            const fn = this.compose(this.middlewares);
            console.log('fn',fn);

            //执行
            await fn(ctx);

            // this.callback(ctx);
            //响应结果
            res.end(ctx.body);
        });

        server.listen(...args);
    }

    // use(callback){
        // this.callback = callback;
        //多方法聚合
    use(middleware){
        console.log('use middleware',middleware);
        this.middlewares.push(middleware)
    };
    // }

    //构建上下文
    //分层每一步的获取方式，通过相互连接关联，构建关系
    createContext(req,res){
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);
     //进行挂载关联
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
    //使用compose进行函数聚合,middleware是函数的集合
    //ctx是参数
    compose(middleware){
        //引入上下文
        return function (ctx) {
            return dispatch(0); //初始化调用
            function dispatch(i){
                let fn = middleware[i];
                if (!fn){
                    return Promise.resolve();
                } else{
                    return Promise.resolve(
                        fn(ctx,function next() {
                            return dispatch(i+1)
                        })
                    )
                }
            }
        }
    }
}

module.exports = KKB;
