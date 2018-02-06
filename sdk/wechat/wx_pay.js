const HttpUtil = require('./http_util')
const uuidv4 = require('uuid/v4')
const crypto = require('crypto')
const xml2js = require('xml2js')

const API_URL = 'https://api.mch.weixin.qq.com'

const SERVICE_BUSIBESS_INFO = {
  app_id : 'wx9070c69e2b42f307',
  mch_id : '1492085702',
  key : 'e32c20bfc10d5c677b5db96ec57247fc'
}

// h5支付 scene_info
/**
 1，IOS移动应用
{"h5_info": //h5支付固定传"h5_info" 
    {"type": "",  //场景类型
     "app_name": "",  //应用名
     "bundle_id": ""  //bundle_id
     }
}

 2，安卓移动应用
{"h5_info": //h5支付固定传"h5_info" 
    {"type": "",  //场景类型
     "app_name": "",  //应用名
     "package_name": ""  //包名
     }
}

3，WAP网站应用
{"h5_info": //h5支付固定传"h5_info" 
   {"type": "Wap",  //场景类型
    "wap_url": "",//WAP网站URL地址
    "wap_name": ""  //WAP 网站名
    }
}

 */

/**
 * 
 trade_type :
  JSAPI ： 公众号
  NATIVE : 原生(扫码)
  MWEB : h5
  APP: app
 */

class WxPay {

  constructor(opt , isCommon = 1){

    this.isCommon = isCommon

    if(isCommon == 1){
      // 普通商户
      this.appid = opt.app_id
      this.mch_id = opt.mch_id
      this.key = opt.key

      this.sub_appid = null
      this.sub_mch_id = null
    }else{

      // 服务商
      this.appid = SERVICE_BUSIBESS_INFO.app_id
      this.mch_id = SERVICE_BUSIBESS_INFO.mch_id
      this.key = SERVICE_BUSIBESS_INFO.key

      this.sub_appid = opt.app_id
      this.sub_mch_id = opt.mch_id
      
    }

    this.notify_url = opt.notify_url
    this.h5_url = opt.h5_url

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
      trade_type  : payment_type || 'JSAPI', // trade_type为JSAPI时必须传openid
      // openid : openid
    }

    if(this.isCommon){
      unifiedOrderObj.openid = openid
    }else{
      unifiedOrderObj.sub_appid = this.sub_appid
      unifiedOrderObj.sub_mch_id = this.sub_mch_id
      unifiedOrderObj.sub_openid = openid
    }

    if(payment_type == 'MWEB'){
      let h5Info = {
        type : 'Wap',
        wap_url : this.h5_url,
        wap_name : body
      }
      unifiedOrderObj.scene_info = JSON.stringify(h5Info)
    }

    let signStr = this._sign(unifiedOrderObj)
    unifiedOrderObj.sign = signStr

    // return unifiedOrderObj

    let unifiedOrderUrl = API_URL + '/pay/unifiedorder'
    let response = await HttpUtil.post(unifiedOrderUrl , unifiedOrderObj , 'xml')

    let result = await this._xmlToObj(response)
    return result
  }

  _sign(signObj){

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