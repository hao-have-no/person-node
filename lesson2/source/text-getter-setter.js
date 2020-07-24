const kkb = {
    //优雅一下，对属性进行提取
    info:{
        name:'kkb'
    },
    //es6属性,对象的属性获取方法,数据劫持
    get name(){
        console.log('get...');
        return this.info.name
    },

    set name(val){
       console.log(`set...${val}`);
       this.info.name = val;
    }
};

//使用不优雅
console.log(kkb.name);
kkb.name = 'ccc';
console.log(kkb.name);
//属性多　不确定　规则　加入劫持　数据响应+
//属性少　规则不固定：

//getter/setter
//可用于比如适配器adaptor：echarts的二次封装

//业务逻辑复杂，分层,一层一层自上而下去实现

//proxy:对整体进行劫持，而definePrototype是对对象的属性进行劫持
