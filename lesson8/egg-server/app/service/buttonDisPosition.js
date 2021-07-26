const Service = require('egg').Service
class ButtonDisPosition extends Service{
    /**   * 创建新的配置   * @param {*} payload   */
    async create(payload)
    {
        const {ctx} = this;
        return ctx.model.ButtonDisposition.create(payload);
    }
}

module.exports = ButtonDisPosition;
