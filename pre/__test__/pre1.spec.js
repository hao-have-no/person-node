test('测试Hello World',()=>{
    const ret = require("../pre1")


    //使用断言，输出指定值成功
    expect(ret).toBe('Hello World');
})