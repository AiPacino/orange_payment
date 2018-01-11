const express = require('express')
const router = express.Router()
const log = require('./../../../lib/log')('app-controller-api-question')
const QuestionService = require('./../../service/question_service')
const RESULT_UTILS = require('./../../../utils/result_utils')

const ApiAuthMid = require('./../../middleware/api_auth')
router.use(ApiAuthMid)

// 问题列表
router.get('/' , (req , res) => {
  res.end()
})

// 添加问题
router.post('/create' , (req , res) =>{

  let uid = req.uid
  let questionObj = req.body
  if (!questionObj.title){
    return res.json(RESULT_UTILS.QUESTION_POST_DATA_TITLE_ERROR)
  }
  if (!questionObj.content){
    return res.json(RESULT_UTILS.QUESTION_POST_DATA_CONTENT_ERROR)
  }

  log.info('create uid ' , uid , 'questionObj' , questionObj)
  QuestionService.create(uid , questionObj).then(result => {
    log.info('create result ' , result)
    res.json(result)
  })
  
})

// 修改问题
router.post('/update' , (req , res) => {
  let uid = req.uid
  let questionObj = req.body
  if(!questionObj.id){
    return res.json(RESULT_UTILS.QUESTION_POST_DATA_ID_ERROR)
  }
  if (!questionObj.title){
    return res.json(RESULT_UTILS.QUESTION_POST_DATA_TITLE_ERROR)
  }
  if (!questionObj.content){
    return res.json(RESULT_UTILS.QUESTION_POST_DATA_CONTENT_ERROR)
  }
  log.info('update uid ' , uid , 'questionObj' , questionObj)
  QuestionService.update(uid , questionObj).then(result => {
    log.info('update result ' , result)
    res.json(result)
  })

})

// 发布问题
router.post('/publish' , (req , res) => {
  let uid = req.uid
  let questionObj = req.body
  if(!questionObj.id){
    return res.json(RESULT_UTILS.QUESTION_POST_DATA_ID_ERROR)
  }
  if (!questionObj.amount && questionObj.amount != 0){
    return res.json(RESULT_UTILS.QUESTION_POST_DATA_AMOUNT_ERROR)
  }
  if (!questionObj.deadline || questionObj.deadline < parseInt(Date.now() / 1000)){
    return res.json(RESULT_UTILS.QUESTION_POST_DATA_DEADLINE_ERROR)
  }

  log.info('publish uid ' , uid , 'questionObj' , questionObj)
  QuestionService.publish(uid , questionObj).then(result => {
    log.info('publish result ' , result)
    return res.json(result)
  })

})

// 删除问题
router.post('/delete' , (req , res) => {
  let uid = req.uid
  let questionId = req.body.id
  if(!questionId){
    return res.json(RESULT_UTILS.QUESTION_POST_DATA_ID_ERROR)
  }

  log.info('delete uid ' , uid , 'questionId' , questionId)
  QuestionService.delete(uid , questionId).then(result => {
    log.info('delete result ' , result)
    return res.json(result)
  })

})

// 问题详情
router.post('/detail' , (req , res) => {
  let uid = req.uid
  let id = req.body.id

  log.info('detail uid ' , uid , 'id' , id)
  QuestionService.detail(uid , id).then(result => {
    log.info('detail result ' , result)
    return res.json(result)
  })

})

// 问题列表
router.post('/list' , (req , res) => {
  let uid = req.uid
  let map = req.body
  map.page = map.page ? map.page : 1
  map.size = map.size ? map.size : 10

  log.info('list uid ' , uid , 'map' , map)
  QuestionService.list(uid , map).then(result => {
    log.info('list result ' , result)
    return res.json(result)
  })

})


module.exports = router