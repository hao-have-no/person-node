class TextWebpackPlugin{
    constructor(option){
        console.log(option)
    }

    //从对象中取值，生命周期触发
    apply(complier){
        //触发hooks  异步出发
        // complier.hooks.emit.tapAsync("TextWebpackPlugin",(compilation,cb)=>{
        //     console.log(compilation.assets);
        //     compilation.assets['laofeng.txt'] = {
        //         source:function(){
        //             return `卡新`
        //         },
        //         size:function(){
        //             return 1024
        //         }
        //     }
        //     cb();
        // })

        //同步
        // complier.hooks.emit.tap("TextWebpackPlugin",compilation=>{
        //     console.log(compilation.assets);
        // })


        // 作业　　暗号: 暗号：做人嘛，最重要的是开心
        complier.hooks.emit.tapAsync("FileWebpackPlugin",(compilation,cb)=>{

            const length = Object.keys(compilation.assets).length;

            const result = [];
            for (let filename in compilation.assets){
                result.push(filename);
            }

            console.log(length,result);

            compilation.assets['laofeng.txt'] = {
                source:function(){
                                return `文件一共${length},文件列表为:${[...result]}`
                            },
                size:function(){
                        return 1024;
                }
            };

            cb();
        });

    }
}

module.exports  = TextWebpackPlugin;
