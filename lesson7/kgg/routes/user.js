module.exports = {

    // /user/  主路由嵌套
    'get /':async ctx=>{
        ctx.body = '用户首页'
    },

    // /user/info
    'get /info':async ctx=>{
        ctx.body = '用户详情'
    }
}
