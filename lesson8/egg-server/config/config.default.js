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
    }

    config.mongoose= {
        url: 'mongodb://127.0.0.1:27017/egg_x',
        options: {
        // useMongoClient: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            bufferMaxEntries: 0
        }
    }

    //jwt配置,对当前api的请求的token进行解密
    //把token自动解密到state中,将token的user信息放到user.data上
    config.jwt= {
        secret: 'Great4-M',
        enable: true, // default is false
        match: /^\/api/, // optional
    }

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    //配置跨域
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true,
        },
        domainWhiteList: ["*"],
    };

    config.cors = {
        origin: '*', // 匹配规则  域名+端口  *则为全匹配
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    return {
        ...config,
        ...userConfig,
    };
};
