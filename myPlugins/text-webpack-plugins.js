class TextWebpackPlugin{
    constructor(option){
        console.log(option)
    }

    //从对象中取值，生命周期触发
    //会返回compiler对象，我们从这个对象中拿到hooks,才能确定我们在哪个周期内触发
    apply(complier){

        //同步
        // complier.hooks.emit.tap("TextWebpackPlugin",compilation=>{
        //     console.log(compilation.assets);
        // })

        // 作业　　暗号: 暗号：做人嘛，最重要的是开心
        //emit 输出assets 到　output阶段
        //tapAsync(异步)　tap(同步)　根据当前阶段是否同步来选用 触发hooks
        //对资源文件进行修改，加入laohan.txt资源文件并进行描述
        //场景: 打包文件清单，文件名，文件数量
        complier.hooks.emit.tapAsync("FileWebpackPlugin",(compilation,cb)=>{
        //    compilation(钩子): 这个阶段下的wepback打包的资源内容和打包状态
        //     compilation 的创建是一次编译的起步，
            //     即将对所有模块加载(load)、封存(seal)、优化(optimiz)、分块(chunk)、哈希(hash) 和 重新创建(restore)
            console.log(compilation.assets);


            const length = Object.keys(compilation.assets).length;
            const result = [];
            for (let filename in compilation.assets){
                result.push(filename);
            }

            console.log(length,result);

            //插入一个文件
            //source 描述
            compilation.assets['laofeng.txt'] = {
                source:function(){
                    return `文件一共${length}个,文件列表为:${[...result]}`
                },
                size:function(){
                        return 1024;
                }
            };

            //异步钩子有回调函数，需执行
            cb();
        });

    }
}

module.exports  = TextWebpackPlugin;
