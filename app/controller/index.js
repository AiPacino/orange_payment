const express = require('express')
const router = express.Router()
const {rpcProxy , rpcArgs} = require('./../proxy/rpcClientProxy')

router.get('/' , async (req , res) => {
  let args = rpcArgs.demo
  args.a = '1',
  args.b = '2'

  let result = await rpcProxy.demo(args)
  res.send(result)
})

module.exports = router