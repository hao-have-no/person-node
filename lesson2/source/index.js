// const http = require('http');
//
// const server = http.createServer((req, res) =>{
//     res.statusCode = 200;
//     res.end('hello kaikeba');
// });
//
// server.listen(4052,()=>{
//     console.log('监听端口 3000');
// });

//koa实现
// 1.封装多余的逻辑，抽离出来
// eg:use方法可以实现createServer方案，
// 里面的具体业务以callback来实现
//逻辑抽离框架之外

//封装后的样子
const KKB = require('./kkb');
// const redisStore = require('koa-redis');
const app = new KKB();

// 普通的koa用法
// app.use((req,res)=>{
//     res.statusCode = 200;
//     res.end('hi kaikeba');
// });
// app.use(ctx=>{
//     ctx.body = 'hahha';
// })


// compose函数聚合
// const delay = () => new Promise(resolve => setTimeout(() => resolve() ,2000));
// app.use(async (ctx, next) => {
//     ctx.body = "1";
//     await next();
//     ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//     ctx.body += "2";
//     await delay();
//     await next();
//     ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//     ctx.body += "3";
// });


//router使用
const Router = require('./router')
const router = new Router();

router.get('/index',async ctx =>{ctx.body = 'index page';});
router.get('/post', async ctx =>{ctx.body = 'post page';});
router.get('/list', async ctx =>{ctx.body = 'list page'; });
router.post('/index', async ctx =>{ctx.body = 'post page'; });

// 路由实例输出父中间件 router.routes()
app.use(router.routes());

app.listen(4052,()=>{
    console.log('监听端口 4052;');
});
