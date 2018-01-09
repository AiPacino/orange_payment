const RPC = require('./../../lib/rpc')
const log = require('./../../lib/log')('rpc-controller-user')
const UserService = require('./../service/user_service')

RPC.add('getSessionKey' , async (args) => {

  let uid = args.uid
  let userSessionKey = await UserService.getSessionKeyByUid(uid)
  log.info('getSessionKey result' , userSessionKey)
  return userSessionKey
  
})


module.exports = RPC.methods()