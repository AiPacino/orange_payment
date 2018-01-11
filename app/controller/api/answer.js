const express = require('express')
const router = express.Router()
const AnswerService = require('./../../service/answer_service')
const log = require('./../../../lib/log')('app-controller-api-answer')

const ApiAuthMid = require('./../../middleware/api_auth')
router.use(ApiAuthMid)

router.get('/' , (req , res) => {
  res.end()
})

router.post('/create' , async (req , res) =>{

  let uid = req.uid
  let questionId = req.query.question_id
  let answerObj = req.body

  let result = await AnswerService.create(uid , questionId , answerObj)
  log.info('create result' , result)
  res.json(result)

})

router.post('/delete' , async (req , res) =>{

  let uid = req.uid
  let answerId = req.body.answer_id

  let result = await AnswerService.delete(uid , answerId)
  log.info('delete result' , result)
  res.json(result)

})

router.post('/listForQuestion' , async (req , res) =>{

  let uid = req.uid
  let questionId = req.query.question_id
  let map = req.body

  let result = await AnswerService.listByQuestionId(questionId , map)
  log.info('listForQuestion result' , result)
  res.json(result)

})

module.exports = router