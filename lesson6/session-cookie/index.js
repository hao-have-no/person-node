const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa();
//配置session的中间件

//设置跨域
app.use(cors({
    credentials: true
}))

// 过程回顾：
// 用户登录的时候，服务端生成一个唯一的会话标识，并以它为key存储数据
// 会话标识在客户端和服务端之间通过cookie进行传输
// 服务端通过会话标识可以获取到会话相关的信息，然后对客户端的请求进行响应；如果找不到有效的会话，那么认为用户是未登陆状态
// 会话会有过期时间，也可以通过一些操作（比如登出）来主动删除

app.keys = ['some secret'];

app.use(static(__dirname + '/')); //加载本地文件

app.use(bodyParser())

//放入加密
app.use(session(app));

app.use((ctx, next) => {
    if (ctx.url.indexOf('login') > -1) {
        next()
    } else {
        console.log('session', ctx.session.userinfo)
        if (!ctx.session.userinfo) {
            ctx.body = {
                message: "登录失败"
            }
        } else {
            next()
        }
    }
})
router.post('/users/login', async (ctx) => {
    const {
        body
    } = ctx.request
    console.log('body',body)
//设置session
    ctx.session.userinfo = body.username;
    ctx.body = {
        message: "登录成功"
    }
})
router.post('/users/logout', async (ctx) => {
//设置session
    delete ctx.session.userinfo
    ctx.body = {
    message: "登出系统"
}
})
router.get('/users/getUser', async (ctx) => {
    ctx.body = {
        message: "获取数据成功",
        userinfo: ctx.session.userinfo
    }
})
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
