const express = require('express')
const router = express.Router()
const UserService = require('./../../service/user_service')


router.get('/' , async (req , res) => {
  res.success({version : '0.0.1'})
})

// 获取sessionKey
router.post('/getSessionKey' , async (req , res) => {
  let uid = req.body.uid
  let data = await UserService.getUserSessionKey(uid)
  res.success(data)
})

// 问题列表
router.get('/questionList' , async (req , res) => {

})

// 排行榜
router.get('/topList' , async (req , res) => {

})

router.use('/mini' , require('./mini'))
router.use('/user' , require('./user'))
router.use('/question' , require('./question'))
router.use('/answer' , require('./answer'))
router.use('/payment' , require('./payment'))

module.exports = router