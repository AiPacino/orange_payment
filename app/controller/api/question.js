const express = require('express')
const router = express.Router()
const {rpcProxy , rpcArgs} = require('./../../proxy/rpcClientProxy')

const ApiAuthMid = require('./../../middleware/api_auth')
router.use(ApiAuthMid)

router.get('/' , (req , res) => {
  res.end()
})

router.post('/update' , (req , res) =>{

  res.json({uid : req.uid})
})

module.exports = router