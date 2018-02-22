const express = require('express')
const router = express.Router()
const UserService = require('./../../service/user_service')
const BusinessService = require('./../../service/business_service')
const log = require('./../../../lib/log')('controller-mg-api')

router.post('/userStatus' , async (req , res) => {

  let obj= req.body
  log.info('userStatus obj' , obj , 'mgUserId' , req.session.mg_user_id)
  let result = await UserService.setStatus(obj.user_id , obj.status)
  res.json(result)
})

router.post('/userRate' , async (req , res) => {

  let obj= req.body
  log.info('userRate obj' , obj , 'mgUserId' , req.session.mg_user_id)
  let result = await UserService.setRate(obj.user_id , obj.rate_in , obj.rate_out)
  res.json(result)
})

router.post('/businessMethodSet' , async ( req , res) => {
  let obj = req.body
  log.info('businessMethodSet obj' , obj , 'mgUserId' , req.session.mg_user_id)
  obj.method_key = req.query.method
  obj.config = JSON.stringify(obj.config)

  let result = await BusinessService.setMethod(obj.business_id , obj.method_key , obj)

  // res.json(result)
  res.redirect('/mg/businessMethod?id=' + obj.business_id)
})

module.exports = router