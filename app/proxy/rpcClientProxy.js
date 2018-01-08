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



let clientProxy = {
  
 // demo
 demo : (args) => {
   return _demo(args)
 }

}

let clientArgs = {
  
 demo: {
   a: null,b: null
 }

}

module.exports = {
  rpcProxy : clientProxy,
  rpcArgs : clientArgs
}