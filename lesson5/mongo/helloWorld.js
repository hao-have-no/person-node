(async()=> {
    const  {MongoClient} = require('mongodb')
    //创建客户端
    const client = new MongoClient(
        'mongodb://localhost:27017',
        {
            //userNewUrlParser这个属性会在url里识别验证用户所需的db
            userNewUrlParser: true
        }
    )

    //创建数据库连接通道
    let ret
    try{
        ret = await client.connect();
    }catch(e){
        console.log('e',e);
    }
    // console.log("ret",ret);

    //链接指定数据库
    const db = client.db('test');

    //建立数据库链接
    const runoob = db.collection('runoob');

   //添加文档
   //  ret = await runoob.insertOne({name:'芒果',price:20.1})
   //
   //  console.log('insert',JSON.stringify(ret));

    ret = await runoob.findOne();

    console.log('ret',ret);

})()
