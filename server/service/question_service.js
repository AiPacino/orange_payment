const RESULT_UTILS = require('./../../utils/result_utils')
const QuestionModel = require('./../model/question_model')
const log = require('./../../lib/log')('server-service-question')

class QuestionService {

  // 新增
  async create(uid , obj){
    obj.uid = uid
    log.info('create obj' , obj)

    let question = await QuestionModel.model.create(obj)
    return question
  }

  // 修改
  async update(uid , obj){
    let result = {}
    if(!obj.id){
      result = RESULT_UTILS.QUESTION_POST_DATA_ID_ERROR
      return result  
    }

    let question = await QuestionModel.model.findById(obj.id)
    if(!question){
      result = RESULT_UTILS.QUESTION_DATA_FIND_ERROR
      return result
    }
    if(question.status != 0){
      result = RESULT_UTILS.QUESTION_STATUS_NO_CAN_UPDATE
      return result
    }
    if(question.uid != uid){
      result = RESULT_UTILS.QUESTION_DATA_UID_NOT_MATCH
      return result
    }

    question.title = obj.title,
    question.content = obj.content,
    question.update_time = parseInt(Date.now() / 1000)
    
    let update = await question.save()
    result = RESULT_UTILS.SUCCESS
    result.data = update
    return result 
  }

  // 发布
  async publish(uid , obj){
    let result = RESULT_UTILS.FAIL
    if(!obj.id){
      result = RESULT_UTILS.QUESTION_POST_DATA_ID_ERROR
      return result  
    }

    let question = await QuestionModel.model.findById(obj.id)
    log.info('publish question' , question)
    if(!question){
      result = RESULT_UTILS.QUESTION_DATA_FIND_ERROR
      return result
    }
    if(question.status != 0){
      result = RESULT_UTILS.QUESTION_STATUS_NO_CAN_PUBLISH
      return result
    }
    if(question.uid != uid){
      result = RESULT_UTILS.QUESTION_DATA_UID_NOT_MATCH
      return result
    }

    question.status = 1
    question.amount = obj.amount
    question.update_time = parseInt(Date.now() / 1000)
    question.deadline = obj.deadline

    let update = await question.save()
    result = RESULT_UTILS.SUCCESS
    result.data = update
    return result 

  }

  // 删除
  async delete(uid , questionId){
    let result = RESULT_UTILS.FAIL
    let question = await QuestionModel.model.findById(questionId)
    log.info('publish question' , question)
    if(!question){
      result = RESULT_UTILS.QUESTION_DATA_FIND_ERROR
      return result
    }
    if(question.status != 0){
      result = RESULT_UTILS.QUESTION_STATUS_NO_CAN_DELETE
      return result
    }
    if(question.uid != uid){
      result = RESULT_UTILS.QUESTION_DATA_UID_NOT_MATCH
      return result
    }

    question.status = -1
    question.update_time = parseInt(Date.now() / 1000)
    let update = await question.save()
    result = RESULT_UTILS.SUCCESS
    result.data = update
    return result 
  }

  async list(uid , map){
    
    let result = await QuestionModel.getListByUid(uid , map)
    log.info('list result' , result)
    return {count : result.count , rows : result.rows}
  }
}

module.exports = new QuestionService()