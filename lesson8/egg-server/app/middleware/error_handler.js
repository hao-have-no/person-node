//中间件工厂
// 在config.default中进行中间件的注册
module.exports = (option, app)=>{
  return async function(ctx,next) {
      try {
          await next();
          //next执行的部分,出现异常都会被最外围截获
      }catch (err) {
          app.emit('error',err,this); //触发错误事件 比如日志记录等其他的异常操作 发送底层记录错误日志

          //异常应答
          const status = err.status || 500;

          //拼装错误消息
          const error = status === 500&&app.config.env === 'prod'?
              'Internal Server Error':
              err.message;

          // 从 error 对象上读出各个属性，设置到响应中
          ctx.body = {
              code:status,
              error:error
          }

          if (status === 422){
              ctx.body.detail = err.errors;
          }

          ctx.status = 200;
      }
  }
};
