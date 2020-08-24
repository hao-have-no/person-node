
//如何接受外部传入的参数
// 官方文档－loader说明：ＡＰＩ全部this上面

module.exports = function (source) {
    //source 原内容
    //     console.log(source);
    //     // return source.replace('laofeng',this.query.name);
        //callback 优化返回方法，适用于多种复杂的返回值
        const result =  source.replace('laofeng','axiba');
        this.callback(null,result);
}
