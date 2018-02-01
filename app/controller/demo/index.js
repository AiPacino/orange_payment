const express = require('express')
const router = express.Router()
const log = require('./../../../lib/log')('demo-index')
const wechatPubService = require('./../../service/weixin_pub_service')
const wechatRouter = require('./wechat')


router.get('/' , async (req , res) => {
  res.success({version : '0.0.1'})
})

router.get('/pay' , (req , res) => {
  res.render('demo/pay')
})

// 微信公众号授权
router.get('/auth' , async (req , res) => {

  let code = req.query.code

  code = '071LFBLv0Spypc12riLv0zIyLv0LFBLv'
  let opt = {}
  opt.app_id = 'wx9070c69e2b42f307',
  opt.app_secret = 'a5a11c1b2b559c071ec7695f1c7eb716'
  log.info('/auth' , opt)
  log.info('/auth code' , code)
  if(code){

    let data = await wechatPubService.getAuthorizationCode(code , opt)
    log.info('/auth data' , data)
    res.send(data)
    res.end()
  }else {
    
    let redirectUrl = req.protocol + '://' + req.hostname + '/demo/auth'
    log.info('/auth redirectUrl' , redirectUrl)
    let url = wechatPubService.getAuthorizeUrl(redirectUrl , opt)
    return res.redirect(url)
  }
  
})

router.use('/wechat' , wechatRouter)

module.exports = router