const { entry } = require("../webpack.config");
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = class webpack{
    constructor(options){
        // console.log(options);
        this.entry = options.entry;
        this.output = options.output;

        //创建模块的缓存
        this.modules = [];
    }

    run(){
        //读取入口文件，进行处理
        const info = this.parse(this.entry);
        // console.log(info)
        this.modules.push(info);
        for (let i = 0; i < this.modules.length; i++) {
            const item = this.modules[i];
            const { dependencies } = item; //寻找dependencies路径
            if (dependencies) {
                for (let j in dependencies) {
                    //dependencies[j]获取到路径,循环进行所有依赖的递归操作
                    this.modules.push(this.parse(dependencies[j]));
                }
            }
        }

        //创建对象来过滤解析文件后生成的结果
        const obj = {};
        this.modules.map((item) => {
            obj[item.entryFile] = {
                dependencies: item.dependencies,
                code: item.code,
            };
        });

        // console.log(obj);
        this.file(obj); //处理结果交于file,生成资源文件
    }

    parse(entryFile){
        //读取入口文件，进行处理//解析依赖的方法
        // 1.ast// 2.path// 3.正则  但是文件类型不确定，操作比较复杂，建议还是ast
        const content =fs.readFileSync(entryFile, "utf-8");
        //利用babel/parser的来处理文件内容，返回ast对象
        const ast = parser.parse(content, {
            sourceType: "module",
        });
        // console.log(this.modules);//ast.program.body
        // 节点引入树，包括节点的引和展示等，每个节点的source.value表明了引用文件的类型和地址(相当于入口文件)
        //提取指定字段的节点
        const dependencies = {};
        traverse(ast, {
            //从文件解析生成的ast树中过滤type为importDeclaration节点
            ImportDeclaration({ node }) {
                //拼接引用文件路径
                const pathName =
                    "./" + path.join(path.dirname(entryFile), node.source.value);
                dependencies[node.source.value] = pathName;
            },
        });
        //对依赖的文件内容进行语法转化,提取转化成功的chunk代码
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"],
        });
        console.log(code);
        return {
            entryFile,
            dependencies,
            code,
        };
        // 暗号：有点感动了怎么办
    }

    file(code){
        //生成 bundle启动器函数
        //根据位置，生成资源文件

        const filePath = path.join(this.output.path, this.output.filename);
        const newCode = JSON.stringify(code); //序列化，可以被解析

        const bundle = `(function(grape){
            //进行入口开始读取的工作
            function require(module){
                function otherRequire(relativePath){
                //以相对路径获取到绝对路径
                    return require(graph[module].dependencies[relativePath])
                }
            
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                    //otherRequire 用于处理依赖，而parse当时处理的dependencies就发挥作用，直接指向真实的文件地址
                })(otherRequire,exports,grape[module].code)
                return exports;
            }
            require(${this.entry})
        })(${newCode})`;

            fs.writeFileSync(filePath,bundle,"utf-8")

    }
}