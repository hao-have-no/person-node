//简单使用koa,
//涉及责任链模式
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next)=>{
   const start = new Date();
   next();
   //next 表示执行下一个use(中间件)
    // 责任链，先执行哪个，依次执行
   const end = new Date();
   console.log(`请求${ctx.url},耗时${end-start}ms`);
});


app.use(async (ctx,next)=>{
    const expire = Date.now()+100;
    while(new Date() < expire){
        ctx.body={
            name:'TOM'
        }
    }
});

app.listen(4051);
