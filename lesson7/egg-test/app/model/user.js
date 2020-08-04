module.exports = app =>{
    const { STRING } = app.Sequelize;

    const User = app.model.define(
        "user",
        {name:STRING(30)},
        {timestamps:false}
        );

    //同步数据库
    //也可使用生命周期或者Sequelize.defined
    User.sync({force:true});


    return User;

}
