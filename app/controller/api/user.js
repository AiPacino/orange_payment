const express = require('express')
const router = express.Router()
const UserService = require('./../../service/user_service')

router.get('/' , async (req , res) => {
  res.end()
})

router.post('/getSessionKey' , async (req , res) => {

  let uid = req.body.uid
  let data = await UserService.getUserSessionKey(uid)
  res.success(data)

})

module.exports = router