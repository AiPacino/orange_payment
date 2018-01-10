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

  async update(uid , questionObj) {
    let args = rpcArgs.questionUpdate
    args.uid = uid
    args.questionObj = questionObj
    log.info('update args' , args)
    let result = await rpcProxy.questionUpdate(args)
    log.info('update result ' ,result)
    return result
  }

  async publish(uid , questionObj) {
    let args = rpcArgs.questionUpdate
    args.uid = uid
    args.questionObj = questionObj
    log.info('publish args' , args)
    let result = await rpcProxy.questionPublish(args)
    log.info('publish result ' ,result)
    return result
  }

  async delete(uid , questionId) {
    let args = rpcArgs.questionDelete
    args.uid = uid
    args.question_id = questionId
    log.info('delete args' , args)
    let result = await rpcProxy.questionDelete(args)
    log.info('delete result ' ,result)
    return result
  }

  async list(uid , map){
    let args = rpcArgs.questionList
    args.uid = uid
    args.map = map
    log.info('list args' , args)
    let result = await rpcProxy.questionList(args)
    log.info('list result ' ,result)
    return result
  }
}

module.exports = new QusetionService()