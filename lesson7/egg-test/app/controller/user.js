const {Controller} = require('egg');

class UserController extends Controller{
    async index(){
        // this.ctx.body = JSON.stringify([{
        //     name:'tom'
        // }])

        //约定优于配置
        const {ctx} = this;
        ctx.body = await ctx.service.user.getAll()
    }
}

module.exports = UserController;
