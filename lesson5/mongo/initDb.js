//初始化数据库,插入一定数据

const mongodb = require('./models/db');

mongodb.once('connect',async()=>{
   const col = mongodb.col('runoob');
   //初始化之前删除所有数据
    await col.deleteMany() //所有删除

    const data =new Array(100).fill().map((v,i)=>{
        return {
            name:'XXXXX'+i,
            price:i,
            category:Math.random()>0.5?'蔬菜':'水果'
        }
    })

    await col.insertMany(data);

    console.log('insert','参入成功');
});
