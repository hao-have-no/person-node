const { Controller } = require('egg');

/**
 * @Controller 微信交互
 */

class WeixinController extends Controller{
    constructor(ctx){
        super(ctx);
    }

    /**
     * @summary 发送微信交互消息
     * @description 用户每天定时,向微信公众号关注用户发送消息
     * @router get /api/send
     * @request url baseRequest
     * @response 200 baseResponse 发送成功
     */
     async send(){
         const {ctx, service, app} = this;
         const {config} = app;
         const result = await service.weixin.send();
         ctx.helper.logger('主动触发，发送模板消息 结果: %j', JSON.stringify(result));
         ctx.helper.success({ctx,result} );
    }
}

module.exports = WeixinController;
