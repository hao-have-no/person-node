const Koa = require('koa');
const app = new Koa();

//引入模型

//自动生成接口
//避免板砖式的声明接口 Router.get('/')
//拖拉机 自动生成
const config = require('./conf');

//模块自动加载
const {loadModel} = require('./framewirk/loader');
loadModel(config)(app);

//生成通用路由
// /user/xxx
// /card/xxx

//加载路由
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const restful = require('./framewirk/router');
app.use(restful);


const port = 3000;
app.listen(port, () => {
    console.log(`app started at port ${port}`)
});
