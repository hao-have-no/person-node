const {Controller} = require('egg');

/**
 * @Controller 项目按钮权限配置
 */
class ButtonDisPositionController extends Controller{
    constructor(ctx) {
        super(ctx);
    }

    /**
     * @summary 创建新的配置项
     * @description 在当前项目下创建新的按钮显示规则
     * @router post /api/button/create
     * @request body createButtonRequest *body
     * @response 2000 baseResponse 创建成功
     * @returns {Promise<void>}
     */
    async create(){
        const {ctx,service} = this;
        const payload=ctx.request.body|| {};
        const res=await service.user.create(payload);
        ctx.helper.success({ctx,res} );
    }
}
module.exports = ButtonDisPositionController;
