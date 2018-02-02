const log = require('./../../lib/log')('weixin_service')
const RESULT_UTILS = require('./../../utils/result_utils')
const WxPaySdk = require('./../../sdk/wechat/wx_pay')
const OrderModel = require('./../../server/model/order_model')

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
    
    let unifiedOrderResult = await WxPay.unifiedOrder(body , out_trade_no , total_fee , ip , openid , payment_type)
    
    // 保存数据
    log.info('unifiedOrder result' , unifiedOrderResult)
    let result = {code : 0 , message : '' , data : {}}

    if(unifiedOrderResult.return_code == 'SUCCESS'){
      if(unifiedOrderResult.result_code == 'SUCCESS'){
        result.message = unifiedOrderResult.return_msg
        result.data = unifiedOrderResult
      }else{
        result.code = RESULT_UTILS.PAYMENT_UNIFIED_ORDER_WX_FAIL.code
        result.message = unifiedOrderResult.err_code_des
      }
    
    }else {
      result.code = RESULT_UTILS.PAYMENT_UNIFIED_ORDER_WX_FAIL.code
      result.message = unifiedOrderResult.return_msg
      result.data = unifiedOrderResult

    }

    this._saveUnifiedOrderResult(order.order_no , result)
    return result
  }

  async _saveUnifiedOrderResult(orderNo , unifiedOrderResult){
    let order = await OrderModel.model.findOne({
      where : { order_no : orderNo}
    })
    let unifiedorderInfo = order.unifiedorder_info
    let unifiedorderObj = unifiedorderInfo ? JSON.parse(unifiedorderInfo) : null
    if(!unifiedorderObj || unifiedorderObj.code != 0){
      order.unifiedorder_info = JSON.stringify(unifiedOrderResult)
      order.save()
    }

    return
  }

}

module.exports = new WeixinService()