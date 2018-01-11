const RESULT_UTILS = require('./../../utils/result_utils')
const QuestionModel = require('./../model/question_model')
const UserModel = require('./../model/user_model')
const AnswerModel = require('./../model/answer_model')
const log = require('./../../lib/log')('server-service-question')

class AnswerService {

  // 添加回答
  async create(uid , questionId , answerObj){
    let result = null
    // 先找问题状态，是否可以回答
    let question = await QuestionModel.model.findOne({
      where : {uid : uid , id : questionId}
    })
    if(!question || question.status != 1){
      result = RESULT_UTILS.QUESTION_STATUS_NO_CAN_ANSWER
      return result
    }

    let obj = {
      question_id : questionId,
      uid : uid,
      content : answerObj.content,
      status : 1
    }
    log.info('create obj' , obj)
    let answer = await AnswerModel.model.create(obj)
    log.info('create result ' , result)
    result = RESULT_UTILS.SUCCESS
    result.data = answer
    return result
  }

  // 删除回答
  async delete(uid , answerId){
    let result = null
    let answer = await AnswerModel.model.findOne({
      where : {id : answerId , uid : uid}
    })
    if (!answer){
      result = RESULT_UTILS.ANSWER_FIND_ERROR
      return result
    }

    answer.status = -1
    answer.update_time = parseInt(Date.now() / 1000)
    let del = await answer.save()
    result = RESULT_UTILS.SUCCESS
    result.data = del
    return result
  }

  async listByQuestionId(questionId , map = {}){
    let result = await AnswerModel.getListByQuestionId(questionId , map)
    log.info('listByQuestionId result ' , result)
    return result
  }
}

module.exports = new AnswerService()