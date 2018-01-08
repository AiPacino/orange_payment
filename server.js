const jayson = require('jayson')
const config = require('./config/index')
const fs = require('fs')
const path = require('path')
const RPC = require('./lib/rpc')

// 获取配置
let rpcConfig = config.rpc
let port = rpcConfig.port
let host = rpcConfig.host
let rpcMethodPath = rpcConfig.path

let paths = fs.readdirSync(rpcMethodPath)
paths.forEach((filename) => {
  console.log('add rpc methods file name:' , filename)
  let obj = require(path.join(rpcMethodPath , filename))
  // console.log(obj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log('add rpc method :' , key)
    }
  }

  RPC.use(obj)
})

let server = jayson.server(RPC.methods())

server.http().listen(port)

console.log('rpc server start port ' , port)