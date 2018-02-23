const express = require('express')
const router = express.Router()
const log = require('./../../../lib/log')('controller-mg')
const UserService = require('./../../service/user_service')
const BusinessService = require('./../../service/business_service')
const pagination = require('./../../../lib/pagination')
const users = {
  lucong : {
    id : 1 , name : 'lucong' , password : '18676669410'
  }
}

router.use(async (req , res , next) => {
  
  let url = req.originalUrl
  if(url.indexOf('log') > -1){
    next()
  }else{

    req.session.mg_user_id = 1
    req.session.mg_user = users.lucong

    let mgUserId = req.session.mg_user_id

    if(!mgUserId){
      return res.redirect('/mg/login')
    }

    next()
  }
  
})

router.use('/api' , require('./api'))

// 后台
router.get('/login' , (req , res) => {
  res.render('mg/login')
})

router.post('/login' , (req , res) => {
  let obj = req.body
  log.info('/login body' , obj)
  let name = obj.name
  if(users.hasOwnProperty(name)){
    log.info('login users' , users[name])
    let mgUserId = users[name].id
    let password = users[name].password
    if(password != obj.password){
      return res.json({code : 1 , message : '登录失败'})
    }

    let mgUser = users[name]

    req.session.mg_user_id = mgUserId
    req.session.mg_user = mgUser

    return res.redirect('/mg/')
  }
})

router.get('/logout' , (req , res) => {
  req.session.mg_user_id = null
  req.session.mg_user = null

  res.redirect('/mg/login')
})

// 商户列表
router.get('/' , async (req , res) => {
  // let userId = req.session.mg_user_id
 
  let map = {}
  let pageQuery = {}

  if(req.query.name){
    map.name = req.query.name
    pageQuery.name = req.query.name
  }
  let page = req.query.page || 1
  let size = 20

  let result = await UserService.getLists(map , page , size)
  res.locals.count = result.count
  res.locals.lists = result.rows

  let Pagination = new pagination()
  
  res.locals.page = Pagination.create('/mg/' , result.count , page, size , pageQuery)
  res.render('mg/index')
})

/**
 * 资质商
 */
router.get('/business' , async ( req , res) => {
  let map = {}
  let pageQuery = {}

  if(req.query.name){
    map.name = req.query.name
    pageQuery.name = req.query.name
  }
  let page = req.query.page || 1
  let size = 20

  let result = await BusinessService.getLists(map , page , size)
  res.locals.count = result.count
  res.locals.lists = result.rows

  let Pagination = new pagination()
  
  res.locals.page = Pagination.create('/mg/business' , result.count , page, size , pageQuery)
  res.render('mg/business')
})

// 商户支付配置
router.get('/businessMethod' , async (req , res) => {
  
  let businessId = req.query.id

  let result = await BusinessService.getMethods(businessId)

  res.locals.methods = result
  res.locals.business_id = businessId

  res.render('mg/business_method')
})

// 商户信息编辑
router.get('/businessUpdate' , async(req , res) => {
  let businessId = req.query.id || 0
  if(businessId){
    res.locals.data = await BusinessService.getById(businessId)
  }else {
    res.locals.data = {}
  }

  res.render('mg/business_update')
})



module.exports = router