const HttpUtil = require('./http_util')
const uuidv4 = require('uuid/v4')
const crypto = require('crypto')
const xml2js = require('xml2js')

class WxPay {

  constructor(opt){
    this.appid = opt.app_id
    this.mch_id = opt.mch_id
    this.notify_url = opt.notify_url
    this.key = opt.key
    // this.trade_type = opt.trade_type || 'JSAPI' // JSAPI，NATIVE，APP
  }

  async unifiedOrder(body , out_trade_no , total_fee , ip , openid = '', payment_type = 'JSAPI' , attach = ''){
    
    let unifiedOrderObj = {
      appid : this.appid,
      mch_id : this.mch_id,
      device_info : 'WEB',
      nonce_str : this._getNonceStr(),
      sign_type : 'MD5',
      body : body,
      // detail : obj.detail,
      attach : attach || '',
      out_trade_no : out_trade_no,
      fee_type : 'CNY',
      total_fee : parseInt(total_fee),
      spbill_create_ip : ip,
      notify_url : this.notify_url,
      trade_type  : payment_type || 'JSAPI',
      openid : openid
    }

    let signStr = this._sign(unifiedOrderObj)
    unifiedOrderObj.sign = signStr

    // return unifiedOrderObj

    let unifiedOrderUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
    let response = await HttpUtil.post(unifiedOrderUrl , unifiedOrderObj , 'xml')

    let result = await this._xmlToObj(response)
    return result
  }

  _sign(signObj){

    // let key = this.key
    // let keySortStr = (obj) => {
    //   let sdic = Object.keys(obj).sort()
    //   let strArr = []
    //   for(let k in sdic){
    //     if(obj[sdic[k]]){
    //       strArr.push(sdic[k] + '=' + obj[sdic[k]])
    //     }
    //   }
    //   strArr.push('key=' + key)
    //   return strArr.join('&')
    // }

    let sortStr = this._keySortStr(signObj , this.key)
    // console.log('========================' , sortStr)
    let hash = crypto.createHash('md5')
    hash.update(sortStr)
    let signStr = hash.digest('hex')

    return signStr.toUpperCase()
  }

  // 随机生成nonce_str
  _getNonceStr(){
    return uuidv4().replace(/-/g,'')
  }

  // 对象按照key排序转化成字符串
  _keySortStr(obj, key = '') {
    let sdic = Object.keys(obj).sort()
    let strArr = []
    for (let k in sdic) {
      if (obj[sdic[k]]) {
        strArr.push(sdic[k] + '=' + obj[sdic[k]])
      }
    }
    if (key) {
      strArr.push('key=' + key)
    }
    return strArr.join('&')
  }

  _xmlToObj(xml){
    var parseString = xml2js.parseString
    return new Promise((resolve , reject) => {
      parseString(xml, { explicitArray: false } , (err, result) => {
        if(err) {
          reject(err)
        }
        resolve(result.xml)
      })
    })
   
  }
}

module.exports = WxPay