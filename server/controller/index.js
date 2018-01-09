const RPC = require('./../../lib/rpc')
const log = require('./../../lib/log')('rpc-controller-index')

RPC.add('demo' , async (args) => {

  let data = await args
  return { code :1 , message : '111' , aaa : data}
  
})


module.exports = RPC.methods()