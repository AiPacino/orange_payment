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


module.exports = RPC.methods()