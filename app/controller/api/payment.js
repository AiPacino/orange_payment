const express = require('express')
const router = express.Router()
const BusinessService = require('./../../service/business_service')
const PaymentService = require('./../../service/payment_service')
const RESULT_CODE = require('./../../../utils/result_utils')
const log = require('./../../../lib/log')('api-payment')
const Uuid = require('./../../../utils/uuid_utils')

// 计算手续费
let formateFee = (num) => {
  log.info(num)
  if(num > 0){
    if (num < 0.1){
      return 0
    }else {
      if (num > 0.1 && num < 1){
        return 1
      }else {
        return parseInt(num)
      }
    }
  }else{
    return 0
  }
}

// 中间件处理逻辑
router.use( async (req , res , next) =>{

  let businessId = req.query.business_id || 'e32c20bfc10d5c677b5db96ec57247fc'

  let business = await BusinessService.getByUuid(businessId)
  if(!business){
    res.json(RESULT_CODE.BUSINESS_FIND_ERROR)
    res.end()
  }
  
  req.business = business.dataValues
  log.info(req.business)

  next()
})

router.post('/createOrder' , async(req , res) => {
  // let { method , out_trade_no ,body ,detail ,total_fee ,redirect_url } = req.body

  let orderObj = req.body
  log.info('/createOrder  req.business' , req.business)
  orderObj.business_id = req.business.id
  orderObj.business_uuid = req.business.uuid

  let checkRes = await PaymentService.checkRequest(orderObj)
  if(checkRes.code > 0){
    return res.json(checkRes)
  }
  orderObj.user_id = checkRes.data.user_id
  // let userSignKey = checkRes.data.user_key // 签名秘钥
  let userRate = checkRes.data.user_rate
  log.info('/createOrder userRate' , userRate)
  
  // 找到支付配置 isCommon 是否普通商户 支付费率
  let [payOpt , isCommon  , rate , opens] = await BusinessService.getMethodConfig(req.business.id , orderObj.method)
  if(!payOpt){
    return res.json(RESULT_CODE.BUSINESS_PAY_CONFIG_ERROR)
  }
  // 验证资质商权限 opens payment_type
  let paymentType = orderObj.payment_type
  if(opens.indexOf(paymentType) <= -1){
    return res.json(RESULT_CODE.BUSINESS_PAY_OPENS_NOT_MATCH)
  }
  log.info('/createOrder busiRate' , rate)
  
  // 手续费
  let poundageFee = orderObj.total_fee * rate / 100
  orderObj.poundage_fee = formateFee(poundageFee)
  let serviceFee = orderObj.total_fee * userRate / 100
  orderObj.service_fee = formateFee(serviceFee)

  if(!req.body.out_trade_no && process.env.NODE_MODE != 'production'){
    orderObj.out_trade_no = Uuid.v4()
  }

  log.info('/createOrder orderObj' , orderObj)
  let result = await PaymentService.createOrder(orderObj)
  res.json(result)

})

// 支付下单
router.post('/unifiedOrder' , async (req , res) => {

  let orderObj = req.body
  log.info('/unifiedOrder  req.body' , req.body)
  log.info('/unifiedOrder  req.business' , req.business)

  // 验证请求
  let checkRes = await PaymentService.checkRequest(orderObj)
  if(checkRes.code > 0){
    return res.json(checkRes)
  }
  orderObj.user_id = checkRes.data.user_id
  let userSignKey = checkRes.data.user_key // 签名秘钥
  let userRate = checkRes.data.user_rate

  orderObj.business_id = req.business.id
  orderObj.business_uuid = req.business.uuid

  
  // 找到支付配置 isCommon 是否普通商户 支付费率
  let [payOpt , isCommon  , rate , opens] = await BusinessService.getMethodConfig(req.business.id , orderObj.method)
  if(!payOpt){
    return res.json(RESULT_CODE.BUSINESS_PAY_CONFIG_ERROR)
  }
  // 验证资质商权限 opens payment_type
  let paymentType = orderObj.payment_type
  if(opens.indexOf(paymentType) <= -1){
    return res.json(RESULT_CODE.BUSINESS_PAY_OPENS_NOT_MATCH)
  }
 
  // 手续费
  let poundageFee = orderObj.total_fee * rate / 100
  orderObj.poundage_fee = formateFee(poundageFee)
  let serviceFee = orderObj.total_fee * userRate / 100
  orderObj.service_fee = formateFee(serviceFee)
  
  if(!req.body.out_trade_no && process.env.NODE_MODE != 'production'){
    orderObj.out_trade_no = Uuid.v4()
  }

  log.info('/unifiedOrder orderObj' , orderObj)
  let orderRes = await PaymentService.createOrder(orderObj)
  if(orderRes.code > 0){
    return res.json(orderRes)
  }

  let unifiedOrderObj = orderRes.data
  unifiedOrderObj.ip = req.connection.remoteAddress.replace('::ffff:' , '') || '127.0.0.1'
  log.info('/unifiedOrder ip' , unifiedOrderObj.ip )
  
  // 下单
  let unifiedOrderResult = await PaymentService.unifiedOrder(unifiedOrderObj , payOpt , isCommon)
  if(unifiedOrderResult.code > 0){
    return res.json(unifiedOrderResult)
  }

  // 构建返回数据
  let returnData = PaymentService.buildUnifiedOrderReturnData(unifiedOrderObj , unifiedOrderResult , userSignKey)
  res.json(returnData)
  
})


module.exports = router