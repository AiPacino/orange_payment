
const OrderModel = require('./../../server/model/order_model')
const WeixinService = require('./../service/weixin_service')
const AlipayService = require('./../service/alipay_service')
const UserModel = require('./../../server/model/user_model')
const Uuid = require('./../../utils/uuid_utils')
const RESULT_UTILS = require('./../../utils/result_utils')
const log = require('./../../lib/log')('payment_service')
const cryptoUtils = require('./../../utils/crypto_utils')
const paymentConfig = require('./../../config/index').payment
const testCode = require('./../../config/index').test_code

class PaymentService {

  // 检验
  async checkRequest(obj){
    // 检测app_id(user uuid)
    let user = await UserModel.model.findOne({where : {uuid : obj.app_id}})
    if(!user || user.status == 0){
      return RESULT_UTILS.PAYMENT_UNIFIED_CHCEK_USER
    }
    log.info('checkRequest user ' , user)
    // 验证签名
    let userKey = user.key
    let checkRes = cryptoUtils.checkMd5(obj , userKey)
    if(!checkRes){
      if(obj.is_test && obj.is_test == testCode){
        delete obj.is_test
      }else{
        return RESULT_UTILS.PAYMENT_UNIFIED_CHCEK_SIGN
      }
      
    }

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

    // 检验notify_url
    let notifyUrl = obj.notify_url
    if(!notifyUrl || notifyUrl.indexOf('http://') <= -1 || notifyUrl.indexOf('https://')){
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
      // 微信支付
      result.message = unifiedOrderRes.message
      let paymentType = orderObj.payment_type.toUpperCase()
      if(paymentType == 'NATIVE'){
        // 原生扫码
        paymentInfo.code_url = unifiedOrderRes.data.code_url,
        paymentInfo.prepay_id = unifiedOrderRes.data.prepay_id
      }
    }else if(orderObj.method == 'alipay'){
      // 支付宝
      result.message = 'SUCCESS'
      let paymentType = orderObj.payment_type.toLowerCase()
      if(paymentType == 'wap'){
        // 移动端h5
        paymentInfo.pay_url_wap = unifiedOrderRes.message
      }else if(paymentType == 'pc'){
        // pc电脑
        paymentInfo.pay_url_pc = unifiedOrderRes.message
      }else if(paymentType == 'code') {
        // 二维码
        paymentInfo.code_url = unifiedOrderRes.data.alipay_trade_precreate_response.qr_code
      }

    }

    result.data.payment_info = paymentInfo ? JSON.stringify(paymentInfo) : ''
    result.data.sign = cryptoUtils.md5ByKey(result.data , signKey)
    return result
  }

  
}

module.exports = new PaymentService()