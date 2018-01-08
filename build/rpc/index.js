/**
 * 生成 rpc client proxy
 */

const fs = require('fs')
const path = require('path')

let rpcFileName = process.env.RPC_NAME ?  process.env.RPC_NAME : 'rpc'
console.log('rpcFileName ' , rpcFileName)
const config = require('./../config/' + rpcFileName)


// let port = config.port
let routers = config.routers
let output = config.output

let fileStr = fs.readFileSync(path.join(__dirname , './client.jst'))
let str = fileStr.toString()
// str = str.replace('@{port}' , port)

let _method = '\n'
let methodArr = []
let argsArrs = []

routers.forEach(router => {

  let method = '\n'
  let args = '\n'
  
  let met = router.method
  let name = router.name
  _method += `let _${met} = (args) => {\n`
  _method += `  return clientRequest('${met}' , args)\n`
  _method += `}\n\n`
  

  method += ` // ${name}\n`
  method += ` ${met} : (args) => {\n`
  method += `   return _${met}(args)\n`
  method += ` }\n`
  methodArr.push(method)

  let argsArr = router.args ? router.args : []
  let argsKey = []
  args += ` ${met}: {\n`
  argsArr.forEach(a => {
    argsKey.push(a + ': null')
  });
  args += '   ' + argsKey.join(',') + '\n'
  args += ` }\n`
  argsArrs.push(args)
  console.log('add method' ,router.name , router.method )
})

str = str.replace('@{_methods}' , _method)
str = str.replace('@{methods}' , methodArr.join(' ,\n'))
str = str.replace('@{args}' , argsArrs.join(' ,\n'))

output.forEach(outputObj => {
  let outPath = outputObj.path
  let outHost = outputObj.host

  let outstr = str.replace('@{host}' , outHost)
  fs.writeFileSync(path.join(outPath , 'rpcClientProxy.js') , outstr)
  console.log('create file: ' , path.join(outPath , 'rpcClientProxy.js'))
});

// console.log(str)