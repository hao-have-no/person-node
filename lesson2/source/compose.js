//升级版的函数聚合
const f1= (x,y) => x+y;
const f2= z=> z*z

//常用的
// const compose =(fn1,fn2) => (...args)=> fn2(fn1(...args));
// console.log(compose(1,2));

//通用的
// const compose =(...[first,...other])=>(...args)=>{
//     let ret = first(...args);
//     other.forEach(v=>{
//         ret = v(ret);
//     })
//
//     return ret;
// };
//
// const fn =compose(f1,f2,f2);
//
//
// console.log(fn(1,2));


//责任链模式实现compose
//递归实现
// function compose(midleware){
//     return function () {
//         return dispatch(0)
//
//         function dispatch(i){
//             let fn = midleware[i];
//             if (!fn){
//                 //无函数立即执行
//                 return Promise.resolve();
//             }else{
//              return Promise.resolve(
//                  //放入下一层的执行承诺结果
//                  //promise 执行完，再执行下一个
//                  fn(function next(){
//                      return dispatch(i+1);
//                  })
//              );
//             }
//         }
//     }
// }
//
//
// async function fn1(next) {
//     console.log("fn1");
//     await next();
//     console.log("end fn1");
// }
//
// async function fn2(next) {
//     console.log("fn2");
//     await delay();
//     await next();
//     console.log("end fn2");
// }
// function fn3(next) {
//     console.log("fn3");
// }
//
// function delay() {
//     return new Promise((reslove, reject) => {
//         setTimeout(() => {
//             reslove();
//         }, 2000);
//     });
// }
//
// const middlewares = [fn1, fn2, fn3];
// const finalFn = compose(middlewares);
// finalFn();


//策略模式,主要减少if else的使用
const strategy={
    'S':(salary)=>{
        return salary*4
    },
    'A':(salary)=>{
        return salary*3
    },
    'B':(salary)=>{
        return salary*3
    },
    'C':(salary)=>{
        return salary*3
    }
}

const calculateBonus =(level,salary)=>{
    return strategy[level](salary);
}

console.log(calculateBonus('C',100));


//责任链模式

