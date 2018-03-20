const express = require('express')
const router = express.Router()
const WeixinService = require('./../../service/weixin_service')
const AlipayService = require('./../../service/alipay_service')

const log = require('./../../../lib/log')('api-notify')

router.get('/' , async (req , res) => {
  log.info(req.body)
  res.success('success')
})

router.post('/wxpay' , async (req , res) => {
  log.info('req.body' , req.body)

  let result = await WeixinService.notifyDealOrder(req.body)
  res.send(result)
})

router.post('/alipay' , async (req , res) => {
  log.info('req.body' , req.body)
  let result = await AlipayService.notify(req.body)
  log.info('/alipay result: ' , result)
  res.send(result)
  // let result = await WeixinService.notifyDealOrder(req.body)
  // res.send(result)
})

router.post('/test' , async(req , res) => {
  // let data = req.body
  
  res.send(parseInt(Date.now() / 1000).toString())
})

module.exports = router