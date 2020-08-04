const http = require('http');
const session = {};

// cookie优化，服务端以key:value的形式记录所有的cookie，
// 与客户端通过id来与服务端的列表进行关键

http.createServer((req, res) => {
    if (req.url == 'favicon') {
        res.end('');
    }

    //观察cookie
    console.log('cookie', req.headers.cookie);

    const cookie = req.headers.cookie;
    const sessionKey = 'sid';

    if (cookie&&cookie.indexOf(sessionKey) > -1) {
        res.end('come back');
        //登录过了
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
        const sid = pattern.exec(cookie)[1];
        console.log('result',sid,session[sid]);

    } else {
        //无登录状态
        const sid = (Math.random() * 99999999).toFixed();
        //设置cookie
        res.setHeader('Set-Cookie', `${sessionKey} = ${sid}`);
        //放入cookie队列
        session[sid] = {
            name: 'laowang'
        }
        res.end('hello');
    }
    res.end('hello cookie');

}).listen(3000);