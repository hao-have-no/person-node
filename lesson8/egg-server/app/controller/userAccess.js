'use strict'
const Controller=require('egg').Controller

/**
 * @Controller 用户鉴权
 */
class UserAccessController extends Controller {

    constructor(ctx) {
        super(ctx)
    }

    /**
     * @summary 用户登入
     * @description 用户登入
     * @router post /auth/jwt/login
     * @request query loginRequest *query
     * @response 200 baseResponse 创建成功
     */
    async login() {
        const { ctx, service } = this

        ctx.helper.logger(ctx.request.query,ctx.request.query.mobile);

        // const payload = ...

        // 校验参数
        // ctx.validate(ctx.rule.loginRequest);
        // 组装参数
        const payload = ctx.request.query|| {}

        // 调用 Service 进行业务处理
        const res = await service.userAccess.login(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    /**
     * @summary 用户登出
     * @description 用户登出
     * @router post /api/auth/jwt/logout
     * @request body loginRequest *body
     * @response 200 baseResponse 创建成功
     */
    async logout() {
        const { ctx, service } = this
        // 调用 Service 进行业务处理
        await service.userAccess.logout()
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    /**
     * @summary 用户状态查询
     * @description 用户状态查询
     * @router post /api/user/status/{id}
     * @request body loginRequest *body
     * @response 200 baseResponse 创建成功
     */
    async userStatus(){
        const { ctx, service } = this
        console.log('userStatus')
    }
}

module.exports = UserAccessController
