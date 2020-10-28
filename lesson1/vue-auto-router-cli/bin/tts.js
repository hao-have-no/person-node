#!/usr/bin/env node
//上述声明解释器方式

// console.log('cli.......6666');

//引入命令行工具
const program = require('commander');
program.version(require('../package').version); //打印版本号

//定义额外的命令
//策略模式:通过解析传入，来分解出各种处理函数
program.command('init <name>').description('init project').action(
    // name=>{
    //     console.log('init',name);
    // }
    require('../lib/init')
);

//定义约定路由指令
//根据view下的vue文件，自动生成路由
program
    .command('refresh')
    .description('refresh routers...')
    .action(require('../lib/refresh'));




//固定结尾，所有的命令行都是解析argv的
console.log('progress.argv',process.argv);

program.parse(process.argv);
