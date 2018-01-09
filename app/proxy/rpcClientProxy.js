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

}

module.exports = {
  rpcProxy : clientProxy,
  rpcArgs : clientArgs
}