const {rpcProxy , rpcArgs} = require('./../proxy/rpcClientProxy')
const redisProxy = require('./../proxy/redisClientProxy')
const log = require('./../../lib/log')('app-service-question')

class QusetionService {

  async create(uid , questionObj){
    let args = rpcArgs.questionCreate
    args.uid = uid
    args.questionObj = questionObj
    log.info('create args' , args)
    let result = await rpcProxy.questionCreate(args)
    log.info('create result ' ,result)
    return result
  }
}

module.exports = new QusetionService()