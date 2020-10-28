const {clone} = require('./download');

//打印欢迎界面
const {promisify} = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear'); //清屏
const chalk = require('chalk'); //粉笔，输出字体加颜色

//封装打印
const log = content => console.log(chalk.green(content));

const open = require("open") //打开浏览器

//对安装依赖进行封装
//对接输出流并进行promise异步
//有上下文的日志
const spawn = async (...args)=>{
    const {spawn} = require('child_process'); //线程

    //返回执行承诺
    return new Promise(resolve => {

        //定义子线程
        const proc = spawn(...args);

        //对接主进程与子进程，可以看到所有的数据流操作
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);

        proc.on('close',()=>{
            //执行完毕，返回执行承诺
            resolve();
        })

    })
}


module.exports = async name => {
    //打印欢迎界面
    clear();
    const data = await figlet('T T S F H  W e l c o m e');
    log(data);

    // //克隆脚手架
    log('🚀创建项目:'+name);
    await clone('github:su37josephxia/vue-template',name);

    //安装依赖
    log('安装依赖');
    //cwd:指定install的执行环境
    await spawn('npm',['install'],{cwd:`./${name}`});

    log(chalk.green(`
👌安装完成：
To get Start:
===========================
cd ${name}
npm run serve
===========================
`    ))

     //自动进入并运行
    // 打开浏览器
    open(`http://localhost:8081`);
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })

}
