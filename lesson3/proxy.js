//埋点更容易
// const img = new Image()
// img.src='/api/users?abc=123'

// proxy.js

//解决跨域问题，第一种：通过axios构造同源服务器，避免跨域
const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()


app.use(express.static(__dirname + '/'));

//使用proxy来进行代理
app.use('/api', proxy({ target: 'http://localhost:4000', changeOrigin: false
}));

app.listen(3000)