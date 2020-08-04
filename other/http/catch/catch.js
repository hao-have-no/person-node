//手写定时器模拟http缓存

function updateTime(){
    setInterval(()=>{
        this.time = new Date().toUTCString()
    },1000)

    return this.time;
}

const http = require("http");

http.createServer((req, res) =>{

    //加载js及相关的解析

    const {url} = req;

    if (url === '/'){
        res.end(`
            <html>
                HTML UPDATE IN ${updateTime()}
                <script src="main.js"></script>
            </html>
        `)
    }else if (url === '/main.js') {
        const content = `document.writeln('<br/> JS update time: ${updateTime()}')`;

        //http 1
        // res.setHeader('Expires',new Date(Date.now()+20*1000).toUTCString()); //20秒内使用缓存

        //http 2


        res.statusCode = 200;
        res.end(content);
    }else if (url.includes('favicon')) {
        res.end('');
    }

}).listen(3000,()=>{
    console.log('http carch test run at',3000);
})



