
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
// const HttpUtils = require('./../../utils/http_utils')

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

    // 检验out_trade_no
    let outTradeNo = obj.out_trade_no
    if(!outTradeNo || outTradeNo.length > 32){
      return RESULT_UTILS.PAYMENT_UNIFIED_OUT_TRADE_NO
    }

    // 检验method
    let methods = paymentConfig.methods
    if(!obj.method || methods.indexOf(obj.method) <= -1){
      return RESULT_UTILS.PAYMENT_UNIFIED_CHCEK_METHOD
    }

    // 检验payment_type
    let types = paymentConfig.type[obj.method]
    let paymentType = obj.payment_type 
    if(!paymentType || !types || types.indexOf(paymentType) <= -1){
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
    let redirectUrl = obj.redirect_url
    if (['JSAPI', 'NATIVE', 'WAP', 'PC'].indexOf(paymentType.toUpperCase()) > -1) {
    
      if (!redirectUrl || (redirectUrl.indexOf('http://') <= -1 && redirectUrl.indexOf('https://') <= -1) ){
        return RESULT_UTILS.PAYMENT_UNIFIED_REDIRECT_URL
      }
    }
    
    let result = RESULT_UTILS.SUCCESS
    result.data = {user_id : user.id , user_key : userKey , user_rate : user.rate_in , business_id : user.business_id}
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
        // orderObj.update_time = parseInt(Date.now / 1000)
        resultData = await orderFind.update(orderObj)
        // resultData = orderFind
      }
    }else{
      // orderObj.create_time = parseInt(Date.now / 1000)
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
      }else if (paymentType == 'JSAPI'){
        // 公众号支付 公众号授权 太麻烦要是对方可以那就可以
        paymentInfo.pay_url = 'http://pay.cc512.com/order/' + orderObj.order_no
        paymentInfo.prepay_id = unifiedOrderRes.data.prepay_id
      }else if (paymentType == 'MWEB'){
        // h5支付
        paymentInfo.pay_url = unifiedOrderRes.data.mweb_url
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

  notifyUserDo(){
    return 'success'
  }
  // 通知下级商户
  // async notifyUsers(orderObj){



  //   // let notifyFunc = async (orderObj , time = 0) => {

  //   //   time++
  //   //   let result = null

  //   //   if(time > 3){
  //   //     result = 'success'
  //   //   }else {
  //   //     let userId = await orderObj.user_id
  //   //     let user = await UserModel.model.findById(userId)
  //   //     let notifyUrl = user.notify_url
    
  //   //     let notifyObj = {
  //   //       result_code : orderObj.status == 0 ? 'SUCCESS' : 'FAIL',
  //   //       method : orderObj.method,
  //   //       app_id : orderObj.app_id,
  //   //       out_trade_no : orderObj.out_trade_no,
  //   //       out_order_no : orderObj.order_no,
  //   //       body : orderObj.body,
  //   //       detail : orderObj.detail,
  //   //       total_fee : orderObj.total_fee,
  //   //       redirect_url :orderObj.redirect_url,
  //   //       payment_type : orderObj.payment_type,
  //   //       payment_user : orderObj.payment_user || '' ,
  //   //       payment_info : orderObj.payment_info
  //   //     }
        
  //   //     log.info('/notifyUser notifyUrl' , notifyUrl , time)
  //   //     try {
  //   //       result = await HttpUtils.post(notifyUrl , notifyObj)
  //   //       log.info('/notifyUser result' , result , time)
  //   //     }catch (err){
  //   //       log.info('/notifyUser err' , err)
  //   //     }
        
  //   //   }

  //   //   if(result != 'success'){
  //   //     setTimeout(async () => {
  //   //       await notifyFunc(orderObj , time)
  //   //     }, 5000)

  //   //   }
        
  //   // }

  //   // notifyFunc(orderObj)
    
  // }
  
}

module.exports = new PaymentService()