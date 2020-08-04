module.exports = app=>({
    // 'get ':async ctx=>{
    //     ctx.body = '首页'
    // },
    // 'get /detail':async ctx=>{
    //     ctx.body = '详细页面'
    // }

    //介入controller  进行提升  使用工厂函数 传值来实例化
    'get /': app.$ctrl.home.index,
    'get /detail': app.$ctrl.home.detail
})

//柯里化变换  对象=> 对象工厂
// react 中间间  hoc高阶组件
