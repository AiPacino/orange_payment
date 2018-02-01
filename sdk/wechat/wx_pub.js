const httpUtil = require('./http_util')

class WxPubSdk {

  constructor(opt){
    this.appid = opt.app_id
    this.app_secret = opt.app_secret

  }

  getAuthorizeUrl(redirectUri , scope = 'snsapi_base'){

    let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
    url += 'appid=' + this.appid
    url += '&redirect_uri=' + redirectUri
    url += '&response_type=code'
    url += '&scope=' + scope
    url += '&state=STATE#wechat_redirect'

    return url
  }

  async getAuthorizationCode(code){
    let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?'
    url += 'appid=' + this.appid
    url += '&secret=' + this.app_secret
    url += '&code=' + code
    url += '&grant_type=authorization_code'

    let result = await httpUtil.post(url , {})
    return result
  }
}

module.exports = WxPubSdk