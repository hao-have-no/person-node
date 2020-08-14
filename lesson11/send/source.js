const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const xml2js = require('xml2js') //xml 转化为 json
const app = new Koa()
const url = require('url')
const conf = require('./conf')


const crypto = require('crypto')
const xmlParser = require('koa-xml-body')
app.use(xmlParser())

const router = new Router()
app.use(static(__dirname + '/'))

// 验证
//微信会发两种类型的校验

router.get('/wechat', ctx => {
    console.log('微信认证...', ctx.url)
    const {
        query
    } = url.parse(ctx.url, true)
    const {
        signature, // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
        timestamp, // 时间戳
        nonce, // 随机数
        echostr // 随机字符串
    } = query
    console.log('wechat', query)

    // 将 token timestamp nonce 三个参数进行字典序排序并用sha1加密

    //我们自己的token 时间戳　微信带的nonce随机数
    let str = [conf.token, timestamp, nonce].sort().join('');
    console.log('str', str)
    //进行sha1 hash 运算　等到的密文　和发过来的签名进行比对
    let strSha1 = crypto.createHash('sha1').update(str).digest('hex');

    console.log(`自己加密后的字符串为：${strSha1}`);
    console.log(`微信传入加密字符串为：${signature}`);
    console.log(`两者比较结果为：${signature == strSha1}`);

    // 签名对比，相同则按照微信要求返回echostr参数值
    if (signature == strSha1) {
        ctx.body = echostr
    } else {
        ctx.body = "你不是微信"
    }
})

// 接受信息
router.post('/wechat', ctx => {
    const {
        xml: msg
    } = ctx.request.body
    console.log('Receive:', msg)
    const builder = new xml2js.Builder();
    //解析为json 处理后　　以xml的方式　回复给微信
    const result = builder.buildObject({
        xml: {
            ToUserName: msg.FromUserName,
            FromUserName: msg.ToUserName,
            CreateTime: Date.now(),
            MsgType: msg.MsgType,
            Content: 'Hello ' + msg.Content
        }
    })
    ctx.body = result
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8011);
