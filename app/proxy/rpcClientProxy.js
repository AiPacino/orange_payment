'use strict'
const jayson = require('jayson')
const client = jayson.client.http('http://127.0.0.1:8081')

let clientRequest = (method , args) => {
  return new Promise((resolve , reject) => {
    client.request(method , args , (err , rsp) => {
      if (err){
        reject(err)
      }

      resolve(JSON.parse(rsp.result))
    })
  })
}


let _demo = (args) => {
  return clientRequest('demo' , args)
}

let _getSessionKey = (args) => {
  return clientRequest('getSessionKey' , args)
}

let _questionCreate = (args) => {
  return clientRequest('questionCreate' , args)
}

let _questionUpdate = (args) => {
  return clientRequest('questionUpdate' , args)
}

let _questionPublish = (args) => {
  return clientRequest('questionPublish' , args)
}

let _questionDelete = (args) => {
  return clientRequest('questionDelete' , args)
}

let _questionDetail = (args) => {
  return clientRequest('questionDetail' , args)
}

let _questionList = (args) => {
  return clientRequest('questionList' , args)
}



let clientProxy = {
  
 // demo
 demo : (args) => {
   return _demo(args)
 }
 ,

 // 获取用户sessionkey
 getSessionKey : (args) => {
   return _getSessionKey(args)
 }
 ,

 // 添加问题
 questionCreate : (args) => {
   return _questionCreate(args)
 }
 ,

 // 修改问题
 questionUpdate : (args) => {
   return _questionUpdate(args)
 }
 ,

 // 问题发布
 questionPublish : (args) => {
   return _questionPublish(args)
 }
 ,

 // 问题删除
 questionDelete : (args) => {
   return _questionDelete(args)
 }
 ,

 // 问题详情
 questionDetail : (args) => {
   return _questionDetail(args)
 }
 ,

 // 问题列表
 questionList : (args) => {
   return _questionList(args)
 }

}

let clientArgs = {
  
 demo: {
   a: null,b: null
 }
 ,

 getSessionKey: {
   uid: null
 }
 ,

 questionCreate: {
   uid: null,questionObj: null
 }
 ,

 questionUpdate: {
   uid: null,questionObj: null
 }
 ,

 questionPublish: {
   uid: null,questionObj: null
 }
 ,

 questionDelete: {
   uid: null,question_id: null
 }
 ,

 questionDetail: {
   uid: null,question_id: null
 }
 ,

 questionList: {
   uid: null,map: null
 }

}

module.exports = {
  rpcProxy : clientProxy,
  rpcArgs : clientArgs
}