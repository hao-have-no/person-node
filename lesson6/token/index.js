const Koa = require('koa')
const router = require('koa-router')()
const jwt = require("jsonwebtoken")
const jwtAuth = require("koa-jwt")
const secret = "it's a secret" //签名秘钥 token jwt 合成令牌使用
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa();

app.keys = ['some secret']; //秘钥 session

app.use(static(__dirname + '/'));
app.use(bodyParser())
router.post("/users/login-token", async ctx => {
    const { body } = ctx.request;
    //验证
    //鉴权
    const userinfo = body.username;
    ctx.body = {
        message: "登录成功",
        user: userinfo,
// 生成 token 返回给客户端
        token: jwt.sign(
            {
                data: userinfo,
// 设置 token 过期时间，一小时后，秒为单位
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            },
            secret
        )
    };
});
router.get(
    "/users/getUser-token",
    //验证秘钥是否一致
    jwtAuth({
        secret
    }),
    async ctx => {
// 验证通过，state.user
        //jwtAuth做校验时，会将请求中的user信息拿出来放到ctx.state中
        console.log(ctx.state.user);
//获取session
        ctx.body = {
            message: "获取数据成功",
            userinfo: ctx.state.user.data
        };
    }
);
app.use(router.routes());