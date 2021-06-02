//相关的令牌派发,校验等
'use strict'

const Service = require('egg').Service

class UserAccessService extends Service {
    async login(payload) {
        const {ctx, service} = this;
        //验证账户是否存在
        const user = await service.user.findByMobile(payload.mobile)
        if (!user) {
            ctx.throw(404, 'user not found')
        }

        //用该用户的话,判断密码是否一致
        //compare加密函数(egg-bcrypt)提供的
        let verifyPsw = await ctx.compare(payload.password, user.password)
        if (!verifyPsw) {
            ctx.throw(404, 'user password is error')
        }

        // 生成Token令牌
        return {token: await service.actionToken.apply(user._id)}
    }

    async logout() {
        console.log('logout');
    }

    //对user信息进行加密
    async current() {
        const {ctx, service} = this;
        // ctx.state.user 可以提取到JWT编码的data
        // state怎么来的,配置文件中增加了jwt的中间件
        const _id=ctx.state.user.data._id;
        const user=await service.user.find(_id);
        if (!user) {
            ctx.throw(404, 'user is not found')
        }
        user.password='How old are you?';
        return user
    }
}
module.exports=UserAccessService
