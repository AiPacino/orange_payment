const RPC = require('./../../lib/rpc')
const log = require('./../../lib/log')('rpc-controller-user')
const UserService = require('./../service/user_service')

RPC.add('getSessionKey' , (args , response) => {

  return (async () => {
    
    let uid = args.uid
    let userSessionKey = await UserService.getSessionKeyByUid(uid)
    log.info('getSessionKey result' , userSessionKey)
    response.json(userSessionKey)
  })()
  
})


module.exports = RPC.methods()