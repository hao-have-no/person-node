'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    swaggerdoc: {
        enable: true,
        package: 'egg-swagger-doc-feat'
    },
    validate: {
        enable: true,package: 'egg-validate',
    },
    mongoose : {  enable: true,  package: 'egg-mongoose'},
    //加密密码
    bcrypt : {enable: true,package: 'egg-bcrypt'  },
    //token校验
    // jwt: {enable: true,package: 'egg-jwt',},

    //配置跨域
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    // mysql:{
    //     enable: true,
    //     package: 'egg-mysql',
    // },
    // sequelize:{
    //     enable: true,
    //     package: 'egg-sequelize',
    // }
};
