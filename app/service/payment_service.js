
const OrderModel = require('./../../server/model/order_model')
const WeixinService = require('./../service/weixin_service')
const AlipayService = require('./../service/alipay_service')
const UserModel = require('./../../server/model/user_model')
const Uuid = require('./../../utils/uuid_utils')
const RESULT_UTILS = require('./../../utils/result_utils')
const log = require('./../../lib/log')('payment_service')
const cryptoUtils = require('./../../utils/crypto_utils')
const paymentConfig = require('./../../config/index').payment

class PaymentService {

  // 检验
  async checkRequest(obj){
    // 检测app_id(user uuid)
    let user = await UserModel.model.findOne({where : {uuid : obj.app_id}})
    if(!user || user.status == 0){
      return RESULT_UTILS.PAYMENT_UNIFIED_CHCEK_USER
    }

    // 验证签名
    let userKey = user.key

    // 检验method
    let methods = paymentConfig.methods
    if(!obj.method || methods.indexOf(obj.method) <= -1){
      return RESULT_UTILS.PAYMENT_UNIFIED_CHCEK_METHOD
    }

    // 检验payment_type
    let types = paymentConfig.type[obj.method]
    if(!obj.payment_type || !types || types.indexOf(obj.payment_type) <= -1){
      return RESULT_UTILS.PAYMENT_UNIFIED_CHCEK_PAYMENT_TYPE
    }

    // 检验body
    if(!obj.body || obj.body.length > 32){
      return RESULT_UTILS.PAYMENT_UNIFIED_CHCEK_BODY
    }

    // 检验total_fee
    let total_fee = parseInt(obj.total_fee)
    if (isNaN(total_fee) || total_fee < 0){
      return RESULT_UTILS.PAYMENT_UNIFIED_TOTAL_FEE
    }

    let result = RESULT_UTILS.SUCCESS
    result.data = {user_id : user.id , user_key : userKey , user_rate : user.rate_in}
    return result
  }

  async createOrder(orderObj){

    let orderUuid = Uuid.v4()
    orderObj.uuid = orderUuid
    orderObj.order_no = orderUuid

    log.info('createORder orderObj' , orderObj)

    let orderFind = await OrderModel.model.findOne({
      where : {
        business_id : orderObj.business_id,
        out_trade_no : orderObj.out_trade_no
      }
    })

    log.info('createOrder orderFind' , orderFind)

    let resultData = {}
    if(orderFind){
      let status = orderFind.status
      if(status == 0){
        return RESULT_UTILS.ORDER_STATUS_0
      }else {
        resultData = await orderFind.update(orderObj)
        // resultData = orderFind
      }
    }else{

      let order = await OrderModel.model.create(orderObj)
      log.info('createOrder order' , order)
      resultData = order
    }

    log.info('/createOrder resultData' , resultData)
    let result = RESULT_UTILS.SUCCESS
    result.data = {
      app_id : resultData.app_id,
      user_id : resultData.user_id,
      business_id : resultData.business_uuid,
      order_no : resultData.order_no,
      out_trade_no : resultData.out_trade_no,
      body : resultData.body,
      detail : resultData.detail,
      total_fee :resultData.total_fee,
      redirect_url : resultData.redirect_url,
      payment_type : resultData.payment_type,
      payment_user : resultData.payment_user,
      method :resultData.method,
      poundage_fee : resultData.poundage_fee,
      service_fee : resultData.service_fee
      // unifiedorder_info : resultData.unifiedorder_info,
    }
    return result
  }

  async unifiedOrder(orderObj , opt = {} , isCommon = 1){
    
    let result = null
    let method = orderObj.method
    if(method == 'wx'){
      // 微信支付
      result = await WeixinService.unifiedOrder(orderObj , opt , isCommon)
    }else if(method == 'alipay'){
      // 支付宝
      result = await AlipayService.unifiedOrder(orderObj , opt)
    }else {

      result = RESULT_UTILS.PAYMENT_UNIFIED_ORDER_TYPE_ERR
    }

    return result
  }

  // 构造返回数据
  buildUnifiedOrderReturnData(orderObj , unifiedOrderRes , signKey = ''){

    let result = {code : 0 , message : '' , data : {}}
    result.code = unifiedOrderRes.code
    result.message = unifiedOrderRes.message
    result.data = {
      result_code : unifiedOrderRes.code == 0 ? 'SUCCESS' : 'FAIL',
      method : orderObj.method,
      app_id : orderObj.app_id,
      out_trade_no : orderObj.out_trade_no,
      out_order_no : orderObj.order_no,
      body : orderObj.body,
      detail : orderObj.detail,
      total_fee : orderObj.total_fee,
      redirect_url :orderObj.redirect_url,
      payment_type : orderObj.payment_type,
    }

    let paymentInfo = {}
    if(orderObj.method == 'wx'){
      if(orderObj.payment_type.toUpperCase() == 'NATIVE'){
        paymentInfo.code_url = unifiedOrderRes.data.code_url,
        paymentInfo.prepay_id = unifiedOrderRes.data.prepay_id
      }
    }

    result.data.payment_info = paymentInfo ? JSON.stringify(paymentInfo) : ''
    result.data.sign = cryptoUtils.md5ByKey(result.data , signKey)
    return result
  }

  
}

module.exports = new PaymentService()