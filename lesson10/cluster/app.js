const http = require('http');
const server = http.createServer((req, res) =>{
    Math.random() > 0.8? a():'2';
    res.end('Hello');
})

// 通过模块的方式被别人调用 或者 直接调用 xx.x
//是否是主模块
if (!module.parent){
    //主模块直接启动
    server.listen(3000,()=> console.log('server start 3000'))
}else{
    module.exports = server
}
