const HttpUtil = require('./http_util')
const uuidv4 = require('uuid/v4')
const crypto = require('crypto')

class WxPay {

  constructor(opt){
    this.appid = opt.app_id
    this.mch_id = opt.mch_id
    this.notify_url = opt.notify_url
    this.key = opt.key
    // this.trade_type = opt.trade_type || 'JSAPI' // JSAPI，NATIVE，APP
  }

  async unifiedOrder(obj){
    
    let unifiedOrderObj = {
      appid : this.appid,
      mch_id : this.mch_id,
      device_info : 'WEB',
      nonce_str : this._getNonceStr(),
      // sign_type : 'MD5',
      body : obj.body,
      detail : obj.detail,
      attach : obj.attach || '',
      out_trade_no : obj.out_trade_no,
      // fee_type : 'CNY',
      total_fee : parseInt(obj.total_fee),
      spbill_create_ip : obj.ip,
      notify_url : this.notify_url,
      trade_type  : obj.payment_type || 'JSAPI'
    }

    let signStr = this._sign(unifiedOrderObj)
    unifiedOrderObj.sign = signStr

    // return unifiedOrderObj

    let unifiedOrderUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
    let result = await HttpUtil.post(unifiedOrderUrl , unifiedOrderObj , 'xml')

    return result
  }

  _sign(obj){

    let key = this.key
    let keySortStr = (obj) => {
      let sdic = Object.keys(obj).sort()
      let strArr = []
      for(let k in sdic){
        strArr.push(sdic[k] + '=' + obj[sdic[k]])
      }
      strArr.push('key=' + key)
      return strArr.join('&')
    }

    let sortStr = keySortStr(obj)
    console.log('========================' , sortStr)
    let signStr = crypto.createHash('md5').update(sortStr).digest('hex')

    return signStr.toUpperCase()
  }

  _getNonceStr(){
    return uuidv4().replace(/-/g,'')
  }
}

module.exports = WxPay