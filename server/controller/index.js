const RPC = require('./../../lib/rpc')
const log = require('./../../lib/log')('rpc-controller-index')

RPC.add('demo' , (args , response) => {

  return (async () => {
    
    let data = await args
    log.info('data' , data)
    response.json(data)
  })()
  
})


module.exports = RPC.methods()