const express = require('express')
const router = express.Router()
const BusinessService = require('./../../service/business_service')
const PaymentService = require('./../../service/payment_service')
const RESULT_CODE = require('./../../../utils/result_utils')
const log = require('./../../../lib/log')('api-payment')
const Uuid = require('./../../../utils/uuid_utils')

// 中间件处理逻辑
router.use( async (req , res , next) =>{

  let accessToken = req.query.access_token
  let businessId = req.query.business_id

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
  orderObj.business_id = req.business.id
  orderObj.business_uuid = req.business.uuid

  // 找到支付配置
  let payOpt = await BusinessService.getMethodConfig(req.business.id , orderObj.method)
  if(!payOpt){
    return res.json(RESULT_CODE.BUSINESS_PAY_CONFIG_ERROR)
  }
  
  if(!req.body.out_trade_no && process.env.NODE_MODE != 'production'){
    orderObj.out_trade_no = Uuid.v4()
  }

  log.info('/unifiedOrder orderObj' , orderObj)
  let orderRes = await PaymentService.createOrder(orderObj)
  if(orderRes.code > 0){
    return res.json(orderRes)
  }

  let unifiedOrderObj = orderRes.data
  unifiedOrderObj.ip = '127.0.0.1'
  let unifiedOrderResult = await PaymentService.unifiedOrder(unifiedOrderObj , payOpt)

  res.json(unifiedOrderResult)
  
})


module.exports = router