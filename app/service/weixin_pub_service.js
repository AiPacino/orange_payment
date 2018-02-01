const log = require('./../../lib/log')('weixin_pub_service')
const RESULT_UTILS = require('./../../utils/result_utils')
const WxPubSdk = require('./../../sdk/wechat/wx_pub')

class WeixinPubService {

  getAuthorizeUrl(redirectUri , opt){

    let wxOpt = {}
    wxOpt.app_id = opt.app_id
    wxOpt.app_secret = opt.app_secret
    
    let WxPay = new WxPubSdk(wxOpt)
    let authorizeUrl = WxPay.getAuthorizeUrl(redirectUri)
    return authorizeUrl
  }

  async getAuthorizationCode(code , opt = {}){

    let wxOpt = {}
    wxOpt.app_id = opt.app_id
    wxOpt.app_secret = opt.app_secret
    
    let WxPay = new WxPubSdk(wxOpt)
    let authorizeData = await WxPay.getAuthorizationCode(code , wxOpt)
    return authorizeData
  }
}

module.exports = new WeixinPubService()