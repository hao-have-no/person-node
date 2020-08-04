const koa = require("koa");
const app = new koa();
const session = require("koa-session");

app.keys = ['some secret'];
//用于后续的算法，eg：hash算法

const SESS_CONFIG={
    key:'kkb:sess',
    maxMge:86400000,
    httpOnly: true,//只允许服务器设置
    signed:true
};

app.use(session(SESS_CONFIG,app)); //使用配置

//测试
app.use(ctx=>{
    if (ctx.path .includes('favicon'))return;

    //获取session  引入中间间 会生成对应的session
    console.log('111');
    let n = ctx.session.count||0;
    //设置
    ctx.session.count = ++n;
    ctx.body=`第${n}次`
});

app.listen(3000);