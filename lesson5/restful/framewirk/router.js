const router = require('koa-router')()
const {
    init, get, create, update, del,list
} = require('./api')

//restful 生成通用的路由
//通过通配符来生成所有的相关路由部分

console.log('66666');

router.get('/api/:list/:id', init, get)
router.get('/api/:list', init, list)
router.post('/api/:list', init,create)
router.put('/api/:list/:id', init, update)
router.delete('/api/:list/:id', init, del)

module.exports = router.routes()
