//repo 是哪拉取，　desc拉取到哪
const {promisify} = require('util');
//克隆脚手架
module.exports.clone = async function(repo,desc){
    //借助已经写好的github(vue)模版项目

    //本身不是promise方法
    const download = promisify(require('download-git-repo'));

    //进度条
    const ora = require('ora');

    const process = ora(`下载.......${repo}`)

    process.start(); //下载前进度条动起来

    await download(repo,desc); //堵塞状态

    process.succeed(); //下载完成

}
