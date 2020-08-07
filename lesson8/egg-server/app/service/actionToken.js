'use strict'
const Service = require('egg').Service

//用于签发token
class ActionTokenService extends Service
{
    async apply(_id)
    {
        const {ctx} = this;
        //进行签发sign签名
        return ctx.app.jwt.sign({
            data: {_id: _id},
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        }, ctx.app.config.jwt.secret) //最后增加秘钥
    }
}
module.exports = ActionTokenService
