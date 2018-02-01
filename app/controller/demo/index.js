const express = require('express')
const router = express.Router()

const wechatPubService = require('./../../service/weixin_pub_service')
const wechatRouter = require('./wechat')


router.get('/' , async (req , res) => {
  res.success({version : '0.0.1'})
})

router.get('/pay' , (req , res) => {
  res.render('demo/pay')
})

// 微信公众号授权
router.get('/auth' , (req , res) => {

  let opt = {}
  opt.app_id = 'wx9070c69e2b42f307',
  opt.app_secret = 'a5a11c1b2b559c071ec7695f1c7eb716'

  let redirectUrl = req.session.redirect_uri || req.protocol + '://' + req.hostname + '/demo/wechat'
  let url = wechatPubService.getAuthorizeUrl(redirectUrl , opt)
  return res.redirect(url)
})

router.use('/wechat' , wechatRouter)

module.exports = router