const log = require('./../../lib/log')('weixin_pub_service')
const WxPubSdk = require('./../../sdk/wechat/wx_pub')

class WeixinPubService {

  getAuthorizeUrl(redirectUri , opt){

    let wxOpt = {}
    wxOpt.app_id = opt.app_id
    wxOpt.app_secret = opt.app_secret
    
    let WxPub = new WxPubSdk(wxOpt)
    let authorizeUrl = WxPub.getAuthorizeUrl(redirectUri)
    log.info('getAuthorizeUrl authorizeUrl:' , authorizeUrl)
    return authorizeUrl
  }

  async getAuthorizationCode(code , opt = {}){

    let wxOpt = {}
    wxOpt.app_id = opt.app_id
    wxOpt.app_secret = opt.app_secret
    log.info('getAuthorizationCode code' , code)
    let WxPub = new WxPubSdk(wxOpt)
    let authorizeData = await WxPub.getAuthorizationCode(code)
    return authorizeData
  }
}

module.exports = new WeixinPubService()