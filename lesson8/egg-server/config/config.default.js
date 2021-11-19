/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1596700094831_8260';

    // add your middleware config here
    config.middleware = ['errorHandler'];

    //增加swagger解析js-doc,自动生成注册相关服务
    config.swaggerdoc = {
        dirScanner: './app/controller', //扫描的文档位置
        apiInfo: {
            title: '个人接口',
            description: '个人接口 swagger-ui for egg',
            version: '1.0.0',},
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        // enableSecurity: false, //自动进行接口的回调和检查 , 目前不能用
        routerMap: true, //自动根据文档进行注册
        enable: true,
    };

    config.mongoose= {
        url: 'mongodb://127.0.0.1:27017/egg_x',
        options: {
        // useMongoClient: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            bufferMaxEntries: 0
        }
    };

    //jwt配置,对当前api的请求的token进行解密
    //把token自动解密到state中,将token的user信息放到user.data上
    config.jwt= {
        secret: 'Great4-M',
        enable: true, // default is false
        match: /^\/api/, // optional
    };

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    //配置跨域
    config.security = {
        csrf: {
            // headerName: 'x-csrf-token',
            // cookieName: 'csrfToken'
            enable: false,
            ignoreJSON: true,
        },
        domainWhiteList: ["*"],
    };

    config.cors = {
        origin: '*', // 匹配规则  域名+端口  *则为全匹配
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    //微信公众号相关配置
    config.weChat={
        appId: 'wxf0921f0bcbb62e0d',
        secret: '143c3b8757f74bb7b6608459a11f15ac',
        daily: 'fQdPzlN7gPXw-8h3bvqgepf3kXnmhxcsyNgcq15eWsc', // 普通模板
        marry: 'brmBmRxriGCZr07i_9ewmqYFwTW90iKJws8kD171XW8', // 结婚纪念日模板
        wageDay: 'aCHjEM6vdCuKNnfW5_LICTKvWCtKoozVfCL62zSP2F0', // 工资日模板
        birthday: 'AWltKtPSxllJoHajsSolBs4oFeXB8tY2TDahQ47z1YM', // 生日模板
    };

    config.weather={
        appid: '43571838',
        appsecret: 'x6oFSTim',
    };

    // 时间
    config.time = {
        wageDay: 10, // 工资日
        acquaint: '2017-09-14', // 相爱日期
        mary: '2022-04-29', // 结婚日期
        love: '2017-10-01', // 相爱日期
        BeEngaged: '2020-10-05', //订婚纪念日
        // 生日配置
        // 老家过阴历生日，这里暂时写死
        birthday: {
            2021: '2021-10-20',
            2022: '2022-10-10',
            2023: '2023-10-29',
        }, // 每年生日 阳历
        birthYear: 1995,
    };

//     config.mysql={
// // 单数据库信息配置
//         client: {
//             // host
//             host: 'localhost',
//             // 端口号
//             port: '3306',
//             // 用户名
//             user: 'root',
//             // 密码
//             password: '123456',
//             // 数据库名
//             database: 'person',
//         },
//         // 是否加载到 app 上，默认开启
//         app: true,
//         // 是否加载到 agent 上，默认关闭
//         agent: false,
//     };

// config.sequelize = {
    //     dialect: 'mysql',
    //     host: 'localhost',
    //     port: 3306,
    //     database: 'person',
    //     user: 'root',
    //     // 密码
    //     password: '123456',
    // };


    return {
        ...config,
        ...userConfig,
    };
};
