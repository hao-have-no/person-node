// const app = new(require('koa'))();
// const { initRouter } = require("./kkb-loader");
//
// //initRouter()返回路由集合
// //直接使用路由 声明的路由  router.routers()  使用koa-router的注册服务
// app.use(initRouter().routes())
// app.listen(3000);


//使用封装好的路由加载
const KKB = require('./kkb');
const app = new KKB();
app.start(3000);
