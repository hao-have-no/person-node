const mongoose = require('mongoose');
const {Schema} = mongoose;
//连接mongodb
mongoose.connect(
    'mongodb://127.0.0.1:27017/weixin', {
        useNewUrlParser: true}, () => {
            console.log('Mongodb connected..')
})
//实例化数据库
exports.ServerToken = mongoose.model(
    'ServerToken', {accessToken: String});
