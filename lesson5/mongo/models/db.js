//异步:任务串行问题

//常规方式  看预习视频
//1.promise
//2.sync
//3.await
//5.事件
//6.订阅发布模式

const conf = require('./conf');

//导入事件机制
const {EventEmitter} = require('events');

//客户端
const { MongoClient } = require('mongodb');

class Mongodb{
    constructor(conf){
        //连接
        this.conf = conf;
        this.emmiter = new EventEmitter();

        this.client = new MongoClient(conf.url,{
            useNewUrlParser:true
            //验证db的地址
        })

        this.client.connect(err=>{
            if (err) throw err;
            console.log('连接成功');

            //通知派发连接成功事件
            this.emmiter.emit('connect');
        })
    }

    /**
     * 提供对应的集合
     */
    col(colName,dbName = conf.dbName){
        //连接指定的库,根据集合名字,把对应的数据拿出来
        return this.client.db(dbName).collection(colName);
    }


    /**
     * 提供订阅方法
     */
    once(event,callback){
        //暴露外层,订阅连接事件
        this.emmiter.once(event,callback);
    }
}

module.exports = new Mongodb(conf);
