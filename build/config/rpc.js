const path = require('path')

module.exports = {
  // host : '127.0.0.1',
  // port : '9001',
  output : [
    {'path' : path.join(__dirname , './../../app/proxy') , host: 'http://127.0.0.1:8081'},
  ],
  routers : [

    {
      method : 'demo',
      name : 'demo',
      args : ['a' , 'b']
    },

    {
      method : 'getSessionKey',
      name : '获取用户sessionkey',
      args : ['uid']
    },

    // question
    {
      method : 'questionCreate',
      name : '添加问题',
      args : ['uid' , 'questionObj']
    },
    {
      method : 'questionUpdate',
      name : '修改问题',
      args : ['uid' , 'questionObj']
    },
    {
      method : 'questionPublish',
      name : '问题发布',
      args : ['uid' , 'questionObj']
    },
    {
      method : 'questionDelete',
      name : '问题删除',
      args : ['uid' , 'question_id']
    },
    {
      method : 'questionDetail',
      name : '问题详情',
      args : ['uid' , 'question_id']
    },
    {
      method : 'questionList',
      name : '问题列表',
      args : ['uid' , 'map']
    },

    // answer
    {
      method : 'answerListForQuestion',
      name : '问题列表',
      args : ['question_id' , 'map']
    },
    {
      method : 'answerCreate',
      name : '回答问题',
      args : ['uid' , 'question_id' , 'answerObj']
    },
    {
      method : 'answerDelete',
      name : '删除回答',
      args : ['uid' , 'answer_id']
    },
  ],


}