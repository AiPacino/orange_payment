const express = require('express')
const router = express.Router()

// 文档

router.get('/' , async (req , res) => {
  // res.send('hello world!')
  res.render('document/index')
})


module.exports = router