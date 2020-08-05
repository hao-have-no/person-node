module.exports = {

    // /user/  主路由嵌套
    'get /':async app=>{
        // ctx.body = '用户首页'
        //router+service
        //需要重新构建中间件
        const name = await app.$service.user.getName();
        app.ctx.body =`用户: ${name}`
    },

    // /user/info
    'get /info':app=>{
        //ctx.body = '用户详情'
        app.ctx.body = '用户age:'+app.$service.user.getAge();
    }
}
