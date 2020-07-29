const fs = require('fs');

function get(key){
    fs.readFile('./db.json',(err,data)=>{
        const json = data?JSON.parse(data):{};
        console.log(json[key])
    })
}


function set(key,value){
    fs.readFile('./db.json',(err, data)=>{

        const json = data?JSON.parse(data):{};
        json[key] = value;
        //重新写瑞
        fs.writeFile('./db.json',JSON.stringify(json),err=>{
            if (err){
                console.log(err);
            }
            console.log('写入成功');
        })
    })
}


//1. helloworld文件
//2. 使用jest测试用例
//3. 命令行 -- 测试方式

const readline = require('readline');
//读取命令行  可用于加密, 文件流一行行读取操作
const rl = readline.createInterface({
    input:process.stdin, //对接流  process 当前进程的输入输出
    output: process.stdout
})

rl.on('line',function (input) {
   //set a 1 实现这种写入操作
   const [op,key,value] = input.split(" ");
   if (op === 'get'){
       get(key);
   }else if (op === 'set') {
       set(key,value);
   }else if (op === 'quit') {
       rl.close();
   }else{
       console.log('暂无相关操作')
   }
});

rl.on('close',function () {
    console.log('程序结束');
    process.exit(0); //杀死当前进程
})
