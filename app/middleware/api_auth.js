const UserService = require('./../service/user_service')
const log = require('./../../lib/log')('api_auth_mid')

module.exports = async (req , res , next) => {

  let key = req.body.access_token
  let uid = await UserService.checkSessionKey(key)
  log.info('uid' , uid)
  if(uid){
    req.uid = uid
    next()
  }else{
    res.json({code : 200 , message : 'token error'})
    res.end()
  }
  
}