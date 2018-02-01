const express = require('express')
const router = express.Router()

router.get('/' , async (req , res) => {
  res.send('hello world!')
})

router.get('/MP_verify_whMgCjWdjph4TYOA.txt' , (req , res) => {
  res.send('whMgCjWdjph4TYOA')
})

module.exports = router