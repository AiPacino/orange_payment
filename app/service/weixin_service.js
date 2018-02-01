const log = require('./../../lib/log')('weixin_service')
const RESULT_UTILS = require('./../../utils/result_utils')
const WxPaySdk = require('./../../sdk/wechat/wx_pay')

class WeixinService {

  async unifiedOrder(order , opt){

    let wxPayOpt = {}
    wxPayOpt.app_id = opt.app_id
    wxPayOpt.mch_id = opt.mch_id
    wxPayOpt.notify_url = 'https://pay.cc512.com/api/notify/wxpay'
    wxPayOpt.key = opt.key
    
    let WxPay = new WxPaySdk(wxPayOpt)
    let resultData = await WxPay.unifiedOrder(order)
    return resultData
  }


}

module.exports = new WeixinService()