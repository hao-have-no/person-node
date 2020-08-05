module.exports = {
    db:{
        dialect: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "123456",
        database: "person"
    },
    middleware: ['log'] // 以数组形式，保证执⾏行行顺序
}
