const express = require('express')
const router = express.Router()
const {rpcProxy , rpcArgs} = require('./../../proxy/rpcClientProxy')

router.get('/' , (req , res) => {
  res.end()
})
module.exports = router