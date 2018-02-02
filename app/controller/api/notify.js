const express = require('express')
const router = express.Router()
const WeixinService = require('./../../service/weixin_service')

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

module.exports = router