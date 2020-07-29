(async () => {
    const SequeLize = require('sequelize');

    //建立连接
    const sequelize = new SequeLize('person', 'root', '123456', {
        host: "localhost",
        dialect: "mysql",
        operation: false
    });

    //定义模型
    //UUID-主键
    const Fruit = sequelize.define('Fruits', {
        id: {type: SequeLize.DataTypes.UUID, defaultValue: SequeLize.DataTypes.UUIDV1, primaryKey: true},
        name: {type: SequeLize.STRING(20), allowNull: false},
        price: {
            type: SequeLize.FLOAT, allowNull: false,
            validate: {
                isNumeric: {msg: "价格字段请输入数字"},
                min: {args: [4], msg: "价格字段必须大于0"}
            }
        },
        stock: {
            type: SequeLize.INTEGER, defaultValue: 0, validate: {
                isNumeric: {msg: "库存字段请输入数字"},
                min: {args: [0], msg: "价格字段必须大于0"}
            }
        }
    }, {
        //配置项
        // timestamps: false //关闭时间戳
    });
    //自然主键 逻辑主键key(id)  另外会自动生成时间戳

    //同步
    let ret = await Fruit.sync();

    //强制同步：创建表之前先删除已存在的表
    // Fruit.sync({force: true})

    //插入数据
    ret =await Fruit.create({
        name:'bananer',
        price: "4"
    })
    //
    // console.log('create',ret)
    //
    // ret = await Fruit.findAll()
    //
    // //更新数据
    // await Fruit.update(
    //     { price: 4 },
    //     { where: { name:'香蕉'} }
    // )
    // console.log('findAll',JSON.stringify(ret))

    // const Op = SequeLize.Op; //加入筛选条件
    //
    // ret = await Fruit.findAll({
    //     where: {price: {[Op.lt]: 4, [Op.gt]: 2}}
    // })
    //
    // console.log('findAll', JSON.stringify(ret, '', '\t'))

    // 添加实例级别方法
    Fruit.prototype.totalPrice = function(count) {
        return (this.price * count).toFixed(2);
    };

    //使用实例方法
    Fruit.findAll().then(fruits=>{
        const [f1] = fruits;
        console.log(`买5kg${f1.name}需要￥${f1.totalPrice(5)}`);
    })

    // 通过属性查询
    Fruit.findOne({ where: { name: "bananer" } }).then(fruit => {
    // fruit是首个匹配项，若没有则为null
        console.log(fruit.get());
    });


//     Fruit.findById(1).then(fruit => {
// // 方式1
//         fruit.price = 4;
//         fruit.save().then(()=>console.log('update!!!!'));
//     });
// // 方式2
//     Fruit.update({price:4}, {where:{id:1}}).then(r => {
//         console.log(r);
//         console.log('update!!!!')
//     })


// // 分页
//     Fruit.findAll({
//         offset: 0,
//         limit: 2,
//     });
//
// // 排序
//     Fruit.findAll({
//         order: [['price', 'DESC']],
//     });
//
// // 聚合
//     Fruit.max("price").then(max => {
//         console.log("max", max);
//     });
//     Fruit.sum("price").then(sum => {
//         console.log("sum", sum);
//     });


    //删除
// 方式1
    // Fruit.findOne({ where: { id: 1 } }).then(r => r.destroy());
// 方式2
//     Fruit.destroy({ where: { id: 1 } }).then(r => console.log(r));

})()
