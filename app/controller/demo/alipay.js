const express = require('express')
const router = express.Router()
const config = require('./../../../config/index')
const httpUtils = require('./../../../utils/http_utils')
const log = require('./../../../lib/log')('demo-alipay')
const Uuid = require('./../../../utils/uuid_utils')

router.get('/' , (req , res) => {

  res.render('demo/alipay')
})

router.get('/page/:type' ,async (req , res) => {

  let type = req.params.type || 'pc'
  let outTradeNo = req.query.orderNo || Uuid.v4()
  let totalFee = parseInt(req.query.num) || 1
  let title = req.query.title || type + '网页测试' 

  // 支付下单

  let businessId = req.query.business_id || 'e32c20bfc10d5c677b5db96ec57247fc'
  let action = config.host_api + ':' + config.port_api
  action += '/api/payment/unifiedOrder?business_id=' + businessId
  log.info('/pay action' , action)
  let orderObj = {
    method: 'alipay', // 支付方式 wx:微信
    out_trade_no : outTradeNo , // 第三方订单号
    body : title , // 订单说明
    detail : 'alipay wap test' , // 订单详情
    total_fee : totalFee , // 订单金额,精确到分
    redirect_url : req.protocol + '://' +  req.hostname + '/demo/alipay/paySucc' , // 支付完成跳转链接
    payment_type : type ,
    payment_user : '' // 支付宝用户传空
  }
  log.info('/pay orderObj' , orderObj)
  let orderRes = await httpUtils.post(action , orderObj)
  if(orderRes.code == 0){
    return res.redirect(orderRes.message)
  }else{
    res.json(orderRes)
  }
})

router.get('/paySucc' , (req , res) => {

  res.render('demo/alipay_success')

})

router.get('/test' , (req , res) => {
  let url = 'https://openapi.alipaydev.com/gateway.do?app_id=2016090900470172&method=alipay.trade.wap.pay&format=json&return_url=http%3A%2F%2Fwww.baidu.com&charset=utf-8&sign_type=RSA2&timestamp=2018-02-05%2015%3A36%3A48&version=1.0&biz_content=%7B%22subject%22%3A%22ceshi%22%2C%22out_trade_no%22%3A%228e5151210fcd4122936a20d650c45d73%22%2C%22total_amount%22%3A1%2C%22product_code%22%3A%22QUICK_WAP_WAY%22%2C%22notify_url%22%3A%22http%3A%2F%2Fpay.cc512.com%2Fapi%2Fnotify%2Falipay%22%7D&sign=KEjoCW2zftayeMq9qbMD%2Fxlh9DcqJwxhtbDT%2BI1xihmo%2BpfXqaOGmIKDIfZXcqoK5io7A3tisNbJsbBiDOAGLtJRNp3Y70MvSLgfCoTvLMqF05PuxsCHojy5ilNE1lBKnJ0Dsfv8jJjH8PHJVlLyjGRgeENm9ixFJAFw%2Fzj9j1QrbHtS6bkWK3Iig65Azl6teRtBn0if9V6QWKsJvlV7IfHJd%2F2LwMH1At8E3BYCK%2FzKNc7u4bqKyjVBmI2uB912QegquSqu4QQ02yMve992U09qtsbSYvWzpmrd3HajowkVtvfgwoTOdj5YXs%2Bz7sIzLqKHiofqPplBisBVr1ChGQ%3D%3D'
  
  res.redirect(url)
})

module.exports = router