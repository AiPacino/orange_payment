const Request = require('request')
const config = require('./../../config/index').mini_app


class WxMiniAppSdk {

  constructor(){
    this.app_id = config.app_id
    this.app_secret = config.app_secret
  }

  async getSessionKey(code){
    let url = this._getSessionKeyUrl(code)
    let result = await this._httpGet(url)
    return result
  }

  _getSessionKeyUrl(code){
    return 'https://api.weixin.qq.com/sns/jscode2session?appid='+this.app_id+'&secret='+this.app_secret+'&js_code='+code+'&grant_type=authorization_code'
  }

  _httpPost(url , data){
    return new Promise((resolve , reject) => {
      Request.post({
        url : url ,
        form : data
      } , (err , response , body) =>{
        if(err){
          reject(err)
        }

        let jsonBody = JSON.parse(body)
        resolve(jsonBody)
      })
    })
  }

  _httpGet(url){
    return new Promise((resolve , reject) => {
      Request.post(url , (err , response , body) =>{
        if(err){
          reject(err)
        }

        let jsonBody = JSON.parse(body)
        resolve(jsonBody)
      })
    })
  }
}

module.exports = new WxMiniAppSdk()