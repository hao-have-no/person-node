const fs =require('fs');
const handlebas = require('handlebars'); //模版工具
const chalk = require('chalk');

module.exports = async ()=>{
    //获取文件列表(执行环境为abc文件夹下)
    const list = fs.readdirSync('./src/views')
        .filter(v=>v !== 'Home.vue')
        .map(v=>({
            //进行加工
            name:v.replace('.vue','').toLowerCase(),
            file:v
        }))

    //调用两次：１：生成路由 2.编译菜单
    compile({list},'./src/router.js','./template/router.js.hbs');

    compile({list},'./src/App.vue','./template/App.vue.hbs');



    /**
     * 编译函数
     * @param meta 数据
     * @param filePath 目标文件
     * @param templatePath　模版文件
     */
    function compile(meta,filePath,templatePath){
        //判断模版是否存在
        if (fs.existsSync(templatePath)){
            //读取模版文件
            const content = fs.readFileSync(templatePath).toString();
            //编译,生成render函数
            const result = handlebas.compile(content)(meta);
            //目标文件写入编译结果
            fs.writeFileSync(filePath,result);

            console.log(chalk.green(`${filePath} 创建成功`))
        }
    }
}
