const express = require('express')
const router = express.Router()
const UserService = require('./../../service/user_service')

router.get('/' , async (req , res) => {
  res.end()
})


module.exports = router