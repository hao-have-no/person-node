//读取文件
const fs = require("fs");
//将文件内容解析为抽象语法树
const parser = require("@babel/parser");
//对ast进行操作
const traverse = require("@babel/traverse").default;
//文件路径处理
const path = require("path");
//语法转化
// transformFromAst 适合对ast进行处理
const {transformFromAst} = require("@babel/core");

module.exports = class webpack{
    constructor(options){
        // console.log(options);
        //解构
        this.entry = options.entry;
        this.output = options.output;
        this.modules = [];
    }
    run(){
        //读取入口文件，分析依赖
        //获取解析后的信息
        const info = this.parser(this.entry);
        //for 便利依赖
        this.modules.push(info);
        for (let i=0;i<this.modules.length;i++){
            //找到dependence,找到位置，交给path
            const item = this.modules[i];
            if (item.dependencies){
                const dependencies = item.dependencies
                for (let mod in dependencies){
                    //得到路径，交给parser,处理结果放到modules
                    this.modules.push(this.parser(dependencies[mod]));
                }
            }
        }
        // console.log(this.modules);

        const obj = {};
        //缺少对启动器函数的处理
        this.modules.forEach(item=>{
            obj[item.entryFile] = {
                dependencies:item.dependencies,
                code:item.code
            }
        });
        // console.log(obj)

        //生成资源文件
        this.file(obj);
    }

    parser(entryFile){
        //对入口文件内容进行处理
        // console.log(entryFile);
        const fileContent = fs.readFileSync(entryFile,"utf-8");
        // console.log(fileContent);
        //处理依赖，解析路径(fs支持相对路径，绝对路径更好)
        //可以使用ast来解析路径，也可以使用path
        //规范: esm或者com.js,全方位处理,采用babel的parse
        const ast = parser.parse(fileContent,{
            sourceType:'module'
        });
        //依赖队列
        const dependencies = {};
        //过滤，只保留依赖的节点
        traverse(ast,{
            //收保留类型为ImportDeclaration的节点,提取依赖
            //自己会循环遍历ast，找到符合的节点
            ImportDeclaration({ node }){
                //node.source.value 获取当前资源内容
                // console.log(node.source.value);
                //补齐依赖模块的路径
                //获得当前依赖依赖文件路径,拼接文件路径
                const pathName = "./"+path.join(path.dirname(entryFile),node.source.value);
                dependencies[node.source.value] = pathName;
                // console.log(dependencies);
            }
        });
        //语法转化的任务通常交给presets
        //获得转化后的对象，包含转化成功的code
        const {code} = transformFromAst(ast,null,{
            presets:["@babel/preset-env"]
        })
        // console.log(code);

        return {
            entryFile,
            dependencies,
            code
        }
        // console.log(ast.program.body);
    }

    file(code){
        const newCode = JSON.stringify(code);
        //根据output处理资源的输出地址(绝对地址)
        const filePath = path.join(this.output.path,this.output.filename);

        // require('${this.entry}') 导入入口文件，及入口文件所对应的module里的值(dependencies,code)
        //graph[module] 将对应模块的code传入进去
        //exports 是对象，将对应执行完毕的结果挂载到对象上就行
        //依赖中的require需要处理，依赖模块的依赖都是相当于入口文件的定位
        // graph[module].dependencies[relativePath] 得到项目的路径
        const bundle = `(function(graph){
                function require(=){
                    function otherRequire(relativePath){
                        return require(graph[module].dependencies[relativePath]);
                    }
                    var exports = {};
                    (function(require,exports,code){
                        eval(code);
                    })(otherRequire,exports,graph[module].code)
                    return exports;
                }
                require('${this.entry}')
            })(${newCode})`;
        //根据bundle生成启动器函数
        fs.writeFileSync(filePath,bundle,'utf-8');
        //根据位置生成资源文件
    }
};
