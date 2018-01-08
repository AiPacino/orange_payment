const log = require('./../../lib/log')('service-wx-mini-app')
const WxMiniAppSdk = require('./../common/wx_mini_app_sdk')

class WxMiniAppService {

  async getSessionKey(code){
    let data = await WxMiniAppSdk.getSessionKey(code)
    log.info('getSessionKey data' , data)
    return data
  }

}

module.exports = new WxMiniAppService()