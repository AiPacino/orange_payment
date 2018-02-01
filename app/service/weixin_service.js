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
    let body = order.body
    let out_trade_no = order.out_trade_no
    let total_fee = order.total_fee
    let ip = order.ip
    let openid = order.payment_user
    let payment_type = order.payment_type
    
    let resultData = await WxPay.unifiedOrder(body , out_trade_no , total_fee , ip , openid , payment_type)
    return resultData
  }


}

module.exports = new WeixinService()