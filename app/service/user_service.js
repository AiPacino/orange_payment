const {rpcProxy , rpcArgs} = require('./../proxy/rpcClientProxy')
const redisProxy = require('./../proxy/redisClientProxy')
const log = require('./../../lib/log')('app-service-user')

class UserService {

  async getUserSessionKey(uid){
    let args = rpcArgs.getSessionKey
    args.uid = uid
    let result = await rpcProxy.getSessionKey(args)
    log.info('getUserSessionKey result' , result)

    let sessionKeyData = result.data
    let rediskey = sessionKeyData.session_key
    let redisExpire = sessionKeyData.deadline - parseInt(Date.now() / 1000)
    log.info('getUserSessionKey rediskey ' , rediskey)
    log.info('getUserSessionKey redisExpire ' , redisExpire)
    let redisData = {
      uid : sessionKeyData.uid,
      deadline : sessionKeyData.deadline
    }
    redisProxy.userSessionKeySet(sessionKeyData.session_key , JSON.stringify(redisData) , redisExpire).then((res) => {
      log.info('getUserSessionKey saveRedis'  , res)
    })

    return sessionKeyData
  }

  async checkSessionKey(key){

    let redisStr = await redisProxy.userSessionKeyGet(key)
    log.info('checkSessionKey redisStr' , redisStr)
    if (!redisStr){
      return null
    }

    let sessionKey = JSON.parse(redisStr)
    let uid = sessionKey.uid
    log.info('checkSessionKey uid' , uid)
    return uid
  }
}

module.exports = new UserService()