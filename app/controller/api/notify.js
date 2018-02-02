const express = require('express')
const router = express.Router()

const log = require('./../../../lib/log')('api-notify')

router.get('/' , async (req , res) => {
  log.info(req.body)
  res.success('success')
})

router.post('/wxpay' , async (req , res) => {
  log.info('req.body' , req.body)
  res.send('success')
})

module.exports = router