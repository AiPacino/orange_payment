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
    // console.log('===========' , url)
    let result = await httpUtil.post(url , '')

    return result
  }

  async getAccessToken(){

    let url = 'https://api.weixin.qq.com/cgi-bin/token?'
    url += 'grant_type=client_credential'
    url += '&appid=' + this.appid
    url += '&secret=' + this.app_secret
    // console.log('====================' , url)
    let result = await httpUtil.get(url)
    // console.log(result)
    let accessToken = JSON.parse(result)
    if(accessToken.hasOwnProperty('access_token')){
      return accessToken
    }else{
      return null
    }
  }

  async getJsapiTicket(accessToken){
    let url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?'
    url += 'access_token=' + accessToken+ '&type=jsapi'
    
    let result = await httpUtil.get(url)
    let jssapiTicket = JSON.parse(result)
    if(jssapiTicket.hasOwnProperty('ticket')){
      return jssapiTicket
    }else {
      return null
    }
    // return result
  }
}

module.exports = WxPubSdk