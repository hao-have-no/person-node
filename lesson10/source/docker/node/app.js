const Koa = require('koa');
const app = new Koa();

app.use(ctx=>{
	ctx.body = 'hello nodeJs!!!!'
})

app.listen(3000,()=>{
	console.log('app started at 3000')
})
