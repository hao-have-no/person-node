const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const wechat = require('co-wechat');
const app = new Koa();
const config = require('./conf');
const axios = require('axios');
app.use(bodyParser())
const router = new Router()
app.use(static(__dirname + '/'))

//第三方库完成微信的相关操作
const wechatAPI = require('co-wechat-api');
//持久化
const {ServerToken} = require('./mongoose');
const api = new wechatAPI(config.appid,config.appsecret,async ()=>{
    //获取token
    return await ServerToken.findOne()
},async (token)=>{
    //存储token
    //upsert:true 如果不存在的话会创建
    //{}只是有一条数据,如果是正式公众号的话,会在里面在openid作为唯一标识
    const res = await ServerToken.updateOne({},token,{upsert:true})
    }

    );

//所有的这个请求都走这个中间件进行处理
router.all('/wechat',wechat(config).middleware(
    async message=>{
        console.log('wechat',message);
        return 'Hello world'+message.Content||' wa ka ka';
    }
));

//公众号API使用
//获取微信令牌
const tokenCache = {
    access_token: '',
    updateTime: Date.now(),
    expires_in: 7200,
};

//获取token后，可以调用各种微信api
// router.get('/getTokens',async ctx=>{
//     const wxDomain = `https://api.weixin.qq.com`;
//     const path = `/cgi-bin/token`;
//     const params = `?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`;
//     const url = `${wxDomain}${path}${params}`;
//     const res = await  axios.get(url);
//     Object.assign(tokenCache,res.data,{updateTime:Date.now()});
//     ctx.body = res.data;
// });

//获取用户列表
// router.get('/getFollowers',async ctx=>{
//     const wxDomain = `https://api.weixin.qq.com`;
//     const path = `/cgi-bin/user/get`;
//     console.log('token',tokenCache.access_token);
//     const params = `?access_token=${tokenCache.access_token}`;
//     const url = `${wxDomain}${path}${params}`;
//     const res = await axios.get(url);
//     console.log('log',res.data);
//     ctx.body = res.data;
// })

//使用第三方微信库来完成微信的相关操作
//co-wechat-api库
// 内部封装了对token的获取

//使用mongo_db完成多服务器下token的状态保存
router.get('/getFollowers',async ctx=>{
  let res = await api.getFollowers();
  //获取患者信息,根据openid
  res = await api.batchGetUsers(res.data.openid,'zh_CN');
  console.log('res',res)
  ctx.body = res;
})



app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());　//路由中间件执行后的异常处理操作
app.listen(8011);
