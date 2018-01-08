const express = require('express')
const router = express.Router()
const WxMiniAppService = require('./../../service/wx_mini_app_service')
const log = require('./../../../lib/log')('controller-api-min')

router.post('/login' , async (req , res) => {
  let code = req.body.code
  let result = await WxMiniAppService.getSessionKey(code)
  log.info('/api/mini/login result' , result)
  res.success(result)
})

module.exports = router