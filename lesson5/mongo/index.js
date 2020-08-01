const express = require("express");
const app = express();
const path = require("path");
const mongo = require("./models/db"); //数据库配置

app.get('/',(req,res)=>{
    res.sendFile(path.resolve("./index.html"))
});

//获取分类
app.get("/api/category", async (req, res) => {
    const col = mongo.col("runoob")
    const data = await col.distinct('category')
    res.json({ ok: 1, data })
})

//获取列表项
app.get('/api/list',async (req,res)=>{
    const {page,category,keyword} = req.query;

    //增加类别搜索
    const condition = {};//构造条件

    if (category){
        condition.category = category;
    }

    if (keyword){
        condition.name = {$regex:new RegExp(keyword)}
    }



    const col = mongo.col('runoob');
    const total = await col.find(condition).count();
    //skip放弃前面的多少条
    const fruits = await col.find(condition).skip((page-1)*10).limit(10).toArray();
    res.json({ok:1,data:{
        fruits,
            pagination:{
                total,
                page
            }
    }})
});

//根据类别搜索

app.listen(3100);
