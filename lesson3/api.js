// /http/api.js
const http = require("http");
const fs = require("fs");
http
    .createServer((req, res) => {
        const { method, url } = req;
        console.log('req',method,url,req.headers.cookie,req.headers.ctoken);
        //同意接收指定端口的请求 跨域第一重校验，简单请求下，设置白名单
        if (method == "GET" && url == "/") {
            fs.readFile("./index.html", (err, data) => {
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            });
        } else if (method == "GET" && url == "/api/users") {
            res.setHeader('Set-Cookie', 'cookie1=va222;')

            // 预检options中和/users接口中均需添加
            // res.setHeader('Access-Control-Allow-Credentials', 'true');
            // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
            // res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify([{ name: "tom", age: 20 }]));
        }else if (method == 'OPTIONS'){
             //设置预检请求进入时，给予通信证  跨域第二重校验
            // res.setHeader('Access-Control-Allow-Credentials', 'true');
            // res.writeHead(200, {
            //     "Access-Control-Allow-Origin": "http://localhost:3000",
            //     "Access-Control-Allow-Headers": "X-Token,Content-Type",
            //     "Access-Control-Allow-Methods": "PUT"
            // });
             res.end();
        }
    })
    .listen(4000, () => {
        console.log('api listen at ' + 4000)
    });
