const express = require('express')
const router = express.Router()
const log = require('./../../../lib/log')('app-controller-api-question')
const QuestionService = require('./../../service/question_service')

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
    return res.error('post param title error')
  }
  if (!questionObj.content){
    return res.error('post param content error')
  }

  log.info('create uid ' , uid , 'questionObj' , questionObj)
  QuestionService.create(uid , questionObj).then(result => {
    log.info('create result ' , result)
    res.json(result)
  })
  
})

// 修改问题

// 发布问题

// 删除问题

// 问题详情



module.exports = router