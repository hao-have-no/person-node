module.exports = app=> ({
    index: async ctx =>{
        // ctx.body = "⾸页CTRL";
        //controller+service的用法
        //按照用法 app.$service 但是没有app
        //柯里化变换---> 导入app
        const name = await app.$service.user.getName();
        app.ctx.body = `ctrl user ${name}`;

    },
    detail: async ctx => {
        app.ctx.body = "detail page CTRL";
    }
});
