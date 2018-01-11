const {rpcProxy , rpcArgs} = require('./../proxy/rpcClientProxy')
const redisProxy = require('./../proxy/redisClientProxy')
const log = require('./../../lib/log')('app-service-answer')

class AnswerService {

  async create(uid , questionId , answerObj){
    let args = rpcArgs.answerCreate
    args.uid = uid
    args.question_id = questionId
    args.answerObj = answerObj

    let result = await rpcProxy.answerCreate(args)
    log.info('create result' , result)
    return result
  }

  async delete(uid , answerId){
    let args = rpcArgs.answerDelete
    args.uid = uid
    args.answer_id = answerId

    let result = await rpcProxy.answerDelete(args)
    log.info('delete result' , result)
    return result
  }

  async listByQuestionId(questionId , map){
    let args = rpcArgs.answerListForQuestion
    args.question_id = questionId
    args.map = map
    log.info('listByQuestionId args' , args)
    let result = await rpcProxy.answerListForQuestion(args)
    log.info('listByQuestionId result' , result)
    return result
  }
}

module.exports = new AnswerService()