const RPC = require('./../../lib/rpc')
const log = require('./../../lib/log')('rpc-controller-question')
const QuestionService  =  require('./../service/question_service')

RPC.add('questionCreate' , async (args) => {

  let uid = args.uid
  let obj = args.questionObj

  let result = await QuestionService.create(uid , obj)
  log.info('questionCreate result' , result)
  return result
  
})

RPC.add('questionUpdate' , async (args) => {

  let uid = args.uid
  let obj = args.questionObj

  let result = await QuestionService.update(uid , obj)
  log.info('questionCreate result' , result)
  return result
  
})

RPC.add('questionPublish' , async (args) => {

  let uid = args.uid
  let obj = args.questionObj

  let result = await QuestionService.publish(uid , obj)
  log.info('questionPublish result' , result)
  return result
  
})

RPC.add('questionDelete' , async (args) => {

  let uid = args.uid
  let questionId = args.question_id

  let result = await QuestionService.delete(uid , questionId)
  log.info('questionDelete result' , result)
  return result
  
})

RPC.add('questionList' , async (args) => {

  let uid = args.uid
  let map = args.map
  log.info('questionList map' , map)
  let result = await QuestionService.list(uid , map)
  log.info('questionList result' , result)
  return result
  
})


module.exports = RPC.methods()