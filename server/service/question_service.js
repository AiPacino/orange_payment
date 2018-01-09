const RESULT_UTILS = require('./../../utils/result_utils')
const QuestionModel = require('./../model/question_model')
const log = require('./../../lib/log')('server-service-question')

class QuestionService {

  async create(uid , obj){
    obj.uid = uid
    log.info('create obj' , obj)

    let question = await QuestionModel.model.create(obj)
    return question
  }
}

module.exports = new QuestionService()