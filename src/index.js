// import "@babel/polyfill" //会导致打包体积变大
// 按需加载
//

//
console.log('index ')
//
// const arr = [new Promise(()=>{}),new Promise(()=>{})];
//
// arr.map((item)=>{
//     console.log(item);
// })


//index.js  babel 处理react
// import React, { Component } from "react";
// import ReactDom from "react-dom";
// class App extends Component {
//     render() {
//         return <div>hello world</div>;
//     }
// }
// ReactDom.render(<App />, document.getElementById("app"));


// 查询ｗｅｂｐａｃｋ构建流程
// const webpack = require("webpack");
// const config = require("../webpack.config");
// const compiler = webpack(config);
//
// //hooks
// Object.keys(compiler.hooks).forEach(hookName=>{
//     //返回每个生命周期的名称
//     compiler.hooks[hookName].tap('laohan',()=>{
//         console.log(`run -> ${hookName}`);
//     })
// });
//
//
// compiler.run();
//使用node命令来完成周期的打印
