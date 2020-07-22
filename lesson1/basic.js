// //异步IO处理,通过promise的预语法糖
// (async()=>{
//     const fs = require('fs');
//     const { promisify } = require('util');
//     const readFile = promisify(fs.readFile);
//     const data = await readFile('./config.js');
//     console.log('data',data.toString());
// })();


// //http搭建服务
// const http = require('http');
//
// const server = http.createServer((req, res) =>{
//     // todo 打印原型链
//     console.log('this is a request',getPrototype(res));
//     res.end('a response');
// } );
//
//
// server.listen(4101);
//
// //打印原型链
// function getPrototype(obj){
//     const protoChain = [];
//     while(obj = Object.getPrototypeOf(obj)){
//         protoChain.push(obj);
//     }
//
//     return protoChain;
// }
