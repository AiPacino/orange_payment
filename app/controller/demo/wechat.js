const express = require('express')
const router = express.Router()


router.use((req , res , next) => {

  let openid = req.session.openid || null
  if(!openid){
    req.session.redirect_uri = req.protocol + '://' +  req.hostname + req.originalUrl
    return res.redirect('/demo/auth')
  }
  next()
})

router.get('/' , async (req , res) => {
  
  res.render('demo/wechat')
})

router.get('/pay' , async (req , res) => {

  res.render('demo/wechat_pay')

})

module.exports = router