// console.log('hello'); ts 环境搭建测试

import * as Koa from 'koa'
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';
import * as Router from 'koa-router';

//导入load,生成router路由
import { load } from './utils/route-decors';
import { resolve } from 'path';
import { Sequelize } from 'sequelize-typescript';

const app = new Koa();

app.use(timing());
app.use(serve(`${__dirname}/public`));

app.use(
    bodify({
        multipart: true, //上传下载需要的，主要用于处理req的body
        strict: false //使用非严格模式,支持delete
    })
)

const database = new Sequelize({
    port:3306,
    database:'test',
    username:'root',
    password:'123456',
    dialect:'mysql',
    modelPaths: [`${__dirname}/model`], //自动扫描加载模型
});

database.sync({force:true});


// const router = new Router();
//
// router.get('/abc',ctx=>{
//     ctx.body = 'abc';
// });
//用自动解析扫描替换上面的配置  约定大于配置

const router = load(resolve(__dirname,'./routes'));

// console.log(router);

app.use(router.routes());


app.listen(3000,()=>{
    console.log('服务器启动成功：'+3000);
})

