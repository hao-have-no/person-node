const fs =require('fs');

const path = require('path');

const mongoose = require('mongoose')

//读文件夹(model实体模型),并按照callback方法执行
//解析实例模型
function load(dir,callback){
    const url = path.resolve(__dirname,dir);
    const files = fs.readdirSync(url);
    files.forEach(filename=>{
        //去掉后缀
        filename = filename.replace('.js','');

        //加载文件
        const file = require(url+'/'+filename);//加载文件

        //回调
        callback(filename,file);
    })
}

//1,读取config 2.加载app
const loadModel = config => app =>{
    //链接
    mongoose.connect(config.db.url,config.db.option);

    const conn = mongoose.connection;

    //定义链接事件
    conn.on('error',(err)=>{
        console.log('链接err');
    })

    app.$model = {};

    load('../model',(filename,{schema})=>{
        console.log('loade model',filename,schema);

        app.$model[filename] = mongoose.model(filename,schema);
    })

}

module.exports = {loadModel};
