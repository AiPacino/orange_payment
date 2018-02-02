const express = require('express')
const router = express.Router()
const config = require('./../../../config/index')
const httpUtils = require('./../../../utils/http_utils')
const WeixinService = require('./../../service/weixin_service')
const log = require('./../../../lib/log')('demo-wechat')

router.use((req , res , next) => {

  if(process.env.NODE_ENV != 'production'){
    req.session.openid = 'oLOGI0lDCn1OH19JzDkzItpmPsaU'
  }

  let openid = req.session.openid || null
  log.info('/demo-wecaht openid' , openid)
  if(!openid){
    req.session.redirect_uri = req.protocol + '://' +  req.hostname + req.originalUrl
    return res.redirect('/demo/auth')
  }
  next()
})

router.get('/' , async (req , res) => {
  
  res.render('demo/wechat')
})

router.get('/pay' , async (req , res) => {

  log.info('/pay openid' , req.session.openid)

  // 支付下单
  let openid = req.session.openid
  let businessId = req.query.business_id || 'e32c20bfc10d5c677b5db96ec57247fc'
  let action = config.host_api + ':' + config.port_api
  action += '/api/payment/unifiedOrder?business_id=' + businessId
  log.info('/pay action' , action)
  let orderObj = {
    method: 'wx', // 支付方式 wx:微信
    out_trade_no : 'dsgdfhafdshfdshhsadhg', // 第三方订单号
    body : '公众号支付test' , // 订单说明
    detail : '' , // 订单详情
    total_fee : 1 , // 订单金额,精确到分
    redirect_url : req.protocol + '://' +  req.hostname + '/demo/wechat/paySucc' , // 支付完成跳转链接
    payment_type : 'JSAPI',
    payment_user : openid // wx JSAPI传openid
  }
  log.info('/pay orderObj' . orderObj)
  let orderRes = await httpUtils.post(action , orderObj)
  if(orderRes.code != 0){
    return res.send(orderRes.message)
  }

  let opt = config.wx_opt
  log.info('/pay opt' , opt)

  // 预支付数据
  let prepayId = orderRes.data.prepay_id
  log.info('/pay prepayId' , prepayId)
  let wxPay = WeixinService.wxPayJsInit(opt , prepayId)
  res.locals.wxPay = wxPay

  // jssdk init
  let url = req.protocol + '://' +  req.hostname + req.originalUrl
  let jssdk = await WeixinService.jssdkInit(opt , url)
  log.info('/pay jssdk' , jssdk)
  res.locals.jssdk = jssdk

  res.render('demo/wechat_pay')

})

module.exports = router