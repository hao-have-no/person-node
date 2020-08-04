## lesson6 node 鉴权

### 常用的鉴权方式
+ session/cookie
+ token
+ OAuth(录播)
+ SSO(录播)

### hash  sha md5
+ 把一个不定长的摘要为定长结果
+ 摘要
+ 雪崩效应

> 为什么要将session存储在外部存储中
+ Session信息未加密存储在客户端cookie中
+ 浏览器cookie有长度限制

> session不足
+ 服务器有状态
+ 不灵活如果APP该怎么办 跨域怎么办

> token 怎么使用 在存在的时候
```
axios.interceptors.request.use(
    config => {
     const token = window.localStorage.getItem("token");
        if (token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            // Bearer是JWT的认证头部信息
            config.headers.common["Authorization"] = "Bearer " + token;
        }
    return config;
    },
    err => {
    return Promise.reject(err);
    }
);
```

##与Token简单对比
+ session要求服务端存储信息，并且根据id能够检索，而token不需要（因为信息就在token
  中，这样实现了服务端无状态化）。在大规模系统中，对每个请求都检索会话信息可能是一
  个复杂和耗时的过程。但另外一方面服务端要通过token来解析用户身份也需要定义好相应
  的协议（比如JWT）。
+ session一般通过cookie来交互，而token方式更加灵活，可以是cookie，也可以是
  header，也可以放在请求的内容中。不使用cookie可以带来跨域上的便利性。
+ token的生成方式更加多样化，可以由第三方模块来提供。
+ token若被盗用，服务端无法感知，cookie信息存储在用户自己电脑中，被盗用风险略小。

### JWT(JSON WEB TOKEN)原理解析
> 1. Bearer Token包含三个组成部分：令牌头、payload、哈希

> 第三个参数（hash）
+ 1. 签名：默认使用base64对payload编码，使用hs256算法对令牌头、payload和密钥进行签名生成
哈希
+ 2. 验证：默认使用hs256算法对hs256算法对令牌中数据签名并将结果和令牌中哈希比对

### Beare
+ Beare作为一种认证类型(基于OAuth 2.0)，使用"Bearer"关键词进行定义
+ 参考文档：
+ jsonwebtoken、koa-jwt
+ 阮一峰 JWT解释
+ http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

### OAuth(开放授权)
> 概述：三方登入主要基于OAuth 2.0。OAuth协议为用户资源的授权提供了一个安全的、开放而又
简易的标准。与以往的授权方式不同之处是OAUTH的授权不会使第三方触及到用户的帐号信息
（如用户名与密码），即第三方无需使用用户的用户名与密码就可以申请获得该用户资源的授权，
因此OAUTH是安全的。

