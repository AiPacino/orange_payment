const express = require('express')
const router = express.Router()
const httpUtils = require('./../../../utils/http_utils')
const log = require('./../../../lib/log')('demo-user')
const Uuid = require('./../../../utils/uuid_utils')
const UserService = require('./../../service/user_service')
const BusinessService = require('./../../service/business_service')

router.use((req , res , next) => {

  // req.session.user_id = 1 // 测试开启
  // req.session.user_uuid = 'orba02c7409fb3abb8' // 

  let userId = req.session.user_id
  if(!userId){
    return res.redirect('/user/login')
  }

  next()
})

router.get('/wxTest' , async (req , res) => {

  let userId = req.query.user_id || req.session.user_uuid

  res.locals.user_id = userId
  res.locals.method = 'wx'
  res.locals.out_trade_no = Uuid.v4()
  res.locals.payment_type = 'NATIVE'

  let user = await UserService.getInfoByUuid(userId)
  res.locals.user = user.dataValues
  res.render('demo/user_wx_test')
})

router.get('/alipayTest' , async (req , res) => {

  let userId = req.query.user_id || req.session.user_uuid

  res.locals.user_id = userId
  res.locals.method = 'alipay'
  res.locals.out_trade_no = Uuid.v4()
  res.locals.payment_types = {
    wap : '手机移动端h5' , pc: 'pc网站'
  }

  let user = await UserService.getInfoByUuid(userId)
  res.locals.user = user.dataValues
  res.render('demo/user_ali_test')
})

router.post('/unifiedOrder' , async (req , res) => {
  let data = req.body
  log.info('/unifiedOrder data' , data)
  let user = await UserService.getInfoByUuid(data.app_id)
  log.info('/unifiedOrder user' , user)
  let action = ''
  if(user.business_id){
    let business = await BusinessService.getById(user.business_id)
    action = 'http://127.0.0.1:8092/api/payment/unifiedOrder?business_id=' + business.uuid
  }else {
    action = 'http://127.0.0.1:8092/api/payment/unifiedOrder'
  }
  log.info('/unifiedOrder action' , action)
  let result = await httpUtils.post(action , data)
  log.info('/unifiedOrder result ' , result)
  res.json(result)
})


router.post('/unifiedSign' , async (req , res) =>{
  let obj = req.body
  delete obj.sign
  let sign = await UserService.paySign(obj)
  log.info('/unifiedSign sign' , sign)
  res.send(sign)

})

router.get('/testSucc' , (req , res) => {
  res.send('<h1>测试成功！</h1>')
})

router.post('/notify' , (req , res) => {
  
  log.info('/notify data' , req.body)

  res.send('success')
})


module.exports = router