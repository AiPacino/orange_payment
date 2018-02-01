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
}

module.exports = WxPubSdk