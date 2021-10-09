const Service = require('egg').Service;
const moment = require('moment'); //时间处理
const requestUrl = "https://api.weixin.qq.com/cgi-bin/";

class WeiXinService extends Service {
    /**
     * 发送模板消息给关注的人员
     */
    async send() {
        const {ctx} = this;
        //获取accessToken
        const token = await ctx.service.weixin.getToken();
        ctx.helper.logger('获取token 结果: %j', token);

        let tempData = await ctx.service.weixin.getTemplateData();
        // return;

        // 获取所有的用户信息
        const {openid: userList} = await ctx.service.weixin.getAllUser(token);

        ctx.helper.logger('userList',userList,JSON.stringify(tempData));

        //封装发送消息体
        const promise = userList.map(async item => {
            ctx.helper.logger('开始发送每天的提醒------>', item);
            tempData.touser = item;
            return await ctx.service.weixin.toWechart(token,tempData);
        });

        //并发发送
        const results = await Promise.all(promise);
        ctx.helper.logger('结束发送------>结果:', results);

        return results;

        // return {msg: '微信发送成功'}
    }

    /**
     * 通知微信推送消息
     * @param token
     * @param data
     * @returns {Promise<void>}
     */
    async toWechart(token, data) {
        const {ctx} = this;
        // 模板消息接口文档
        const url = `${requestUrl}message/template/send?access_token=${token}`;
        ctx.helper.logger('send-info', url,data);
        return await this.ctx.curl(url, {
            method: 'POST',
            data,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     *组装模板消息
     */
    async getTemplateData() {
        const {ctx,app} = this;
        //根据日期判断今天推送的消息模板
        const wageDay = ctx.service.weixin.getWageDay();
        const marry = ctx.service.weixin.getMarryDay();
        const birthday = ctx.service.weixin.getBirthday();
        const data = {
            topcolor: '#FF0000',
            data: {},
        };

        ctx.helper.logger('temp',wageDay,marry,birthday)
        // return;

        if (!wageDay){
            data.template_id = app.config.weChat.wageDay;
            data.data = {
                dateTime: {
                    value: ctx.service.weixin.getDateTime(),
                    color: '#cc33cc',
                },
            };
        }else if (!marry) {
            // 结婚纪念日模板
            data.template_id = app.config.weChat.marry;
            data.data = {
                dateTime: {
                    value: ctx.service.weixin.getDateTime(),
                    color: '#cc33cc',
                },
                anniversary: {
                    value: ctx.service.weixin.getMarryYear(),
                    color: '#ff3399',
                },
                year: {
                    value: ctx.service.weixin.getLoveYear(),
                    color: '#ff3399',
                },
            };
        } else if (!birthday) {
            // 生日模板
            data.template_id = app.config.weChat.birthday;
            data.data = {
                dateTime: {
                    value: ctx.service.weixin.getDateTime(),
                    color: '#cc33cc',
                },
                individual: {
                    value: this.getBirthYear(),
                    color: '#ff3399',
                },
            };
        } else {
            // 正常模板
            data.template_id = app.config.weChat.daily;
            // 获取天气
            const getWeather = await ctx.service.weixin.getWeather();
            // 获取每日一句
            const message = await ctx.service.weixin.getOneSentence();
            data.data = {
                dateTime: {
                    value: ctx.service.weixin.getDateTime(),
                    color: '#cc33cc',
                },
                acquaint:{
                    value: ctx.service.weixin.getAcquaintday(),
                    color: '#ff0033',
                },
                love: {
                    value: ctx.service.weixin.getLoveDay(),
                    color: '#ff3399',
                },
                wage: {
                    value: wageDay,
                    color: '#66ff00',
                },
                birthday: {
                    value: birthday,
                    color: '#ff0033',
                },
                marry: {
                    value: marry,
                    color: '#ff0033',
                },
                wea: {
                    value: getWeather.wea,
                    color: '#33ff33',
                },
                tem: {
                    value: getWeather.tem,
                    color: '#0066ff',
                },
                airLevel: {
                    value: getWeather.air_level,
                    color: '#ff0033',
                },
                tem1: {
                    value: getWeather.tem1,
                    color: '#ff0000',
                },
                tem2: {
                    value: getWeather.tem2,
                    color: '#33ff33',
                },
                win: {
                    value: getWeather.win,
                    color: '#3399ff',
                },
                message: {
                    value: message,
                    color: '#8C8C8C',

                },
            };
        }
        return data;
    }

    /**
     * 获取天气情况
     */
    async getWeather(city = '北京') {
        const { app } = this;
        const url = 'https://www.tianqiapi.com/api?unescape=1&version=v6&appid=' + app.config.weather.appid + '&appsecret=' + app.config.weather.appsecret + '&city=' + city;
        const result = await this.ctx.curl(url, {
            method: 'get',
            dataType: 'json',
        });
        console.log(result.status);
        // "wea": "多云",
        // "tem": "27", 实时温度
        // "tem1": "27", 高温
        // "tem2": "17", 低温
        // "win": "西风",
        // "air_level": "优",
        if (result && result.status === 200) {
            return result.data;
        }
        return {
            city,
            wea: '未知',
            tem: '未知',
            tem1: '未知',
            tem2: '未知',
            win: '未知',
            win_speed: '未知',
            air_level: '未知',
        };
    }

    /**
     * 获取距离下次发工资还有多少天
     */
    getWageDay() {
        const { app } = this;
        const wage = app.config.time.wageDay;
        // 获取日期 day
        // 如果在 wage号之前或等于wage时 那么就用 wage-day
        // 如果在 wage号之后 那么就用 wage +（当前月总天数-day）
        // 当日 日期day
        const day = moment().date();
        // 当月总天数
        const nowDayTotal = moment().daysInMonth();
        // // 下个月总天数
        let resultDay = 0;
        if (day <= wage) {
            resultDay = wage - day;
        } else {
            resultDay = wage + (nowDayTotal - day);
        }
        return resultDay;
    }

    /**
     * 获取距离下次订婚日有多久
     */
    getMarryDay() {
        const { app } = this;
        const marry = app.config.time.BeEngaged;
        // 获取当前时间戳
        const now = moment(moment().format('YYYY-MM-DD')).valueOf();
        // 获取纪念日 月-日
        const mmdd = moment(marry).format('-MM-DD');
        // 获取当年
        const y = moment().year();
        // 获取今年结婚纪念日时间戳
        const nowTimeNumber = moment(y + mmdd).valueOf();
        // 判断 今天的结婚纪念日 有没有过，如果已经过去（now>nowTimeNumber），resultMarry日期为明年的结婚纪念日
        // 如果还没到，则 结束日期为今年的结婚纪念日
        let resultMarry = nowTimeNumber;
        if (now > nowTimeNumber) {
            // 获取明年纪念日
            resultMarry = moment((y + 1) + mmdd).valueOf();
        }
        return moment(moment(resultMarry).format()).diff(moment(now).format(), 'day');
    }

    /**
     * 获取距离下次生日还有多少天
     */
    getBirthday() {
        const { app } = this;
        const birthday = app.config.time.birthday[moment().year()];
        // 获取当前时间戳
        const now = moment(moment().format('YYYY-MM-DD')).valueOf();
        // 获取纪念日 月-日
        const mmdd = moment(birthday).format('-MM-DD');
        // 获取当年
        const y = moment().year();
        // 获取今年生日 时间戳
        const nowTimeNumber = moment(y + mmdd).valueOf();
        // 判断 生日 有没有过，如果已经过去（now>nowTimeNumber），resultBirthday日期为明年的生日 日期
        // 如果还没到，则 结束日期为今年的目标日期
        let resultBirthday = nowTimeNumber;
        if (now > nowTimeNumber) {
            // 获取明年目标日期
            resultBirthday = moment(app.config.time.birthday[y + 1]).valueOf();
        }
        return moment(moment(resultBirthday).format()).diff(moment(now).format(), 'day');
    }

    /**
     * 获取相识天数
     * @returns {number}
     */
    getAcquaintday() {
        const { app } = this;
        const loveDay = app.config.time.acquaint;
        return moment(moment().format('YYYY-MM-DD')).diff(loveDay, 'day');
    }

    /**
     * 获取相恋天数
     */
    getLoveDay() {
        const { app } = this;
        const loveDay = app.config.time.love;
        return moment(moment().format('YYYY-MM-DD')).diff(loveDay, 'day');
    }

    /**
     * 相恋第几年
     */
    getLoveYear() {
        const { app } = this;
        const loveDay = app.config.time.love;
        return moment().year() - moment(loveDay).year();
    }

    // 获取是第几个生日
    getBirthYear() {
        const { app } = this;
        const birthYear = app.config.time.birthYear;
        return moment().year() - birthYear;
    }

    /**
     *  第几个订婚纪念日
     */
    getMarryYear() {
        const { app } = this;
        const marry = app.config.time.marry;
        return moment().year() - moment(marry).year();
    }

    /**
     * 获取每日一句
     */
    async getOneSentence() {
        const url = 'https://v1.hitokoto.cn/';
        const result = await this.ctx.curl(url, {
            method: 'get',
            dataType: 'json',
        });
        if (result && result.status === 200) {
            return result.data.hitokoto;
        }
        return '今日只有我爱你！';
    }

    /**
     * 获取时间日期
     */
    getDateTime() {
        console.log('moment().weekday()', moment().weekday());
        const week = {
            1: '星期一',
            2: '星期二',
            3: '星期三',
            4: '星期四',
            5: '星期五',
            6: '星期六',
            0: '星期日',
        };
        return moment().format('YYYY年MM月DD日 ') + week[moment().weekday()];
    }

    /**
     * 获取微信token
     */
    async getToken() {
        const {ctx,app} = this;
        const url = `${requestUrl}token?grant_type=client_credential&appid=${app.config.weChat.appId}&secret=${app.config.weChat.secret}`;
        const result = await this.ctx.curl(url, {
            method: 'get',
            dataType: 'json',
        });
        if (result.status === 200) {
            return result.data.access_token;
        }
    }

    /**
     * 获取当前关注的所有用户信息
     */
    async getAllUser(token) {
        const {ctx} = this;
        const url = `${requestUrl}user/get?access_token=${token}&next_openid=`;
        const result = await this.ctx.curl(url, {
            method: 'get',
            dataType: 'json',
        });
        if (result.status === 200) {
            ctx.helper.logger('userList', result.data.data);
            return result.data.data;
        }
    }

}

module.exports = WeiXinService;
