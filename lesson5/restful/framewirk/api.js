//生成通用的路由中间件
//借助router中的restful风格接口,实现对应的中间价功能

module.exports = {
    async init(ctx,next){
        //从上下文中拿到实体模型
        const model = ctx.app.$model[ctx.params.list];

        if (model){
            ctx.list = model;
            next()
        } else{
            ctx.body = 'no this model'
        }
    },

    //router.get('/api/:list', init, list)
    async list(ctx){
        const result = await ctx.list.find({})
        console.log(result)
            ctx.body = result;
    },

    async get(ctx){
        const result = await ctx.list.findOne({_id: ctx.params.id})
        ctx.body = result;
    },

    async create(ctx){
        const result = await ctx.list.create(ctx.request.body);
        console.log(result);
        ctx.body = result;
    },

    async update(ctx){
        ctx.body = await ctx.list.updateOne({_id: ctx.params.id}, ctx.request.body);
    },

    async del(ctx) {
        ctx.body = await ctx.list.deleteOne({_id: ctx.params.id});
    },

    //分页
    async page(ctx){
        ctx.body = await ctx.list.find({});
    }

}
