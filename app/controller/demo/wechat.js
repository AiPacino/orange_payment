const express = require('express')
const router = express.Router()
const config = require('./../../../config/index')
const httpUtils = require('./../../../utils/http_utils')
const WeixinService = require('./../../service/weixin_service')
const log = require('./../../../lib/log')('demo-wechat')
const Uuid = require('./../../../utils/uuid_utils')

router.use((req , res , next) => {

  // if(process.env.NODE_ENV != 'production'){
  //   // req.session.openid = 'oLOGI0lDCn1OH19JzDkzItpmPsaU'
  // }

  let openid = req.session.openid || null
  log.info('/demo-wecaht openid' , openid)

  // 扫码直接进入需要授权
  // let reqUrl = req.originalUrl
  // if(reqUrl.indexOf('type=NATIVE') > -1){
  //   next()
  // }

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
  let outTradeNo = req.query.orderNo || Uuid.v4()
  let totalFee = parseInt(req.query.num) || 1
  let title = req.query.title || '收钱吧！' 
  let type = req.query.type || 'JSAPI'

  // 支付下单
  let openid = req.session.openid || ''
  let businessId = req.query.business_id || 'e32c20bfc10d5c677b5db96ec57247fc'
  let action = config.host_api + ':' + config.port_api
  action += '/api/payment/unifiedOrder?business_id=' + businessId
  log.info('/pay action' , action)
  let orderObj = {
    method: 'wx', // 支付方式 wx:微信
    out_trade_no : outTradeNo , // 第三方订单号
    body : title , // 订单说明
    detail : '' , // 订单详情
    total_fee : totalFee , // 订单金额,精确到分
    redirect_url : req.protocol + '://' +  req.hostname + '/demo/wechat/paySucc' , // 支付完成跳转链接
    payment_type : type,
    payment_user : (type == 'JSAPI') ? openid : '' // wx JSAPI传openid
  }
  log.info('/pay orderObj' , orderObj)
  let orderRes = await httpUtils.post(action , orderObj)
  if(orderRes.code != 0){
    return res.send(orderRes.message)
  }

  if (type == 'JSAPI'){
    // 微信配置 TODO 改为数据库的
    let opt = config.wx_opt
    log.info('/pay opt' , opt)

    // 预支付数据
    let prepayId = orderRes.data.prepay_id
    log.info('/pay prepayId' , prepayId)
    let wxPay = WeixinService.wxPayJsInit(opt , prepayId)
    log.info('/pay wxPay' , wxPay)
    res.locals.wxPay = wxPay

    // jssdk init
    let url = req.protocol + '://' +  req.hostname + req.originalUrl
    let jssdk = await WeixinService.jssdkInit(opt , url)
    log.info('/pay jssdk' , jssdk)
    res.locals.jssdk = jssdk

    res.render('demo/wechat_pay')
  }else if(type == 'NATIVE'){
    // 扫码
    let code_url = orderRes.data.code_url
    res.locals.code_url = code_url
    res.render('demo/wechat_pay_code')
  }else if(type == 'MWEB'){
    // h5支付
    let mweb_url = orderRes.data.mweb_url
    return res.redirect(mweb_url)
  }
  

})

router.get('/redirect' , (req ,res) => {

  res.send(req.query)
})

module.exports = router