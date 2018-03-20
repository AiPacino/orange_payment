const log = require('./../../lib/log')('alipay_service')
const RESULT_UTILS = require('./../../utils/result_utils')
const OrderModel = require('./../../server/model/order_model')
const OrderService = require('./order_service')
const PaymentService = require('./payment_service')
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
    let total_amount = order.total_fee / 100
    let notify_url = 'http://pay.cc512.com/api/notify/alipay'
    let return_url = order.redirect_url
    let payment_type = order.payment_type.toLowerCase() // 'WAP':手机网站支付 , 'PC':电脑网站
    log.info('unifiedOrder order' , order)
    let result = {code : 0 , message : ''}
    try {
      if(payment_type == 'wap' || payment_type == 'pc'){
        let unifiedOrderResult = await Alipay.pagePay(subject , body , order_no , total_amount , payment_type, notify_url , return_url)
        log.info('unifiedOrder unifiedOrder result' , unifiedOrderResult)
        result.message = unifiedOrderResult
      }else if(payment_type == 'code'){
        let unifiedOrderResult = await Alipay.codePay(subject , body , order_no , total_amount , notify_url)
        let resultCode = unifiedOrderResult.alipay_trade_precreate_response.code
        if(resultCode != '10000'){
          result.code = RESULT_UTILS.PAYMENT_UNIFIED_ORDER_ALIPAY_FAIL.code
          result.message = unifiedOrderResult.alipay_trade_precreate_response.sub_msg
        }else{
          result.data = unifiedOrderResult
        }
        
      }
      
      
    }catch(err) {
      // console.log(err)
      log.info('unifiedOrder unifiedOrder error' , err)
      result = RESULT_UTILS.PAYMENT_UNIFIED_ORDER_ALIPAY_FAIL
    }
    
    let orderInfo = await OrderModel.model().findOne({
      where : {order_no : order_no}
    })
    orderInfo.unifiedorder_info = JSON.stringify(result)
    orderInfo.save()
    
    return result
  }

  async notify(obj){
    let orderNo = obj.out_trade_no || null
    let tradeStatus = obj.trade_status

    // 验证

    if(tradeStatus == 'TRADE_SUCCESS'){

      let order = await OrderModel.model().findOne({
        where : {order_no : orderNo}
      })

      if(!order || !orderNo){
        log.info('notify fail:order' , order)
        return 'FAIL'
      }
      if (order.status == 0){
        log.info('notify fail:order.status' , order.status)
        return 'FAIL'
      }

      let orderStatus = order.status

      let businessMethod = await BusinessMethodModel.model().findOne({
        where : {
          business_id : order.business_id,
          method_key : order.method
        }
      })
      if(!businessMethod){
        log.info('notifyDealOrder config error')
        return 'FAIL:config error'
      }

      let methodConfig = JSON.parse(businessMethod.config)
      let AliPay = new AlipaySdk(methodConfig)
      let signObj = obj
      let verify = AliPay._verify(signObj)
      log.info('notifyDealOrder notify verify data:==========' , verify)
      if(!verify){
        return 'FAIL:verify err'
      }

      order.status = 0
      order.payment_info = JSON.stringify(obj)
      order.payment_user = obj.buyer_logon_id || obj.buyer_id
      await order.save()

      if(orderStatus != 0){
        // 记录流水
        OrderService.recordOrderFee(order.dataValues).then(resOrderRecodeFee => {
          log.info('notifyDealOrder resOrderRecodeFee' , resOrderRecodeFee)
        })

        // 通知商户
        PaymentService.notifyUser(order).then(() => {
          log.info('notifyDealOrder resultNotify:')
        }).catch(err=>{
          log.info('notifyDealOrder err:' , err)
        })
      }
      

      return 'success'
    }else {
      log.info('notify fail:trade status' , tradeStatus)
      return 'FAIL'
    }
    
  }
}

module.exports = new AlipayService()