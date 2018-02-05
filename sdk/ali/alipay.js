const moment = require('moment')
const crypto = require('crypto')
const request = require('request')
// const getWayUrl = 'https://openapi.alipay.com/gateway.do' // 正式环境
const getWayUrl = 'https://openapi.alipaydev.com/gateway.do' // 测试环境

const PRODUCT_CODE = {
  WAP : 'QUICK_WAP_WAY',
  PC : 'FAST_INSTANT_TRADE_PAY'
}

const METHOD = {
  WAP : 'alipay.trade.wap.pay',
  PC : 'alipay.trade.page.pay'
}

class AlipaySdk {

  constructor(opt){
    this.appId = opt.app_id
    this.getWayUrl = getWayUrl
    this.rsaPrivateKey = '-----BEGIN RSA PRIVATE KEY-----\n' + opt.rsa_private_key + '\n-----END RSA PRIVATE KEY-----'
    this.alipayPubKey = '-----BEGIN CERTIFICATE-----\n' + opt.alipay_public_key + '\n-----END CERTIFICATE-----'
  }

  async pagePay(subject , body , order_no , total_amount , payment_type, notify_url , return_url = ''){
    let method = METHOD[payment_type.toUpperCase()]
    let product_code = PRODUCT_CODE[payment_type.toUpperCase()]

    let requestObj = {}
    requestObj.app_id= this.appId
    requestObj.method = method
    requestObj.format = 'json'
    requestObj.return_url = return_url
    requestObj.charset = 'utf-8'
    requestObj.sign_type = 'RSA2'
    requestObj.timestamp = this._dateFormat(null , 'YYYY-MM-DD HH:mm:ss')
    requestObj.notify_url = notify_url
    requestObj.version = '1.0'

    let bizContent = {}
    bizContent.subject = subject
    bizContent.body = body
    bizContent.out_trade_no = order_no
    bizContent.total_amount = total_amount
    bizContent.product_code = product_code
    // bizContent.notify_url = notify_url

    requestObj.biz_content = JSON.stringify(bizContent)
    let sign = this._sign(requestObj , this.rsaPrivateKey)
    requestObj.sign = sign

    // console.log(sign)
    let action = this._buildRquestUrl(requestObj)
    // console.log(action)
    // let resultRequest = await this._requestGet(action)
    return action
    // return resultRequest
  }

  _dateFormat (timestamp, format) {
    format = format || 'YYYY-MM-DD HH:mm'
    let date = null
    if (!timestamp) {
      date = new Date()
    } else {
      date = new Date(timestamp * 1000)
    }
    //logger.debug(date);
    return moment(date).format(format)
  }

  // 签名
  _sign(signObj , key ){
    
    let sortStr = this._keySortStr(signObj)
    console.log('sort str ==================' , sortStr)
    let sign = crypto.createSign('RSA-SHA256')
    sign.update(sortStr)

    return sign.sign(key, 'base64')

  }

  _verify(signObj , signature){
    let signStr = this._keySortStr(signObj)
    console.log('sginStr===========' , signStr)
    let verify = crypto.createVerify('RSA-SHA256')
    verify.update(signStr)
    return verify.verify(this.alipayPubKey, signature , 'base64')

  }

  // 对象按照key排序转化成字符串
  _keySortStr(obj) {
    let sdic = Object.keys(obj).sort()
    let strArr = []
    for (let k in sdic) {
      if (obj[sdic[k]]) {
        strArr.push(sdic[k] + '=' + obj[sdic[k]])
      }
    }
    return strArr.join('&')
  }

  _buildRquestUrl(params){
    let paramsArr = []
    for (let key in params) {
      let paramsValue = encodeURIComponent(params[key])
      paramsArr.push(key + '=' + paramsValue)
    }
    let paramsStr = paramsArr.join('&')
    let url = this.getWayUrl + '?' + paramsStr
    return url
  }

  _requestPost(action, data) {

    let contentType = 'application/json'
    let body = data

    return new Promise((resolve, reject) => {
      request({
        url: action,
        method: 'POST',
        json: true,
        headers: {
          'content-type': contentType,
        },
        body: body
      }, function (error, response, body) {
        if (error) {
          reject(response)
        }
        if (!error && response.statusCode == 200) {
          resolve(body)
        }
      })
    })
  }

  _requestGet(action){
    return new Promise((resolve, reject) => {
      request( action, (error, response, body) => {
        if(error){
          reject(error)
        }
        
        if (!error && response.statusCode == 200) {
          resolve(body)
        }
      })
    })
  }
}

module.exports = AlipaySdk