const monent = require('moment');

//格式化时间
exports.formatTime=time=>monent(time).format('YYYY-MM-DD HH:mm:ss')
// 处理理成功响应
exports.success= ({ ctx, res=null, msg='请求成功' })=> {
    ctx.body= {
        code: 0,data: res,msg
    }
    ctx.status=200
}

//日志记录
exports.logger=(...arguments)=>{
   console.log(arguments);
};

