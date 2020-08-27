//如何接受外部传入的参数
// 官方文档－loader说明：ＡＰＩ全部this上面

module.exports = function (source) {

        //loader包含异步代码　　引入async方法
        const callback =this.async();
        setTimeout(()=>{
            const result =  source.replace('laofeng','gungun');
            callback(null,result);
        },2000)
}
