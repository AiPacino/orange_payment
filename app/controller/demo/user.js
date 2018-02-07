const express = require('express')
const router = express.Router()
const config = require('./../../../config/index')
const httpUtils = require('./../../../utils/http_utils')
const log = require('./../../../lib/log')('demo-user')
const Uuid = require('./../../../utils/uuid_utils')
const UserService = require('./../../service/user_service')


router.get('/wxTest' , async (req , res) => {

  let userId = req.query.user_id || 'f2e8dbcd9a0f4d9e445b21cd9c9df846'

  res.locals.user_id = userId
  res.locals.method = 'wx'
  res.locals.out_trade_no = Uuid.v4()
  res.locals.payment_type = 'NATIVE'

  let user = await UserService.getInfoByUuid(userId)
  res.locals.user = user.dataValues
  res.render('demo/user_wx_test')
})

router.post('/unifiedOrder' , async (req , res) => {
  let data = req.body
  log.info('/unifiedOrder data' , data)
  let action = 'http://127.0.0.1:8092/api/payment/unifiedOrder'
  let result = httpUtils.post(action , data)
  res.json(result)
})

module.exports = router