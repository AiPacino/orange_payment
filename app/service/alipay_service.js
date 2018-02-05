const log = require('./../../lib/log')('alipay_service')
const RESULT_UTILS = require('./../../utils/result_utils')
const OrderModel = require('./../../server/model/order_model')
const BusinessModel = require('./../../server/model/business_model')
const BusinessMethodModel = require('./../../server/model/business_method_model')
const AlipaySdk = require('./../../sdk/ali/alipay')

class AlipayService {

  // 支付下单
  async unifiedOrder(order , opt){

    let alipayOpt = {}
    alipayOpt.app_id = opt.app_id
    alipayOpt.rsa_private_key = opt.rsa_private_key
    alipayOpt.alipay_public_key = opt.alipay_public_key

    let Alipay = new AlipaySdk(opt)

    let subject = order.body
    let body = order.detail
    let order_no = order.order_no
    let total_amount = order.total_fee
    let notify_url = 'http://pay.cc512.com/api/notify/alipay'
    let return_url = order.redirect_url
    let product_code = order.payment_type // 'QUICK_WAP_WAY':手机网站支付

    let result = {code : 0 , message : ''}
    try {
      let unifiedOrderResult = await Alipay.wapPay(subject , body , order_no , total_amount , product_code, notify_url , return_url)
      log.info('unifiedOrder unifiedOrder result' , unifiedOrderResult)
      result.message = unifiedOrderResult
    }catch(err) {
      log.info('unifiedOrder unifiedOrder error' , err)
      result = RESULT_UTILS.PAYMENT_UNIFIED_ORDER_ALIPAY_FAIL
    }
    
    return result
  }
}

module.exports = new AlipayService()