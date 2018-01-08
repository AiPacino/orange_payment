const express = require('express')
const router = express.Router()


router.get('/' , async (req , res) => {
  res.success({version : '0.0.1'})
})


router.use('/mini' , require('./mini'))

module.exports = router