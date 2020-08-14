import * as Koa from 'koa';
const users = [{ name: 'tom', age: 20 }, { name: 'tom', age: 20 }];

//引入装饰器
import { get,post,middlewares} from '../utils/route-decors'
import model from '../model/user';

//函数加载的时候会调用装饰器
//进化，自动进行路由的加载，声明load解析器

//实现类级别的装饰器
@middlewares([
    async function guard(ctx,next){
            //鉴权
        if (ctx.header.token){
            await next();
        }else{
            throw '请登录';
        }
    }
])
export default class User {
    @get('/users') //装饰器风格的路由配置  属性装饰器
    public async list(ctx: Koa.Context) {
        // ctx.body = { ok: 1, data: users };
        const users = await model.findAll();
        ctx.body = { ok: 1, data: users };
    }

    //增加中间件进行校验
    @post('/users',{
        middleware:[
            async function validation(ctx,next) {
                const name = ctx.request.body.name
                if (!name){
                    throw '请输入用户名'
                }
                await next();//标准的参数定义  next 执行下一步
            }
        ]
    })
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 }
    }
}
