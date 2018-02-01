const express = require('express')
const router = express.Router()

const log = require('./../../../lib/log')('api-notify')

router.get('/' , async (req , res) => {
  log.info(req.body)
  res.success('success')
})

router.post('/wxpay' , async (req , res) => {
  res.success({version : '0.0.1'})
})

module.exports = router