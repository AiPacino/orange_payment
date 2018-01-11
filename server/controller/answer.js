const RPC = require('./../../lib/rpc')
const log = require('./../../lib/log')('rpc-controller-answer')
const AnswerService  =  require('./../service/answer_service')

RPC.add('answerCreate' , async (args) => {

  let uid = args.uid
  let questionId = args.question_id
  let obj = args.answerObj

  let result = await AnswerService.create(uid , questionId , obj)
  log.info('answerCreate result' , result)
  return result
  
})

RPC.add('answerDelete' , async (args) => {

  let uid = args.uid
  let answerId = args.answer_id

  let result = await AnswerService.delete(uid , answerId)
  log.info('answerDelete result' , result)
  return result
  
})

RPC.add('answerListForQuestion' , async (args) => {

  let questionId = args.question_id
  let map = args.map

  let result = await AnswerService.listByQuestionId(questionId , map)
  log.info('answerListForQuestion result' , result)
  return result
  
})

module.exports = RPC.methods()