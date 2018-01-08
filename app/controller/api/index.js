const express = require('express')
const router = express.Router()


router.get('/' , async (req , res) => {
  res.success({version : '0.0.1'})
})

router.post('/sessionKey' , async (req , res) => {
  
})

router.use('/mini' , require('./mini'))
router.use('/user' , require('./user'))
router.use('/question' , require('./question'))
router.use('/answer' , require('./answer'))
router.use('/payment' , require('./payment'))

module.exports = router