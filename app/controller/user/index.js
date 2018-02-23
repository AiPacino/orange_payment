const express = require('express')
const router = express.Router()
const UserService = require('./../../service/user_service')
const OrderService = require('./../../service/order_service')
const pagination = require('./../../../lib/pagination')
const paymentConfig = require('./../../../config/index').payment
const log = require('./../../../lib/log')('controller-user')

router.use(async (req , res , next) => {
  let url = req.originalUrl
  if(url.indexOf('join')> -1|| url.indexOf('log') > -1){
    next()
  } else {
    
    // req.session.user_id = 4 // 测试开启TODO

    let userId = req.session.user_id
    if(!userId){
      return res.redirect('/user/login')
    }
  
    next()
  }

  
})

// 商户中心

router.get('/join' , async (req , res) => {
  res.render('user/join')
})

router.post('/join' , async (req , res) => {
  let obj = req.body
  log.info('/join body' , obj)
  let result = await UserService.join(obj)
  if(result.code == 0){
    res.render('user/join_success')
  }else{
    res.render('user/join_error' , {msg : result.message})
  }
  
})

router.get('/login' , async (req , res) => {
  res.render('user/login')
})

router.get('/logout' , async (req , res) => {
  req.session.user_id = null
  req.session.user_uuid = null
  res.redirect('/user/login')
})


router.post('/login' , async (req , res) => {

  let obj = req.body
  log.info('/login body' , obj)
  let result = await UserService.login(obj)
  log.info('.login result' , result)

  if(result.code == 0){
    req.session.user_id = result.data.user_id
    req.session.user_uuid = result.data.user_uuid
    return res.redirect('/user/')
  }else{
    return res.render('user/join_error' , {msg : '登录失败，用户名或密码请重试'})
    // res.send('登录失败，请重试')
    // res.render('user/join_error' , {msg : '登录失败，请重试'})
  }
})

router.get('/' , async (req , res) => {

  let userId = req.session.user_id

  let user = await UserService.getInfoById(userId)
  res.locals.user = user.dataValues
  log.info('user ' , user)
  res.render('user/index')
})

router.get('/order' , async (req , res) => {
  let userId = req.session.user_id
  let page = req.query.page || 1
  let size = req.query.size || 20

  let map = {}
  let query = {}
  if(req.query.order_id){
    map.id = req.query.order_id
    query.order_id = req.query.order_id
  }
  
  let result = await OrderService.lists(userId , map , page , size)
  res.locals.count = result.count
  res.locals.lists = result.rows

  let Pagination = new pagination()
  res.locals.page = Pagination.create('/user/order' , result.count , page, size , query)

  res.locals.methods = paymentConfig.method_value
  res.locals.statusVal = { 0 : '支付完成' , 1 : '订单创建' , 2: '下单成功' , 3: '下单失败'}
  res.render('user/order')
} )

router.get('/trade' , async ( req , res) => {
  let userId = req.session.user_id
  let page = req.query.page || 1
  let size = req.query.size || 20
  let map = {}
  
  let result = await UserService.tradeLogList(userId , map , page , size)
  res.locals.count = result.count
  res.locals.lists = result.rows

  let Pagination = new pagination()
  res.locals.page = Pagination.create('/user/trade' , result.count , page, size , {user_id : userId})

  res.locals.user_fund = await UserService.getUserFund(userId)
  res.render('user/trade')
})


module.exports = router