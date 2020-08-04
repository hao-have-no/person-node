const { Service } = require('egg');

class UserService extends Service{
    async getAll(){
        // return JSON.stringify([
        //     {name:'tom service'}
        // ])

        return JSON.stringify(await this.ctx.model.User.findAll());
    }
}

module.exports = UserService
