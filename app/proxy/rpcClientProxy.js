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


let _getSessionKey = (args) => {
  return clientRequest('getSessionKey' , args)
}



let clientProxy = {
  
 // 获取用户sessionkey
 getSessionKey : (args) => {
   return _getSessionKey(args)
 }

}

let clientArgs = {
  
 getSessionKey: {
   uid: null
 }

}

module.exports = {
  rpcProxy : clientProxy,
  rpcArgs : clientArgs
}